import { cloneDeep, omit } from 'lodash';
import { ruleEmail, ruleRequired } from 'root/helpers';
import { IUser } from 'root/models';
import { LazyChatAuth } from 'root/services/auth';
import { ActionType, IState, Layout, MutationType } from 'root/store';
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import { ActionTypeUser } from '../Login/Store/types';
import './styles.scss';

@Component({
  template: require('./view.html'),
  computed: {
    ...mapState({
      authUser: (state: IState) => state.global.authUser
    })
  }
})

export class Register extends Vue {

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
        const form = cloneDeep(this.form),
          { email, password } = form;
        try {
          const resultRegister = await LazyChatAuth.createUserWithEmailAndPassword(email, password);
          this.$store.dispatch(ActionTypeUser.Create, {
            form: {
              ...omit(form, ['password']),
              firebaseId: resultRegister.user.uid
            },
            onSuccess: () => {
              this.loading = false;
            },
            onFailure: () => {
              this.loading = false;
            }
          });
        } catch (error) {
          this.loading = false;
          this.$store.dispatch(ActionType.CatchException, error);
        }

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
