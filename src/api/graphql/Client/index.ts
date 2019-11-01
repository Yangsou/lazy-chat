import { userGqlService, IUserGqlService } from './User';

export interface IGqlClient {
  user: IUserGqlService;
}
export function LazyChatGqlClient(): IGqlClient {
  return {
    user: userGqlService()
  };
}
