import { CRUDState, ICRUDState } from 'root/store/helpers';

export interface IExampleState extends ICRUDState<any> {
  loading: boolean;
}

export const defaultState: IExampleState = {
  ...CRUDState(),
  loading: false
};

export const mutations = {};
