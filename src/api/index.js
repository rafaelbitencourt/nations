import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const Client = new ApolloClient({
  uri: process.env.REACT_APP_URL_API,
  cache: new InMemoryCache()
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_URL_API_CUSTOM,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token');

  return {
    headers: {
      ...headers,
      authorization: token,
    }
  }
});

export const ClientCustom = new ApolloClient({
    link: authLink.concat(httpLink),
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