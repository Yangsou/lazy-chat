import Vue from 'vue';
import Vuex from 'vuex';

import { actions } from './actions';
import { getters } from './getters';
import { globalState, mutations } from './mutations';

import * as user from '../pages/Login/Store';
// module

export * from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    global: globalState,
    route: {
      params: {},
      path: '',
      query: {}
    },
    user: user.state
  },
  modules: {
    user
  }
});

export * from './types';
