import { DocumentNode } from 'graphql';
import { assign } from 'lodash';
import { IPaginationParams, PaginationParams } from 'root/api/graphql/Core';

export interface ICRUDState<T extends object, F = any> {
  data: T[];
  loading: boolean;
  editing: boolean;
  filterResultIDs: string[];
  filterParams: F;
  pagination: IPaginationParams;
}

export function CRUDState<T extends object>(params?: IPaginationParams): ICRUDState<T> {
  return {
    data: [],
    loading: false,
    editing: false,
    filterResultIDs: [],
    filterParams: null,
    pagination: PaginationParams(params),
  };
}

export interface ICRUDFilterState<T extends object> {
  data: T[];
  pagination: IPaginationParams;
}

export interface ICRUDQuery {
  FILTER?: DocumentNode;
  GET_BY_ID?: DocumentNode;
  CREATE?: DocumentNode;
  UPDATE?: DocumentNode;
  DELETE?: DocumentNode;
  FETCH_MANY?: DocumentNode;
}

export interface IOptionCRUD {
  keyState?: string;
  queries?: ICRUDQuery;
}

export function crudMutations<T extends object, F = any>(name: string, idName = 'id', options: IOptionCRUD = {}) {
  const { keyState } = options;

  function getDataState(state: ICRUDState<T>, key: string) {
    if (keyState) {
      return state[keyState][key];
    }

    return state[key];
  }

  function setDataState(state: ICRUDState<T>, key: string, data: any) {
    if (keyState) {
      return state[keyState][key] = data;
    }

    return state[key] = data;
  }

  return {
    [`${name}FilterModels`](state: ICRUDState<T>, params: ICRUDFilterState<T>) {
      setDataState(state, 'data', params.data);
      setDataState(state, 'pagination', params.pagination);
    },
    [`${name}Loading`](state: ICRUDState<T>) {
      setDataState(state, 'loading', true);
    },
    [`${name}Loaded`](state: ICRUDState<T>) {
      setDataState(state, 'loading', false);
    },
    [`${name}RefreshModels`](state: ICRUDState<T>, models: T[]) {
      setDataState(state, 'data', models);
    },
    [`${name}UpdateModels`](state: ICRUDState<T>, models: T[]) {
      if (!models || models.length === 0) {
        return;
      }
      const ids = models.map((m) => m[idName]);
      if (getDataState(state, 'data').length < 1) {
        setDataState(state, 'data', models);
      } else {
        setDataState(
          state, 'data',
          getDataState(state, 'data').map((m) => {
            const index = ids.indexOf(m[idName]);
            if (index !== -1) {
              return assign(m, models[index]);
            }

            return m;
          })
        );
      }

      return;
    },
    [`${name}InsertModel`](state: ICRUDState<T>, model: T) {
      if (!model) {
        return;
      }
      const _data = getDataState(state, 'data');
      setDataState(
        state, 'data',
        [model, ..._data]
      );
    },
    [`${name}RemoveModelByIDs`](state: ICRUDState<T>, ids: string[]) {
      ids = ids.map((e) => e.toString());
      setDataState(
        state, 'data',
        getDataState(state, 'data').filter((m) => ids.indexOf(m[idName].toString()) === -1)
      );
    },
    [`${name}PaginationChange`](state: ICRUDState<T>, pagination: IPaginationParams) {
      setDataState(state, 'pagination', pagination);
    },
    [`${name}PaginationReset`](state: ICRUDState<T>) {
      setDataState(state, 'pagination', PaginationParams());
    },
    [`${name}FilterChange`](state: ICRUDState<T>, params: F) {
      setDataState(state, 'filterParams', params);
    },
    [`${name}ResetState`](state: ICRUDState<T>) {
      setDataState(state, 'pagination', PaginationParams());
      setDataState(state, 'data', []);
    }
  };
}
