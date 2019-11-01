import { IUser } from 'root/models';
import { IUserState } from 'root/pages/Login/Store/mutations';

// define interface
export interface IGlobalConfiguration {
  listCentre: [{
    name: string;
    value: string;
  }];
  listCountry: [];
}
export interface IGlobalState {
  isLoading: boolean;
  lastRoutePath: string;
  currentLocale: string;
  authUser: IUser;
  topAlert: IAlertState;
  layout: Layout;
  globalConfig: IGlobalConfiguration;

}

export enum TypeAlert {
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
  Error = 'error'
}

export interface IAlertState {
  opened: boolean;
  message: string;
  type: TypeAlert;
  icon: string;
}

export interface IRouteState {
  path: string;
  params: object;
  query: object;
}

export interface IPaginationState {
  page?: number;
  size?: number;
}

export interface IState {
  global: IGlobalState;
  route: IRouteState;
  user: IUserState;
}

export interface IFormState<T> {
  payload: T;
  valid: boolean;
  errorMessage: string;
}

export interface IBreadcrumbItem {
  text: string;
  link?: string;
}

export enum Layout {
  Home = 'home-layout',
  Login = 'login-layout'
}

export interface IAvatarDefault {
  user: string;
  image: string;
  video: string;
  project: string;
  plan: string;
  message: string;
}

export interface ICustomLazy {
  src: string;
  loading?: string;
  error?: string;
}

// function
export function PaginationState(params?: IPaginationState): IPaginationState {
  return {
    page: 1,
    size: 20,
    ...params,
  };
}

// define type screen

export enum ViewPortSize {
  Mobile = 768,
  Tablet = 1023,
  Desktop = 1215,
  Widescreen = 1407,
}

// define type mutation and action

export enum MutationType {
  // global
  SetCurrentLocale = 'setCurrentLocale',
  ClosePlashScreen = 'closePlashScreen',
  WindowResized = 'windowResized',
  OpenPlashScreen = 'openPlashScreen',
  SetLayout = 'setLayout',
  SetGlobalConfig = 'setGlobalConfig',
  SetMenuCollapse = 'setMenuCollapse',
  OpenTopAlert = 'openTopAlert',
  CloseTopAlert = 'closeTopAlert',
  // users
  SetListUsers = 'setListUsers',
  CreateUser = 'createUser',
  UpdateUser = 'updateUser',
  // login
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  SetProfile = 'setProfile',

  // profile
  LoadingProfile = 'loadingProfile',
  ClearStore = 'clearStore',
  SetRegisting = 'SetRegisting',
  SetRegisted = 'SetRegisted'
}

export enum ActionType {
  // global
  InitializeSettings = 'initializeSettings',
  CatchException = 'catchException',
  SetLayout = 'setLayout',
  SetGlobalConfig = 'setGlobalConfig',
  GoBack = 'goBack',
  GoToRoute = 'goToRoute',
  CollapseMenu = 'collapseMenu',
  OpenTopAlert = 'openTopAlert',
  CloseTopAlert = 'closeTopAlert',

  // navigator
  DirectNavigator = 'directNavigator',

  // login
  ChangeStateAuth = 'changeStateAuth',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',

  // profile
  UpdateProfile = 'updateProfile',
  LoadingProfile = 'loadingProfile',
  ReloadProfile = 'reloadProfile',
  GetProfile = 'GetProfile',

  // user-notification-setting
  UserNotificationSettingUpdate = 'userNotificationSettingUpdate'
}

export enum GetterTypeUser {
  PermissionViewAllCentre = 'permissionViewAllCentre',
  PermissionEditRole = 'permissionEditRole',
  GetAuthuserRole = 'GetAuthuserRole'
}

export enum GetterTypeGlobal {
  GetCentreName = 'getCentreName',
  GetCentreValue = 'getCentreValue'
}
