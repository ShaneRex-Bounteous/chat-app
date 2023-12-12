import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation Register($userInput: RegisterUserInput!) {
        register(userInput: $userInput) {
            email
            username
        }
    }
`;