import { LazyChatGqlClient } from 'root/api/graphql/Client';
import { ActionType, IState, MutationType } from 'root/store';
import { crudActions } from 'root/store/helpers';
import { ActionContext } from 'vuex';
import { IUserState } from './mutations';
import { userQuery } from './query';
import { ActionTypeUser } from './types';

const { create, getProfile } = LazyChatGqlClient().user;

export const actions = {
  ...crudActions('user', {
    create
  }, {
    queries: userQuery
  }),
  async [ActionTypeUser.GetProfile](
    { commit, dispatch }: ActionContext<IUserState, IState>, firebaseId: string
  ) {
    try {
      const user = await getProfile(userQuery.getProfile, firebaseId);
      commit(MutationType.SetProfile, user);

      return user;
    } catch (error) {
      dispatch(ActionType.CatchException, error);
    }
  }
};
