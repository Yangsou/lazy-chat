import { FetchPolicy } from 'apollo-client';
import { isEmpty, isObject } from 'lodash';
import { StatusCode } from 'root/models';

export interface IPaginationParams {
  limit: number;
  page: number;
  total?: number;
}

export function PaginationParams(params?: IPaginationParams): IPaginationParams {
  return {
    page: 1,
    limit: 20,
    ...params,
  };
}

export interface IFilterParams {
  bookingStatus?: string | string[];
}
export interface IBookingFilterParams extends IFilterParams {
  // statuses?: BookingStatus[] | string[];
  technician?: any;
  code?: any;
}
export function FilterParams(params?: IFilterParams): IFilterParams {
  return {
    ...params
  };
}

export function convertFilterParams(params: any) {
  const result: any = {};
  for (const key in params) {
    // tslint:disable-next-line:early-exit
    if (params.hasOwnProperty(key)) {
      const element = <any> params[key];
      if (Array.isArray(element)) {
        if (!isEmpty(element)) {
          result[key] = {
            _in: element
          };
        }
      } else if (<any> isObject(element)) {
        if (element.searchMode) {
          result[key] = {
            _ilike: `%${element.text}%`
          };
        } else {
          result[key] = convertFilterParams(element);
        }
      } else {
        result[key] = {
          _eq: element
        };
      }
    }
  }

  result.status = {
    ...result.status,
    _neq: StatusCode.Deleted
  };

  return result;
}

export interface IGqlQueryOption {
  fetchPolicy?: FetchPolicy;
  filterParams?: any;
}
export function gqlQueryOption(): IGqlQueryOption {
  return {
    fetchPolicy: 'network-only',
    filterParams: {}
  };
}
