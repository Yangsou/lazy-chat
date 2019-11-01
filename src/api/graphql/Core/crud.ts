import { stripObject } from '@hgiasac/helper';
import { DocumentNode } from 'graphql';
import { assign } from 'lodash';
import { IPagingResult } from 'root/models';
import { gqlClient } from '.';
import { convertFilterParams, gqlQueryOption, IGqlQueryOption, IPaginationParams } from './utils';

export interface ICRUDGqlService<M> {
  filter(query: DocumentNode, pagingParams?: IPaginationParams, options?: IGqlQueryOption): Promise<IPagingResult<M>>;
  fetchMany(query: DocumentNode, options?: IGqlQueryOption): Promise<M>;
  getById(query: DocumentNode, id: string): Promise<M>;
  update(query: DocumentNode, id: string, form: any): Promise<M>;
  create(query: DocumentNode, form: any): Promise<M>;
  deleteById(query: DocumentNode, id: string): Promise<any>;
}

export function CRUDGqlService<M>(prefix: string): ICRUDGqlService<M> {
  async function filter(
    query: DocumentNode,
    pagingParams: IPaginationParams,
    options: IGqlQueryOption): Promise<IPagingResult<M>> {
    const { page, limit } = pagingParams,
      { fetchPolicy, filterParams } = assign(gqlQueryOption(), options);
    const params = filterParams ? filterParams : {};

    const result = await gqlClient.query({
      query,
      fetchPolicy,
      variables: stripObject({
        limit,
        offset: (page - 1) * limit,
        filter: {
          ...convertFilterParams(params)
        }
      })
    });

    if (result.errors) {
      throw result.errors;
    }

    return {
      data: result.data[prefix],
      pagination: {
        limit,
        page,
        total: result
            .data[`${prefix}_aggregate`]
            .aggregate.count
      }
    };
  }

  async function fetchMany(
    query: DocumentNode,
    options?: IGqlQueryOption): Promise<M> {
    const { fetchPolicy } = assign(gqlQueryOption(), options);

    const result = await gqlClient.query({
      query,
      fetchPolicy,
    });

    if (result.errors) {
      throw result.errors;
    }

    return result.data[prefix];
  }

  async function getById(
    query: DocumentNode,
    id: string
  ): Promise<M> {
    const result = await gqlClient.query({
      query,
      fetchPolicy: 'network-only',
      variables: {
        id
      }
    });

    if (result.errors) {
      throw result.errors;
    }

    return result.data[`${prefix}`];
  }

  async function update(
    query: DocumentNode,
    id: string,
    form: any
  ): Promise<M> {
    const result = await gqlClient.mutate({
      mutation: query,
      variables: {
        id,
        form
      }
    });
    if (result.errors) {
      throw result.errors;
    }

    return result.data[`update_${prefix}`].returning[0];
  }
  async function deleteById(
    query: DocumentNode,
    id: string
  ): Promise<M> {
    const result = await gqlClient.mutate({
      mutation: query,
      variables: {
        id
      }
    });
    if (result.errors) {
      throw result.errors;
    }

    return result.data[`update_${prefix}`].returning[0];
  }
  async function create(
    query: DocumentNode,
    form: any
  ): Promise<M> {
    const result = await gqlClient.mutate({
      mutation: query,
      variables: {
        form
      }
    });
    if (result.errors) {
      throw result.errors;
    }

    return result.data[`insert_${prefix}`].returning[0];
  }

  return {
    filter,
    getById,
    update,
    create,
    deleteById,
    fetchMany
  };

}
