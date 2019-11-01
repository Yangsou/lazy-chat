// register the plugin
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import page
import { LoginContainer } from 'root/pages/Login';
import { Register } from 'root/pages/Register';
import { RouteDictionary } from './types';

// export * from "./link";
export * from './types';

// register the plugin
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
    },
    {
      path: RouteDictionary.Login,
      component: LoginContainer,
      meta: {
        isGuest: true
      }
    },
    {
      path: RouteDictionary.Register,
      component: Register,
      meta: {
        isGuest: true
      }
    },
  ]});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
