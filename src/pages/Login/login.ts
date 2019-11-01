import { cloneDeep } from 'lodash';
import { ruleEmail, ruleRequired } from 'root/helpers';
import { IUser } from 'root/models';
import { LazyChatAuth } from 'root/services/auth';
import { ActionType, IState, Layout, MutationType } from 'root/store';
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import './styles.scss';

@Component({
  template: require('./view.html'),
  computed: {
    ...mapState({
      authUser: (state: IState) => state.global.authUser
    })
  }
})

export class LoginContainer extends Vue {

  public authUser: IUser;
  public email: string = '';
  public password: string = '';
  public loading: boolean = false;
  public form: any = {
    email: '',
    password: ''
  };
  public $refs: {
    loginForm: any
  };

  public showPassword: boolean = false;
  public errorMessage: string = null;
  public valid: boolean = false;

  public get rules() {
    return {
      required: ruleRequired(),
      email: ruleEmail()
    };
  }

  public submit() {
    this.$refs.loginForm.validate(async (valid) => {
      if (valid) {
        this.loading = true;
        const form = cloneDeep(this.form);
        LazyChatAuth.signInWithEmailAndPassword(form).then((result) => {
          this.loading = false;
          this.$store.dispatch(ActionType.ChangeStateAuth, {
            user: result.user,
            router: this.$router
          });
        }).catch(() => {
          this.loading = false;
        });
      }

      return;
    });

  }

  public mounted() {
    this.$nextTick(() => {
      if (this.authUser && this.authUser.id) {
        this.$store.commit(MutationType.SetLayout, Layout.Home);
        this.$router.replace('/');

      }
    });
  }
}
