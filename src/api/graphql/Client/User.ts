import { DocumentNode } from 'graphql';
import { IUser } from 'root/models';
import { gqlClient } from '../Core';
import { CRUDGqlService, ICRUDGqlService } from '../Core/crud';

export interface IUserGqlService
  extends ICRUDGqlService<IUser> {
  getProfile(query: DocumentNode, firebaseId: string): Promise<IUser>;
}
export function userGqlService(): IUserGqlService {
  async function getProfile(query: DocumentNode, firebaseId): Promise<IUser> {
    const result = await gqlClient.query({
      query,
      variables: {
        firebaseId
      },
      fetchPolicy: 'network-only'
    });

    if (result.errors) {
      throw result.errors;
    }

    return result.data.users[0];
  }

  return {
    ...CRUDGqlService<IUser>('users'),
    getProfile,
  };
}
