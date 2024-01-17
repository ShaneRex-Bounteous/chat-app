const { ApolloServerErrorCode } = require("@apollo/server/errors")
const { GraphQLError } = require("graphql")

module.exports = {
    async sendMessage(parent, args, { models, currentUser }, info) {
        try {
            const { to, content } = args.input
            if(content.trim() === '') {
                throw new GraphQLError('Message cannot be empty', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT
                    }
                })
            }
            const receiptent = await models.User.findOne({
                where: {
                    username: to
                }
            })
            if(!receiptent) {
                throw new GraphQLError('Invalid receiptent', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_REQUEST
                    }
                })
            }
            const message = await models.Message.create({
                from: currentUser.username,
                to,
                content
            })

            return message
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    code: error.extensions.code || ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                }
            })
        }
    },
}