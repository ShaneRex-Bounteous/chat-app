module.exports = `
    type User{
        username: String!,
        email: String!
    }

    type AuthPayload {
        accessToken: String!,
        refreshToken: String!
    }

    type Query {
        me: User!
    }

    type Mutation {
        register(userInput: RegisterUserInput!): User!
        login(userInput: LoginUserInput!): AuthPayload!
        refresh(refreshToken: String!): AuthPayload!
    }

    input RegisterUserInput{
        username: String!,
        email: String!,
        password: String!,
        confirmPassword: String!
    }

    input LoginUserInput {
        username: String!,
        password: String!
    }
`