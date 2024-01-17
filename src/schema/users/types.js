module.exports = `
    type User{
        username: String!,
        email: String!
    }

    type AuthPayload {
        accessToken: String!,
        user: User!
    }

    type Query {
        me: User!
    }

    type Mutation {
        register(userInput: RegisterUserInput!): User!
        login(userInput: LoginUserInput!): AuthPayload!
        refresh: String!
        logout: Boolean!
    }

    input RegisterUserInput{
        username: String!,
        email: String!,
        password: String!
    }

    input LoginUserInput {
        username: String!,
        password: String!
    }
`