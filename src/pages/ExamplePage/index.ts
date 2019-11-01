import { RouteConfig } from 'vue-router';
import { ExamplePageContainer } from './ExamplePageContainer';

export enum ExamplateRouterPath {}

export const LibraryRouter: RouteConfig = {
  path: '',
  component: ExamplePageContainer,
  children: []
};
