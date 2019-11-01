import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import { getSystemLanguages } from '../helpers';
export * from './pageTitles';

Vue.use(VueI18n);

let _i18n: VueI18n;

export function i18n(): VueI18n {
  if (_i18n) {

    return _i18n;
  }

  // tslint:disable
  // tslint:enable

  const messages = {
    en: require('./messages/en.json'),
    vi: require('./messages/vi.json')
  };

  const formatEn = require('./misc/en.json');
  const formatVi = require('./misc/vi.json');

  const dateTimeFormats = {
    en: formatEn.dateTimeFormats,
    vi: formatVi.dateTimeFormats,
  };

  const numberFormats = {
    en: formatEn.numberFormats,
    vi: formatVi.numberFormats,
  };

  // const supportedLanguages = Object.keys(messages);

  // const currentLocale = getSystemLanguages()
  //   .find((lang) => supportedLanguages.indexOf(lang) !== -1);
  // Create VueI18n instance with options
  _i18n = new VueI18n({
    messages, // set locale messages
    numberFormats,
    dateTimeFormats,
    locale: 'en', // set locale
  });

  return _i18n;
}
