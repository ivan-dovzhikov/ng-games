import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { appConfig } from './app.config';
import { GamesModule } from './core/games/games.module';
import {
  HeaderComponent,
  HeaderComponentName,
} from './header/header.component';
import { AppComponent, AppComponentName } from './app.component';

export const appModule = angular
  .module('app', [uiRouter, GamesModule])
  .config(appConfig)
  .component(HeaderComponentName, HeaderComponent)
  .component(AppComponentName, AppComponent).name;
