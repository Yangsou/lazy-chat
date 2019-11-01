import { i18n } from 'root/locales';
import { Gender } from 'root/models';

export const getters = {
  genderOption() {
    return [
      { value: Gender.Male, label: i18n().t(Gender.Male).toString() },
      { value: Gender.Female, label: i18n().t(Gender.Female).toString() },
    ];
  },
  paginationOption: () => {
    return [10, 20, 50, 100].map((e) => {
      return {
        label: `${e} items per page`,
        value: e
      };
    });
  },
};
