import { cloneDeep, isBoolean, isNull, isNumber, isObject, isString } from 'lodash';

export function defaultValue(obj: object, value: object = {}): any {
  const result = {};
  obj = cloneDeep(obj);

  function progress(input, r = {}) {
    Object.keys(input).forEach((e) => {
      // let valueCurrent;
      const current = input[e];
      switch (true) {
      case Array.isArray(current):
        r[e] = [];
        break;
      case current instanceof Date:
        r[e] = null;
        break;
      case (isObject(current) && !isNull(current)):
        r[e] = progress(input[e], r[e]);
        break;
      case isString(current):
        r[e] = '';
        break;
      case isNumber(current):
        r[e] = null;
        break;
      case isBoolean(current):
        r[e] = false;
      default:
        break;
      }
    });

    return r;
  }

  return {
    ...progress(obj, result),
    ...value
  };
}

export function removeEmptyField(obj: object): any {
  // const result = obj;
  obj = cloneDeep(obj);

  function progress(input) {
    Object.keys(input).forEach((e) => {
      const current = input[e],
        type = typeof input[e];
      if (e === 'id') {
        delete obj[e];
      }
      if (Array.isArray(current)) {
        if (current.length === 0) {
          delete obj[e];
        }
      } else if (type === 'string') {
        console.log('current', current, e);
        if (current.trim() === '') {
          delete obj[e];
        }

        return;
      } else if (current === null) {
        delete obj[e];
      }
    });

    return obj;
  }

  return {
    ...progress(obj)
  };
}

export function isEmptyObject(input: object): boolean {
  const keys = Object.keys(input);
  const arrayValueEmpty = [null, undefined, ''];
  if (keys.length === 0) {
    return true;
  }
  const check = keys.map((e) => {
    return arrayValueEmpty.indexOf(input[e]) > -1;
  });

  return check.filter((e) => e === true).length > 0 ? true : false;
}

export function compareObject(input: object, target: object): boolean {
  const keys = Object.keys(input);

  return keys.map((e) => target[e] === input[e]).filter((e) => e === false).length === 0;
}
