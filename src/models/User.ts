import { Gender, StatusCode } from './Common';

export interface IUserRegisterForm {
  email: string;
  name: string;
  gender: Gender;
  avatar: string;
}

export const userRegisterFormDefault = (): IUserRegisterForm => {
  return {
    avatar: '',
    email: '',
    gender: Gender.Empty,
    name: ''
  };
};

export const userDefault = (): IUser => {
  return {
    ...userRegisterFormDefault(),
    id: '',
  };
};

export interface IUser extends IUserRegisterForm {
  id: string;
  status?: StatusCode;
}

export interface ISimpleUser {
  id: string | number;
  fullName: string;
  avatar: string;
  centre?: string;
}
