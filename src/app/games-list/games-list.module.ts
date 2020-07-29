import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { GamesModule } from 'app/core/games/games.module';
import {
  GamesListComponentName,
  GamesListComponent,
} from './games-list.component';

export const GamesListModule = angular
  .module('GamesListModule', [GamesModule, uiRouter])
  .component(GamesListComponentName, GamesListComponent).name;
