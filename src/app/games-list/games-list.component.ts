import { IComponentOptions } from 'angular';
import { StateParams } from 'angular-ui-router';

import { GamesService, GamesServiceName } from 'app/core/games/games.service';
import type { GamesArray } from 'app/core/games/types';

import template from './games-list.component.html';
import './games-list.component.scss';

export const GamesListComponentName = 'appGamesList';

export const GamesListComponent: IComponentOptions = {
  template,
  controllerAs: 'vm',
  controller: class GamesListController {
    static $inject = ['$stateParams', GamesServiceName, 'filteredGamesLength'];

    constructor(
      $stateParams: StateParams,
      gamesService: GamesService,
      public filteredGamesLength: { value: number }
    ) {
      this.page = $stateParams.page;
      if (gamesService.data) this.games = gamesService.data.games;
      this.unsubscribe = gamesService.subscribe(
        ({ games }) => (this.games = games)
      );
    }

    public $onDestroy() {
      this.unsubscribe();
    }

    public page: number;
    public gamesPerPage = 20;
    public games: GamesArray = [];
    public pipes = {
      filter: {
        name: '',
        isFavorite: undefined,
      },
      intersect: [],
      order: ['-inPriority', '-isFavorite', 'name'],
    };
    public unsubscribe: () => void;

    public setFilteredGamesLength(length: number) {
      this.filteredGamesLength.value = length;
    }

    public toggleFavorite(targetId: string) {
      this.games = this.games.map(game => {
        if (game.id === targetId) game.isFavorite = !game.isFavorite;
        return game;
      });
    }

    // TODO replace with index
    public togglePriority(targetId: string) {
      this.games = this.games.map(game => {
        if (game.id === targetId) game.inPriority = !game.inPriority;
        return game;
      });
    }
  },
};
