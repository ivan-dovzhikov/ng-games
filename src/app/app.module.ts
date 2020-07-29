import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { appConfig } from './app.config';
import { appComponent } from './app.component';

export const appModule = angular
  .module('app', [uiRouter])
  .config(appConfig)
  .component(appComponent.selector, appComponent.options).name;
