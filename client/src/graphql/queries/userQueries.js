import { gql } from "@apollo/client";

export const GET_ME = gql`
    query Me {
        me {
            email
            username
        }
    }
`;