import { fullNameUser } from 'root/helpers';
import { IUser } from 'root/models';
import { ActionType, IState } from 'root/store';
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import { Avatar } from '../Avatar';
import './styles.scss';

@Component({
  template: require('./view.html'),
  components: {
    avatar: Avatar
  },
  computed: {
    ...mapState({
      authUser: (state: IState) => state.global.authUser
    })
  }
})
export class Navigator extends Vue {
  public authUser: IUser;
  public showUserMenu: boolean = false;
  public collapse: string = '';
  public navigations: any = [
    {
      groupName: 'menu',
      children: [
        {
          path: '/users',
          label: 'Users'
        },
        {
          label: 'Redemption',
          path: '',
          collapse: true,
          children: [
            {
              path: '/redemption/product-list',
              label: 'Product List'
            },
            {
              path: '/redemption/transaction',
              label: 'Transaction'
            }
          ]
        },
      ]
    },
  ];

  public fullNameUser = fullNameUser;
  public get getProfileUrl(): string {
    return `/users/${this.authUser.id}`;
  }
  public get getPathName(): string {
    const route = this.$route;

    return route.path;
  }
  public isShowNavigator() {

    return true;
  }
  public isGroupActive(model: any): boolean {
    // const children: any[] = model.children.map((e) => e.path);

    // return children.indexOf(this.getPathName) > -1;
    console.log(model.label, this.collapse === model.label);

    return this.collapse === model.label;
  }
  public clickEditProfile(e) {
    e.preventDefault();

    this.showUserMenu = false;
    this.$router.push(this.getProfileUrl);
  }
  public clickSettings(e) {
    e.preventDefault();
    this.showUserMenu = false;
  }
  public logout() {
    const router = this.$router;
    this.$store.dispatch(ActionType.Unauthenticated, router);
  }
}
