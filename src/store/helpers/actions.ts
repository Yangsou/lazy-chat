import { stripObject } from '@hgiasac/helper';
import { DocumentNode } from 'graphql';
import { IGqlQueryOption, IPaginationParams, PaginationParams } from 'root/api/graphql/Core';
import { IPagingResult } from 'root/models';
import { ActionContext } from 'vuex';
import { ActionType, IState } from '../types';
import { ICRUDFilterState, ICRUDState, IOptionCRUD } from './mutations';

// export interface ICRUDActionOptions<T, F> {
//   filter?(params: F, pagingParams: any, optionsHTTP?: IOptionsHTTP): Promise<any>;
//   list?(params?: any, optionsHTTP?: IOptionsHTTP): Promise<T[]>;
//   getById?(id: number | string, optionsHTTP?: IOptionsHTTP): Promise<T>;
//   create?(form: any, optionsHTTP?: IOptionsHTTP): Promise<T>;
//   update?(id: number | string, form: any, optionsHTTP?: IOptionsHTTP): Promise<T>;
//   deleteById?(id: number | string, optionsHTTP?: IOptionsHTTP): Promise<number>;
// }

export interface ICRUDActionOptions<M> {
  filter?(query: DocumentNode, pagingParams?: IPaginationParams, options?: IGqlQueryOption): Promise<IPagingResult<M>>;
  getById?(query: DocumentNode, id: string): Promise<M>;
  update?(query: DocumentNode, id: string, form: any): Promise<M>;
  create?(query: DocumentNode, form: any): Promise<M>;
  deleteById?(query: DocumentNode, id: string): Promise<M>;
  fetchMany?(query: DocumentNode): Promise<M>;
}

export interface IOptionFunctionFilterCRUD {
  disableLoading?: boolean;
}

export function crudActions<T extends object>(
  name: string, options: ICRUDActionOptions<T>, optionCRUD: IOptionCRUD) {

  let keyState;
  if (optionCRUD && optionCRUD.keyState) {
    keyState = optionCRUD.keyState;
  }
  function getDataState(state: ICRUDState<T>, key: string) {
    if (keyState) {
      return state[keyState][key];
    }

    return state[key];
  }

  function filter(
    query: DocumentNode,
    { commit, dispatch, state, params },
    opts: IOptionFunctionFilterCRUD = {},
    optionsHTTP?: IGqlQueryOption
  ) {
    if (!opts.disableLoading) {
      commit(`${name}Loading`);
    }

    if (params.filterParams) {
      commit(`${name}FilterChange`, params.filterParams);
    } else {
      params.filterParams = getDataState(state, 'filterParams');
    }
    let filterParams = optionsHTTP ? optionsHTTP.filterParams : {};
    filterParams = {
      ...filterParams,
      ...params.filterParams
    };

    const pagination = getDataState(state, 'pagination');
    options.filter(query, pagination, {
      ...optionsHTTP,
      filterParams: {
        // ...optionsHTTP.filterParams,
        ...filterParams
      }
    }).then((results) => {
      if (!opts.disableLoading) {
        commit(`${name}Loaded`);
      }
      const data = results.data,
        filterResults: ICRUDFilterState<T> = results;

      if (params.onSuccess) {
        params.onSuccess(data);
      }
      commit(`${name}UpdateModels`, data);
      commit(`${name}FilterModels`, filterResults);
    }).catch((e) => {
      if (!opts.disableLoading) {
        commit(`${name}Loaded`);
      }
      dispatch(ActionType.CatchException, e);
    });
  }

  return stripObject({
    [`${name}FilterNoCache`]: !options.filter ? undefined : (
      { commit, dispatch, state }: ActionContext<ICRUDState<T>, IState>,
      { params = {}, optionsHTTP = null } = {}
    ) => {
      params = { ...params };

      return filter(optionCRUD.queries.FILTER, { commit, dispatch, state, params }, {}, optionsHTTP);
    },
    [`${name}FetchMany`]: !options.fetchMany ? undefined : (
      { commit, dispatch }: ActionContext<ICRUDState<T>, IState>
    ) => {
      commit(`${name}Loading`);
      options.fetchMany(optionCRUD.queries.FETCH_MANY).then((results) => {
        commit(`${name}Loaded`);
        commit(`${name}RefreshModels`, results);
      }).catch((e) => {
        commit(`${name}Loaded`);
        dispatch(ActionType.CatchException, e);
      });
    },
    [`${name}FindById`]: !options.getById ? undefined : (
      { commit, dispatch }: ActionContext<ICRUDState<T>, IState>,
      { id, onSuccess, onFailure, opts }
    ) => {
      if (!(opts && opts.disableLoading)) {
        commit(`${name}Loading`);
      }

      return options.getById(optionCRUD.queries.GET_BY_ID, id)
        .then((model) => {
          if (!(opts && opts.disableLoading)) {
            commit(`${name}Loaded`);
          }
          commit(`${name}UpdateModels`, [model[0]]);
          if (onSuccess) {
            onSuccess(model);
          }

        }).catch((e) => {
          if (!(opts && opts.disableLoading)) {
            commit(`${name}Loaded`);
          }
          dispatch(ActionType.CatchException, e);
          if (onFailure) {
            onFailure(e);
          }
        });
    },
    [`${name}Update`]: !options.update ? undefined : (
      { commit, dispatch }: ActionContext<ICRUDState<T>, IState>,
      { id, form, router, redirectPath, onSuccess, onFailure },
    ) => {
      commit(`${name}Loading`);

      return options.update(optionCRUD.queries.UPDATE, id, form)
        .then((result) => {
          commit(`${name}Loaded`);
          commit(`${name}UpdateModels`, [result]);

          if (onSuccess) {
            onSuccess(result);
          }

          if (router && redirectPath) {
            router.replace(redirectPath);
          }
        }).catch((e) => {
          commit(`${name}Loaded`);
          dispatch(ActionType.CatchException, e);
          if (onFailure) {
            onFailure(e);
          }
        });
    },
    [`${name}Create`]: !options.create ? undefined : (
      { commit, dispatch }: ActionContext<ICRUDState<T>, IState>,
      { form, router, redirectPath, onSuccess, onFailure }
    ) => {
      commit(`${name}Loading`);

      return options.create(optionCRUD.queries.CREATE, form)
        .then((result) => {
          commit(`${name}Loaded`);
          commit(`${name}InsertModel`, result);
          if (onSuccess) {
            onSuccess(result);
          }

          if (router && redirectPath) {
            router.replace(redirectPath);
          }
        }).catch((e) => {
          commit(`${name}Loaded`);
          dispatch(ActionType.CatchException, e);
          if (onFailure) {
            onFailure(e);
          }
        });
    },
    [`${name}Delete`]: !options.deleteById ? undefined : (
      { commit, dispatch }: ActionContext<ICRUDState<T>, IState>,
      { id, onFailure, onSuccess }
    ) => {
      return options.deleteById(optionCRUD.queries.DELETE, id)
        .then(() => {
          commit(`${name}RemoveModelByIDs`, [id]);
          if (onSuccess) {
            onSuccess();
          }
        }).catch((e) => {
          dispatch(ActionType.CatchException, e);
          if (onFailure) {
            onFailure(e);
          }
        });
    },
    [`${name}FilterChange`](
      { commit, dispatch, state }: ActionContext<ICRUDState<T>, IState>,
      { params = {}, optionsHTTP = null } = {}
    ) {
      commit(`${name}FilterChange`, params);
      const pagination = getDataState(state, 'pagination');
      commit(`${name}PaginationChange`, {
        ...pagination,
        page: pagination.page = 1,
      });
      dispatch(`${name}Filter`, { params, optionsHTTP });
    },
    [`${name}PaginationChange`](
      { commit, dispatch }: ActionContext<ICRUDState<T>, IState>,
      { pagination = PaginationParams(), optionsHTTP = null } = {}
    ) {
      commit(`${name}PaginationChange`, pagination);
      const params = {};
      dispatch(`${name}Filter`, { params, optionsHTTP });
    },
  });
}
