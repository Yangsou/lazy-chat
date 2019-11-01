// import { PhoneNumberUtil } from 'google-libphonenumber';
import { isNil, isNumber, isString } from 'lodash';
import { i18n } from 'root/locales';

export interface IMessage {
  text: string;
}

function parseMessage(message: string | IMessage, callback) {
  const result = typeof message === 'string' ?
    i18n().t(message).toString() : message.text;

  return callback(new Error(result));
}

function wrapRule(rule) {
  return { validator: rule, trigger: ['blur', 'change'] };
}

export function ruleRequired(message = 'field_required') {
  return wrapRule((_rule, value, callback) => {
    if (isNil(value)) {
      return parseMessage(message, callback);
    }

    return (isString(value) && !!value.trim() && callback())
      || (Array.isArray(value) ? value.length > 0 && callback() : (value ? callback() : false))
      || (isNumber(value) ? callback() : false)
      || parseMessage(message, callback);
  });
}

export function ruleEmail(message = 'email_invalid') {
  return wrapRule((_rule, value, callback) => {
    // tslint:disable
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // tslint:enable

    return !value || pattern.test(value.trim()) || parseMessage(message, callback);
  });
}
export function ruleCompare(targetVaule: string, message = 'value_not_compare') {
  return wrapRule((_rule: any, value: string, callback: any) => {
    if (isNil(value)) {
      return parseMessage(message, callback);
    }

    return (typeof value === 'string' && value === targetVaule && callback())
      || parseMessage(message, callback);
  });
}

export function ruleMinValue(targetVaule, message: any = 'value.min') {
  return wrapRule((_rule: any, value: string, callback: any) => {
    if (isNil(value)) {
      return parseMessage(message, callback);
    }

    return (Number(value) > targetVaule && callback())
      || parseMessage(message, callback);
  });
}

export function ruleNumber(message?: string) {
  message = message || 'invalid_number';
  // const util = PhoneNumberUtil.getInstance();
  const pattern = /^[0-9]*$/;

  return wrapRule((_rule, value, callback) => {
    return !!(value && pattern.test(value)) || parseMessage(message, callback);

  });
}
export function rulePhoneNumber(message?: string) {
  message = message || 'Invalid_phone_number';
  // const util = PhoneNumberUtil.getInstance();
  const pattern = /^[0-9]+\s*$/;

  return wrapRule((_rule, value, callback) => {

    return (value.length >= 8 && pattern.test(value)) || parseMessage(message, callback);

  });
}

export function ruleMinLength(min: number, message?: string) {

  message = message || `At_least_${min}_characters`;

  return wrapRule((_rule, value, callback) => {
    return (value && value.length >= min) || parseMessage(message, callback);
  });
}
export function ruleLength(length: number, message?: string) {

  message = message || `At_least_${length}_characters`;

  return wrapRule((_rule, value, callback) => {
    return !value || value.length === length || parseMessage(message, callback);
  });
}

export function ruleMaxLength(max: number, message?: string) {

  message = message || `Maximum ${max} characters`;

  return wrapRule((_rule, value, callback) => {
    return (value && value.length <= max) ? callback() : parseMessage(message, callback) ;
  });
}

export function ruleBetween(min: number, max: number, message?: string) {

  message = message || `Character length must be between ${min} and ${max}`;

  return wrapRule((_rule, value, callback) => {
    return (value && value.length >= min && value.length <= max) || parseMessage(message, callback);
  });
}

export function matchYoutubeUrl(message = 'youtube_link_invalid') {
  return wrapRule((_rule, value, callback) => {
    // tslint:disable
    const pattern = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    // tslint:enable

    return !value || pattern.test(value.trim()) || parseMessage(message, callback);
  });
}
