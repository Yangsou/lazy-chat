// import { AmplifyPlugin } from 'aws-amplify-vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import { mapState } from 'vuex';
import { sync } from 'vuex-router-sync';
import { i18n } from './locales';

// layouts
import {
  HomeLayout,
  LoginLayout
} from './layouts';

// components
import {
  SplashScreenComponent, TopAlertComponent,
} from './components';

import { configLogger } from './helpers';
import router from './router';
import store, { ActionType, IState } from './store';

sync(store, router);

Vue.use(ElementUI, { locale });

import VueLazyload, { VueLazyloadOptions } from 'vue-lazyload';
const optionLazy: VueLazyloadOptions = {
  listenEvents: ['scroll'],
  observer: true,
  dispatchEvent: true,
  silent: true,
  preLoad: 0.1,
  error: '/assets/img/image-placeholder.svg',
  loading: '/assets/img/image-placeholder.svg'
};
Vue.use(VueLazyload, optionLazy);
import './main.scss';
import { LazyChatAuth } from './services/auth';

Vue.use(VueLogger, configLogger());

// tslint:disable
new Vue({
  el: '#app',
  router,
  store,
  i18n: i18n(),
  async created() {
    this.$store.dispatch(ActionType.InitializeSettings);
    this.$root._i18n.locale = 'en';

    LazyChatAuth.onAuthStateChanged(
      (user) => {
        this.$store.dispatch(ActionType.ChangeStateAuth, { router: this.$router, user });
      }
    )

  },
  computed: {
    ...mapState({
      layout: (state: IState) => {
        return state.global.layout;
      },
      isLoading: (state: IState) => {
        return state.global.isLoading;
      },
      topAlertOpened: (state: IState) => {
        const topAlert = state.global.topAlert;
        if (topAlert.opened) {
          return topAlert;
        }
        return false;
      }
    })
  },
  components: {
    'home-layout': HomeLayout,
    'login-layout': LoginLayout,
    'splash-screen': SplashScreenComponent,
    'top-alert': TopAlertComponent
  }
});

