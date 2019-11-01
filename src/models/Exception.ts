export enum ErrorCode {
  Unknown = 'unknown',
  NotFound = 'not_found',
  BadRequest = 'bad_request',
  PermissionDenied = 'permission_denined',
  NoConnection = 'no_connection'
}

export interface IErrorException {
  code?: ErrorCode;
  message?: string;
}

export interface IError {
  message: string;
  code?: string;
}
