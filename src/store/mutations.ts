import { omit } from 'lodash';
import { defaultValue } from 'root/helpers';
import { i18n } from 'root/locales';
import {
  IAlertState,
  IGlobalState, IState, Layout, MutationType, TypeAlert
} from './types';

export function AlertState(): IAlertState {
  return {
    opened: false,
    type: TypeAlert.Info,
    message: 'Text message',
    icon: 'info'
  };
}

export const globalState: IGlobalState = {
  isLoading: true,
  authUser: null,
  topAlert: AlertState(),
  layout: Layout.Login,
  lastRoutePath: null,
  currentLocale: '',
  globalConfig: {
    listCentre: [{
      name: '',
      value: ''
    }],
    listCountry: []
  }
  // menuIsCollapse: false,
};

export const mutations = {
  // init
  [MutationType.SetCurrentLocale](state: IState, locale: string) {
    state.global.currentLocale = locale;
    i18n().locale = locale;
  },
  [MutationType.SetGlobalConfig](state: IState, globalConfig: any) {
    state.global.globalConfig = globalConfig;
  },
  [MutationType.ClosePlashScreen](state: IState) {
    state.global.isLoading = false;
  },
  [MutationType.OpenPlashScreen](state: IState) {
    state.global.isLoading = true;
  },
  [MutationType.SetLayout](state: IState, layout: Layout) {
    state.global.layout = layout;
  },
  [MutationType.OpenTopAlert](state: IState, topAlert: IAlertState) {
    state.global.topAlert = {
      ...topAlert,
      opened: true
    };
  },
  [MutationType.CloseTopAlert](state: IState) {
    state.global.topAlert = AlertState();
  },
  // login
  [MutationType.Authenticated](state: IState, user) {
    state.global.authUser = user;
  },
  [MutationType.Unauthenticated](state: IState) {
    state.global.authUser = null;
    state.global.lastRoutePath = state.route.path;
  },
  [MutationType.SetProfile](state: IState, user) {
    state.global.authUser = user;
  },
  [MutationType.ClearStore](state: IState) {
    const _state = omit(defaultValue(state), ['global', 'route']);
    Object.keys(_state).forEach((key) => {
      state[key] = {
        ..._state[key],
        pagination: {
          size: 20,
          page: 1
        }
      };
    });
  }
};
