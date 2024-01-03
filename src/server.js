const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
require('dotenv').config()
const { sequelize } = require('../models')
const models = require('../models')
const { typeDefs, resolvers } = require('./schema/index')
const cookieParser = require('cookie-parser')
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

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    app.use(cookieParser())

    app.use('/', bodyParser.json(), expressMiddleware(server, {
        context: context
    }))


    app.listen(PORT, () => {
        console.log(`Server up at port: http://localhost:${PORT}/`);
    })
})();