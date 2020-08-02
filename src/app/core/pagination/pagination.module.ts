import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { PaginationService, PaginationServiceName } from './pagination.service';
import {
  PaginationComponent,
  PaginationComponentName,
} from './pagination.component';

export const PaginationModule = angular
  .module('PaginationModule', [uiRouter])
  .factory(PaginationServiceName, () => PaginationService)
  .component(PaginationComponentName, PaginationComponent).name;
