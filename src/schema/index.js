const { UserTypes, UserQuery, UserMutations, UserResolvers } = require('./users/index')
const { MessageMutations, MessageQuery, MessageResolvers, MessageTypes } = require('./messages');
const { default: BigInt } = require('apollo-type-bigint');

const typeDefs = `
    scalar BigInt
    ${UserTypes}
    ${MessageTypes}
`;

const resolvers = {
    BigInt: new BigInt("safe"),
    Query: {
        ...UserQuery,
        ...MessageQuery
    },
    Mutation: {
        ...UserMutations,
        ...MessageMutations
    },
    Message: MessageResolvers
}


module.exports = {
    typeDefs,
    resolvers
}