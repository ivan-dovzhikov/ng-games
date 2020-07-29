import angular from 'angular';

import { ObserverServiceName, ObserverService } from './observer.service';

export const ObserverModule = angular
  .module('ObserverModule', [])
  .factory(ObserverServiceName, () => ObserverService).name;
