import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { GamesModule } from 'app/core/games/games.module';
import { GameCardModule } from 'app/game-card/game-card.module';
import { IntersectModule } from 'app/core/intersect/intersect.module';
import {
  GamesListComponentName,
  GamesListComponent,
} from './games-list.component';
import {
  filteredGamesLengthName,
  filteredGamesLengthValue,
} from './filtered-games-length.value';
import { PaginationModule } from 'app/core/pagination/pagination.module';

export const GamesListModule = angular
  .module('GamesListModule', [
    uiRouter,
    GamesModule,
    GameCardModule,
    IntersectModule,
    PaginationModule,
  ])
  .component(GamesListComponentName, GamesListComponent)
  .value(filteredGamesLengthName, filteredGamesLengthValue).name;
