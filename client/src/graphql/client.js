import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { authLink, errorLink, httpLink } from './links';
import { REFRESH } from './mutations/userMutations';

export const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    credentials: 'include'
});

export const refreshAccessToken = async () => {
    const response = await client.mutate({
        mutation: REFRESH
    });
    // extract your accessToken from your response data and return it
    return response.data.refresh

}