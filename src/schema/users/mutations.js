const { Op } = require("sequelize")
const { verifyPassword } = require("../../../utils/PasswordUtils")
const { createTokens } = require("../../../utils/TokenUtils")
const jwt = require('jsonwebtoken')
const { GraphQLError } = require("graphql")
const { ApolloServerErrorCode } = require('@apollo/server/errors')

module.exports = {
    async register(parent, args, { models }, info) {
        try {
            const { username, email, password } = args.userInput
            // const userExisting = await models.User.findOne({
            //     where: {
            //         [Op.or]: [
            //             { username },
            //             { email }
            //         ]
            //     }
            // })

            // if (userExisting) {
            //     throw new Error('User already exists')
            // }

            const registeredUser = await models.User.create({
                username,
                email,
                password
            })

            return registeredUser
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new GraphQLError(error.errors[0].message, {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        fieldName: error.errors[0].path
                    }
                })
            }
            throw new GraphQLError(error.message, {
                extensions: {
                    fieldName: error.extensions.fieldName || undefined,
                    code: error.extensions.code || ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                }
            })

        }
    },
    async login(parent, args, { models }, info) {
        try {
            const { username, password } = args.userInput

            const userExisting = await models.User.findOne({
                where: {
                    [Op.or]: [
                        { username: username },
                        { email: username }
                    ]
                }
            })

            if (!userExisting) {
                throw new GraphQLError('Invalid username/email', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        fieldName: 'username'
                    }
                })
            }

            const isPasswordMatch = await verifyPassword(password, userExisting.password)

            if (!isPasswordMatch) {
                throw new GraphQLError('Incorrect Password', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        fieldName: 'password'
                    }
                })
            }

            const { accessToken, refreshToken } = await createTokens({
                id: userExisting.id,
                email: userExisting.email
            })

            return { accessToken, refreshToken }
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    code: error.extensions.code || ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    fieldName: error.extensions.fieldName || undefined
                }
            })
        }
    },
    async refresh(parent, { refreshToken }, ctx, info) {
        try {
            const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)


            const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET_KEY, {
                expiresIn: '15m'
            })

            return Promise.resolve({ accessToken: newAccessToken, refreshToken })
        } catch (error) {
            throw new GraphQLError("Login expired", {
                extensions: {
                    code: 'UNAUTHORIZED',
                }
            })
        }
    }
}