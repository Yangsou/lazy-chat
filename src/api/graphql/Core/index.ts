import { LazyChatAuth } from 'root/services/auth';
import { GraphQLClient } from './client';

const gqlClient = GraphQLClient({
  httpURL: process.env.GRAPHQL_HOST,
  wsURL: process.env.GRAPHQL_WS_HOST,
  authenticator: LazyChatAuth
});

export {
  gqlClient
};

export * from './utils';
