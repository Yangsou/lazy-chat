import { ICRUDState } from './mutations';

export interface ICommonGetterOptions {
  idName?: string;
  pluralName?: string;
}

export function defaultGetterOptions(name: string, options?: ICommonGetterOptions): ICommonGetterOptions {
  return { idName: 'uid', pluralName: `${name}s`, ...options };
}

export function commonGetters<T extends object>(name: string, options?: ICommonGetterOptions) {

  options = defaultGetterOptions(name, options);

  return {
    [`${name}`](state: ICRUDState<T>) {
      return (id) => state.data.find((m) => m[options.idName] === id.toString());
    },
    [options.pluralName](state: ICRUDState<T>) {
      return state.data;
    },
    [`${name}FilterResults`](state: ICRUDState<T>) {
      return state.filterResultIDs
        .map((id) => state.data.find((m) => m[options.idName] === id))
        .filter((m) => m);
    }
  };
}
