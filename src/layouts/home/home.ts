import Vue from 'vue';
import Component from 'vue-class-component';

// components

// state
import { IState } from 'root/store';
import { mapState } from 'vuex';

import { Navigator } from 'root/components/Navigator';
import { RouteDictionary } from 'root/router';
import './home.scss';

@Component({
  template: require('./view.html'),
  components: {
    navigator: Navigator
  },
  computed: {
    ...mapState({
      isLoading: (state: IState) => {
        return state.global.isLoading;
      }
    }),
  }
})

export class HomeLayout extends Vue {
  public get isShowHeader(): boolean {
    const path = this.$route.path;

    return path !== RouteDictionary.Login
      && path !== RouteDictionary.Register
      && path !== RouteDictionary.ForgotPassword;
  }
}
