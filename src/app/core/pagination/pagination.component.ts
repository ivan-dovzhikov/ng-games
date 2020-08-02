import { IComponentOptions } from 'angular';

import template from './pagination.component.html';
import './pagination.component.scss';
import {
  PaginationOptions,
  PaginationService,
  PaginationServiceName,
} from './pagination.service';

export const PaginationComponentName = 'appPagination';

export const PaginationComponent: IComponentOptions = {
  template,
  bindings: {
    options: '<',
    url: '<',
  },
  controllerAs: 'vm',
  controller: class PaginationController {
    static $inject = [PaginationServiceName];

    constructor(private Pagination: typeof PaginationService) {}

    $onChanges() {
      this.pagination = new this.Pagination(this.options).setChars();
    }

    public pagination!: PaginationService;
    public options!: PaginationOptions;
    public url!: string;
  },
};
