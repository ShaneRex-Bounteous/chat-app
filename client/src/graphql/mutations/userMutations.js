import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation Register($userInput: RegisterUserInput!) {
        register(userInput: $userInput) {
            email
            username
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($userInput: LoginUserInput!) {
        login(userInput: $userInput) {
            accessToken
            user {
                email
                username
            }
        }
    }
`;

export const REFRESH = gql`
    mutation Refresh{
        refresh 
    }
`;