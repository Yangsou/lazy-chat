import gql from 'graphql-tag';
import { crudQuery } from 'root/store/helpers';

const PREFIX = 'users';
const model = `id
  name
  avatar
  firebaseId
`;

const GET_PROFILE = gql`
  query GET_PROFILE($firebaseId: String!) {
    ${PREFIX}(where: {firebaseId: {_eq: $firebaseId}}) {
      ${model}
    }
  }
`;
export const userQuery = {
  ...crudQuery(PREFIX, model),
  getProfile: GET_PROFILE
};
