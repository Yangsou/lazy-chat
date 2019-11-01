import { IPaginationParams } from 'root/api/graphql/Core';

export interface IPhoneInput {
  code?: string;
  number: string | number;
}

export enum UpdatedByType {
  Customer = 'customer',
  Staff = 'staff',
  Admin = 'admin',
  System = 'system'
}

export enum StatusCode {
  Active = 'active',
  Inactive = 'inactive',
  Disabled = 'disabled',
  Deleted = 'deleted',
  Deactivate = 'deactivate',
  Suspended = 'suspended'
}

export enum CRUDAction {
  Create = 'create',
  Update = 'update',
  Delete = 'delete'
}

export enum OrderType {
  DESC = 'descending',
  ASC = 'ascending'
}

export interface IPagingWordpressParams {
  page: number;
  per_page: number;
}

export interface IPagingResult<T> {
  data: T[];
  pagination: IPaginationParams;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Empty = ''
}

export interface IFileInfo {
  url: string;
  fullPath: string;
  bucketName?: string;
}

export interface IImageUrl {
  url: string;
  thumbnailUrl: string;
}

export const phoneCodeDefault = '+65';

export interface IBreadcrumb {
  path: string;
  label: string;
  current?: boolean;
}
