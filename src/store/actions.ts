import VueRouter from 'vue-router';
import { ActionContext } from 'vuex';

import { parseParamUrl } from 'root/helpers';
import { IErrorException } from 'root/models';
import { ActionTypeUser } from 'root/pages/Login/Store/types';
import {
  // deleteTagForNotification,
  // Logger
} from 'root/services';
import { i18n } from '../locales';
import { RouteDictionary } from '../router';
import { ActionType, IState, Layout, MutationType, TypeAlert } from './types';

export const actions = {
  // global
  [ActionType.InitializeSettings](
    { commit }: ActionContext<IState, IState>
  ) {
    const locale = 'en';
    i18n().locale = locale;
    commit(MutationType.SetCurrentLocale, locale);
  },
  [ActionType.SetLayout](
    { commit }: ActionContext<IState, IState>
  ) {
    commit(MutationType.SetLayout);
  },
  [ActionType.SetGlobalConfig](
    { commit }: ActionContext<IState, IState>,
    globalConfig
  ) {
    commit(MutationType.SetGlobalConfig, globalConfig);
  },
  [ActionType.GoBack](
    _: ActionContext<any, any>,
    router: VueRouter,
  ) {
    router.back();
  },
  [ActionType.GoToRoute](
    _: ActionContext<any, any>,
    { router, route, paramUrl }
  ) {
    const method = typeof route === 'string' ? 'push'
      : (route.method || 'push');
    router[method](parseParamUrl(route, paramUrl));
  },
  [ActionType.CollapseMenu](
    { commit }: ActionContext<any, any>,
    isCollapse: boolean,
  ) {
    commit(MutationType.SetMenuCollapse, isCollapse);
  },
  [ActionType.CatchException](
    { commit }: ActionContext<any, any>,
    ex: IErrorException
  ) {
    console.error(ex);
    const message = ex.code
      ? (i18n().t(ex.code) !== ex.code ? i18n().t(ex.code) : ex.message)
      : ex.message;
    commit(MutationType.OpenTopAlert, {
      message,
      type: TypeAlert.Error
    });
  },
  [ActionType.CloseTopAlert](
    { commit }: ActionContext<IState, IState>
  ) {
    commit(MutationType.CloseTopAlert);
  },
  // login
  async [ActionType.ChangeStateAuth](
    { dispatch, commit, state }: ActionContext<IState, IState>,
    { router, user }
  ) {
    if (user) {
      // get profile 
      commit(MutationType.OpenPlashScreen);
      try {
        const profile = await dispatch(ActionTypeUser.GetProfile, user.uid);
        commit(MutationType.ClosePlashScreen);
        // can not get profile, go back to login page
        if (!profile) {
          dispatch(ActionType.CatchException, {
            message: 'This user doesn\'t exist in web System'
          });

          commit(MutationType.SetLayout, Layout.Login);
          router.replace(RouteDictionary.Login);

          // return Auth.signOut();
          // logout
        }
        commit(MutationType.SetLayout, Layout.Home);

        if (state.route.path === RouteDictionary.Login
          || state.route.path === RouteDictionary.Register
          || state.route.path === RouteDictionary.ForgotPassword) {
          router.replace(RouteDictionary.Home);
        }
      } catch (error) {
        dispatch(ActionType.CatchException, error);
        commit(MutationType.SetLayout, Layout.Login);
        commit(MutationType.ClosePlashScreen);
      }
    } else {
      commit(MutationType.ClosePlashScreen);
      commit(MutationType.SetLayout, Layout.Login);
      if (state.route.path !== RouteDictionary.Login
        && state.route.path !== RouteDictionary.Register) {
        router.replace(RouteDictionary.Login);
      }
    }
  },
  [ActionType.Unauthenticated](
    { commit }: ActionContext<IState, IState>
  ) {
    commit(MutationType.OpenPlashScreen);
  }
};
