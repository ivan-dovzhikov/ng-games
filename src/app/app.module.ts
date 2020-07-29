import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { appConfig } from './app.config';
import { headerComponent } from './header/header.component';
import { appComponent } from './app.component';

export const appModule = angular
  .module('app', [uiRouter])
  .config(appConfig)
  .component(headerComponent.selector, headerComponent.options)
  .component(appComponent.selector, appComponent.options).name;
