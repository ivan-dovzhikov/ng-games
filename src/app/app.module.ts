import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { appComponent } from './app.component';
import { appConfig } from './app.config';

export const appModule = angular
  .module('app', [uiRouter])
  .config(appConfig)
  .component('app', appComponent).name;
