import { stripObject } from '@hgiasac/helper';
import gql from 'graphql-tag';
import { StatusCode } from 'root/models';
import { ICRUDQuery } from './mutations';

// export interface ICRUDQuery<M> {
//   filter?(model: M): any;
//   update?(model: M): any;
//   insert?(model: M): any;
// }
export function crudQuery(
  prefix: string,
  model: string
): ICRUDQuery {

  return stripObject({
    FILTER: gql`
      query FILTER_${prefix}($limit: Int!, $offset: Int!, $filter: ${prefix}_bool_exp) {
        ${prefix}(limit: $limit, offset: $offset, where: $filter, order_by: {createdAt: desc}) {
          ${model}
        }
        ${prefix}_aggregate(where: $filter) {
          aggregate {
            count
          }
        }
    }`,
    FETCH_MANY: gql`
      query FETCH_MANY_${prefix} {
        ${prefix}(where: {status: {_neq: "${StatusCode.Deleted}"}}, order_by: {createdAt: desc}) {
          ${model}
        }
    }`,
    UPDATE: gql`
      mutation UPDATE_${prefix}($id: uuid!, $form: ${prefix}_set_input){
        update_${prefix}(where: {id: {_eq: $id}}, _set: $form) {
          returning {
            ${model}
          }
        }
      }`,
    DELETE: gql`
      mutation DELETE_${prefix}($id: uuid!){
        update_${prefix}(where: {id: {_eq: $id}}, _set: {status: "${StatusCode.Deleted}"}) {
          returning {
            ${model}
          }
        }
      }`,
    CREATE: gql`
      mutation INSERT_${prefix}($form: [${prefix}_insert_input!]!) {
        insert_${prefix}(objects: $form) {
          returning {
            ${model}
          }
        }
      }`,
    GET_BY_ID: gql`
      query ${prefix}_GET_BY_ID($id: uuid!) {
        ${prefix}(where: {id: {_eq: $id}, status: {_neq: "${StatusCode.Deleted}"}}) {
          ${model}
        }
      }
    `
  });
}
