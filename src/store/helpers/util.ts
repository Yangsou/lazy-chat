import { Component } from 'vue';
import { mapState } from 'vuex';
import { IState } from '../types';
import { defaultGetterOptions, ICommonGetterOptions } from './getters';

export function computedPagination(this: Component, name: string, options?: ICommonGetterOptions) {
  options = defaultGetterOptions(name, options);

  return {
    ...mapState({
      loading: (state: IState) => state[options.pluralName].loading,
    }),
    filterResults() {
      return this.$store.getters[`${name}FilterResults`];
    },
    totalPages() {
      return this.$store.getters[`${name}TotalPages`];
    },
    currentPage: {
      get() {
        return this.$store.state[options.pluralName].pagination.page;
      },
      set(val) {
        this.$store.dispatch(`${name}PaginationChange`, {
          ...this.$store.state[options.pluralName].pagination,
          page: val,
        });
      }
    },
    pagination: {
      get() {
        return this.$store.state[options.pluralName].pagination;
      }, set(val) {
        this.$store.dispatch(`${name}PaginationChange`, val);
      }
    }
  };
}
