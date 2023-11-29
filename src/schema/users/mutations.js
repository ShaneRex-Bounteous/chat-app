const { Op } = require("sequelize")
const { verifyPassword } = require("../../../utils/PasswordUtils")
const { createTokens } = require("../../../utils/TokenUtils")
const jwt = require('jsonwebtoken')
const { GraphQLError } = require("graphql")

module.exports = {
    async register(parent, args, { models }, info) {
        try {
            const { username, email, password, confirmPassword } = args.userInput
            if (password !== confirmPassword) {
                throw new Error('Passwords did not match')
            }

            const userExisting = await models.User.findOne({
                where: {
                    [Op.or]: [
                        { username },
                        { email }
                    ]
                }
            })

            if (userExisting) {
                throw new Error('User already exists')
            }

            const registeredUser = await models.User.create({
                username,
                email,
                password
            })

            return registeredUser
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    http: {
                        status: 400
                    }
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
                throw new Error('Invalid username/email')
            }

            const isPasswordMatch = await verifyPassword(password, userExisting.password)

            if (!isPasswordMatch) {
                throw new Error('Incorrect password')
            }

            const { accessToken, refreshToken } = await createTokens({
                id: userExisting.id,
                email: userExisting.email
            })

            return { accessToken, refreshToken }
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    http: {
                        status: 400
                    }
                }
            })
        }
    },
    async refresh(parent, { refreshToken }, ctx, info) {
        try {
            const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)


            const newAccessToken = jwt.sign({id: user.id}, process.env.ACCESS_SECRET_KEY, {
                expiresIn: '15m'
            })
            
            return Promise.resolve({accessToken: newAccessToken, refreshToken})
        } catch (error) {
            throw new GraphQLError("Login expired", {
                extensions: {
                    code: 'UNAUTHORIZED',
                    http: {
                        status: 401
                    }
                }
            })
        }
    }
}