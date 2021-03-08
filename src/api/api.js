import configData from "../config/config.json"
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const Client = new ApolloClient({
    uri: configData.URL_API,
    cache: new InMemoryCache()
});

export const ClientCustom = new ApolloClient({
    uri: configData.URL_API_CUSTOM,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
    }
});