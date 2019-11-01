import { IUser } from 'root/models';
import { crudMutations, CRUDState, ICRUDState } from 'root/store/helpers';

export interface IUserState extends ICRUDState<IUser> {
}

export const defaultState: IUserState = {
  ...CRUDState()
};

export const mutations = {
  ...crudMutations('user')
};
