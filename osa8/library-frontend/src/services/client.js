import {ApolloClient} from 'apollo-client';
import {split} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {reconnect: true}
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('library-user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  };
});

const link = split(({query}) => {
  const {kind, operation} = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
}, wsLink, authLink.concat(httpLink));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;