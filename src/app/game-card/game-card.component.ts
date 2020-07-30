import { IComponentOptions, IScope } from 'angular';
import { Game } from 'app/core/games/types';

import template from './game-card.component.html';
import './game-card.component.scss';

export const GameCardName = 'appGameCard';

export const GameCardComponent: IComponentOptions = {
  template,
  bindings: {
    data: '<',
    toggleFavorite: '&',
    togglePriority: '&',
  },
  controllerAs: 'vm',
  controller: class GameCardController {
    public data!: Game;
    public toggleFavorite!: () => void;
    public togglePriority!: () => void;

    getCardClass() {
      let cardClass = 'game-card';

      if (this.data.inPriority) cardClass += '--priority';
      if (this.data.isFavorite) cardClass += '--favorite';

      return cardClass;
    }
  },
};
