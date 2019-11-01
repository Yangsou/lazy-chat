import Vue from 'vue';
import { ConsoleLogger } from './console';
import { ILogger } from './types';
export { ILogger };
export function _Logger(): ILogger {

  return ConsoleLogger;
}

export class Logger {

  public static debug(message: string, params: object | string = '') {
    return Vue['$log'].debug(message, params);
  }

  public static info(message: string, params: object | string = '') {
    return Vue['$log'].info(message, params);
  }

  public static warn(message: string, params: object | string = '') {
    return Vue['$log'].warn(message, params);
  }

  public static error(message: string, params: object | string = '') {
    return Vue['$log'].error(message, params);
  }
}
