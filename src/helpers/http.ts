import lodash from 'lodash';

export function parseParamUrl(url: string, paramUrl: object): string {
  let result = lodash.cloneDeep(url);
  if (paramUrl) {
    const keys = Object.keys(paramUrl);
    keys.forEach((e) => {
      const reg = new RegExp(`:${e}`, 'g');
      result = result.replace(reg, paramUrl[e]);
    });
  }

  return result;
}
