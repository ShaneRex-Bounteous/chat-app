const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
require('dotenv').config()
const { sequelize } = require('../models')
const models = require('../models')
const { typeDefs, resolvers } = require('./schema/index')

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const { context } = require('./context/context')


const app = express()
const PORT = process.env.PORT || 4000;


(async () => {

    // const typeDefs = `
    // type User{
    //     username: String!,
    //     email: String!
    // }

    // type Query {
    //     getUsers: [User]
    // }
    // `;

    // const resolvers = {
    //     Query: {
    //         async getUsers(parent, args, ctx, info) {
    //             try {
    //                 const users = await User.findAll()

    //                 return users
    //             } catch (error) {
    //                 console.error(error.message);
    //             }
    //         }
    //     },
    //     // Mutation: {
    //     //     ...UserMutations
    //     // },
    //     // User: UserResolvers 
    // }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start()

    await sequelize.authenticate()

    app.use('/', bodyParser.json(), cors(), expressMiddleware(server, {
        context: context
    }))

    app.listen(PORT, () => {
        console.log(`Server up at port: http://localhost:${PORT}/`);
    })
})();