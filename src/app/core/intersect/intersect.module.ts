import angular from 'angular';
import { IntersectPipe, IntersectPipeName } from './intersect.pipe';

export const IntersectModule = angular
  .module('IntersectModule', [])
  .filter(IntersectPipeName, IntersectPipe).name;
