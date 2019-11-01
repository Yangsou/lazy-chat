import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import './splash-screen.scss';

@Component({
  template: require('./view.html'),
})
export class SplashScreenComponent extends Vue {

}
