import angular from 'angular';
import ngResource from 'angular-resource';

import { ObserverModule } from 'app/core/observer/observer.module';
import { GamesServiceName, GamesService } from './games.service';

export const GamesModule = angular
  .module('GamesModule', [ngResource, ObserverModule])
  .service(GamesServiceName, GamesService).name;
