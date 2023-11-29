const { UserTypes, UserQuery, UserMutations, UserResolvers } = require('./users/index')

const typeDefs = `
    ${UserTypes}
`;

const resolvers = {
    Query: {
        ...UserQuery
    },
    Mutation: {
        ...UserMutations
    },
    // User: UserResolvers 
}


module.exports = {
    typeDefs,
    resolvers
}