import { fullNameUser } from 'root/helpers';
import Vue from 'vue';
import Component from 'vue-class-component';
import './styles.scss';

@Component({
  template: require('./view.html'),
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          fullName: '',
          avatar: ''
        };
      }
    },
    showFullname: {
      type: Boolean,
      default: true
    }
  }
})
export class Avatar extends Vue {
  public fullNameUser = fullNameUser;
}
