import {cloneDeep} from 'lodash';
import moment from 'moment';
import { IUser } from 'root/models';
// import { i18n } from 'root/locales';
// import { IUser } from 'root/models';

export function fullNameUser(model: IUser) {
  return model ? `${model.name}` : '';
}

export function formatTimeDuration(time: Date, locale?: string) {
  if (!time) {
    return '';
  }

  return moment(time).locale(locale || 'vi').fromNow();
}

export function FormatDateTime(time: Date, locale: string = 'en') {
  if (!time) {
    return '';
  }

  return moment(time).locale(locale).format('DD MMMM, YYYY');
}
export function FormatDateFullTime(time: Date, locale: string = 'en') {
  if (!time) {
    return '';
  }

  return moment(time).locale(locale).format('HH:mm DD/MM/YYYY');
}

export function formatBirthday(time: Date, locale = 'en') {
  if (!time) {
    return '';
  }

  return moment(time).locale(locale).format('DD/MM/YYYY');
}

export function formatStringAndNumber(s: string) {
  const pattern = /[@#$%^&*(),.?":{}|<>]/g;

  return s.replace(pattern, '');
}

// export function checkoutNumber(s: string): boolean {
//   return !/^([0-9]|\.)*$/g.test(s.toString())
//   || s.toString().split('.').length > 2:
// }

export function formaterListCounter(pagination, length) {
  const _pagination = cloneDeep(pagination),
    { page, size } = _pagination,
    total = _pagination && _pagination.total ? _pagination.total : '',
    from = (page - 1) * size + 1,
    to = from + length - 1;

  return `You're viewing item from
   ${to ? from : 0} to ${to} in ${total ? total : 0} ${ total && total > 1 ? 'results' : 'result'}`;
}
