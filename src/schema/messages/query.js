const { ApolloServerErrorCode } = require("@apollo/server/errors")
const { GraphQLError } = require("graphql")
const { Op } = require("sequelize")

module.exports = {
    async getMessages(parent, { requestedUser }, { models, currentUser }, info) {
        try {
            const reqUser = await models.User.findOne({
                where: {
                    username: requestedUser
                }
            })
            if (!reqUser) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_REQUEST
                    }
                })
            }

            const usernames = [requestedUser, currentUser.username]
            
            let messages = await models.Message.findAll({
                where: {
                    from: { [Op.in]: usernames },
                    to: { [Op.in]: usernames },
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            if (!messages) {
                throw new GraphQLError('No messages for this chat', {
                    extensions: {
                        code: 'NOT_FOUND'
                    }
                })
            }

            if(requestedUser !== currentUser.username) {
                messages = messages.filter((message) => message.from !== message.to)
            }

            return messages
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    code: error.extensions.code || ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                }
            })
        }
    }
}