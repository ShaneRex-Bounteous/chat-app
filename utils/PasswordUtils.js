const bcrypt = require('bcryptjs')
const { GraphQLError } = require('graphql')
const { ApolloServerErrorCode } = require('@apollo/server/errors')

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))

        return hashedPassword
    } catch (error) {
        throw error
    }
}

const verifyPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword)

        return isMatch
    } catch (error) {
        throw new GraphQLError("Incorrect password", {
            extensions: {
                code: ApolloServerErrorCode.BAD_USER_INPUT,
                http: {
                    status: 400
                }
            }
        })
    }
}

module.exports = {
    hashPassword,
    verifyPassword
}