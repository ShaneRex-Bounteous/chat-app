module.exports = `
    input SendMessageInput {
        to: String!,
        content: String!
    }

    type Message {
        content: String!,
        uuid: String!,
        from: String!,
        to: String!,
        createdAt: String!
    }

    type Query {
        getMessages(requestedUser: String!): [Message!]
    }

    type Mutation {
        sendMessage(input: SendMessageInput!): Message
    }
`