import { createHttpLink, fromPromise } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { enqueueSnackbar } from 'notistack';
import { refreshAccessToken } from './client';

export const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    credentials: 'include'
});

export const authLink = setContext(async (request, { headers }) => {
    if(request.operationName === 'Login' || request.operationName === 'Register' || request.operationName === 'Refresh') {
        return {
            headers: {
                ...headers
            }
        }
    }
    // let accessToken = ''
    // if(localStorage.getItem('access_token')) {
    //     accessToken = JSON.parse(localStorage.getItem('access_token')).token
    // }
    const lSObj = localStorage.getItem('access_token')
    let accessToken = ''
    if(lSObj) {
        const jsonLocalStorage = JSON.parse(lSObj)
        if(jsonLocalStorage.expiry > new Date()) {
            console.log('access token expired');
            accessToken = await refreshAccessToken()
        } else {
            accessToken = jsonLocalStorage.token
        }
    }
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
        }
    };
});

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    
    console.log('in errorlink');
    console.log(graphQLErrors);
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            switch (err.extensions.code) {
                case "FORBIDDEN": {
                    return fromPromise(
                        refreshAccessToken()
                            .catch(error => {
                                return;
                            })
                    )
                        .filter(Boolean)
                        .flatMap(accessToken => {
                            const oldHeaders = operation.getContext().headers;
                            // modify the operation context with a new token
                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    authorization: `Bearer ${accessToken}`,
                                },
                            });
                            localStorage.setItem('access_token', JSON.stringify({
                                token: accessToken,
                                expiry: new Date().setMinutes(new Date().getMinutes() + 15)
                            }))
                            return forward(operation);
                        });
                }
                case "UNAUTHENTICATED": {
                    window.location.href = '/login';
                    return forward(operation);
                }
            }
        }
    }
    if(networkError) {
        enqueueSnackbar("Something went wrong. Please try again!", {
            variant: 'error'
        })
    }

    // Return an observable that simply continues the operation
    return forward(operation);
});
