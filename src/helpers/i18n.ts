import { getLocaleString as localeString, ILanguageDictionary } from '@hgiasac/helper';
import { i18n } from '../locales';

export function getLocaleString(input: string | ILanguageDictionary): string {
  return localeString(input, i18n().locale);
}

export function serializeDuration(minutes: number, isSymbol = false): string {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;

  return `${hours} ${isSymbol ? i18n().t('hour_symbol') : i18n().tc('hour', hours)}`
    + (min ? ` ${min} ${isSymbol ? i18n().t('minute_symbol') : i18n().tc('minute', min)}` : '');
}
