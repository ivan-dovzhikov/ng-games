import angular from 'angular';
import { GameCardComponent, GameCardName } from './game-card.component';

export const GameCardModule = angular
  .module('GameCardModule', [])
  .component(GameCardName, GameCardComponent).name;
