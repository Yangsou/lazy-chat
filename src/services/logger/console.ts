import { ILogger } from './types';

export const ConsoleLogger: ILogger = {
  debug(message: any, ...params: any[]) {
    console.debug(message, ...params);
  },
  info(message: any, ...params: any[]) {
    console.info(message, ...params);
  },
  warn(message: any, ...params: any[]) {
    console.warn(message, ...params);
  },
  error(message: any, ...params: any[]) {
    console.error(message, ...params);
  },
};
