import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { LazyChatAuth } from 'root/services/auth';

export interface IAuthenticator {
  getIdToken(): Promise<string>;
}

export interface IGraphQLClientOptions {
  httpURL: string;
  wsURL: string;
  authenticator: IAuthenticator;
}

export function GraphQLClient(
  options: IGraphQLClientOptions
): ApolloClient<InMemoryCache> {

  const authLink = setContext(async (_, { headers }) => {
    const authorization = await LazyChatAuth.getIdToken();

    return {
      headers: {
        ...headers,
        'x-hasura-access-token': authorization
        // 'x-hasura-admin-secret': 'daikin@nexlab'
      }
    };
  });

  // Create an http link:
  const httpLink = createHttpLink({
    uri: options.httpURL,
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: options.wsURL,
    options: {
      lazy: true,
      connectionParams: () => LazyChatAuth.getIdToken()
        .then((authorization) => {
          return ({
            headers: {
              'x-hasura-access-token': authorization
            }
          });
        }),
      reconnect: true
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = <any> getMainDefinition(query);

      return kind === 'OperationDefinition'
        && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );

  return new ApolloClient(<any> {
    link,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== 'production'
  });

}
