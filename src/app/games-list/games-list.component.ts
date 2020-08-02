import { IComponentOptions } from 'angular';
import { StateParams, StateService } from 'angular-ui-router';

import { GamesService, GamesServiceName } from 'app/core/games/games.service';
import type { GamesArray } from 'app/core/games/types';
import {
  FilteredGamesLength,
  filteredGamesLengthName,
} from './filtered-games-length.value';

import template from './games-list.component.html';
import './games-list.component.scss';

export const GamesListComponentName = 'appGamesList';

export const GamesListComponent: IComponentOptions = {
  template,
  controllerAs: 'vm',
  controller: class GamesListController {
    static $inject = [
      '$stateParams',
      '$state',
      GamesServiceName,
      filteredGamesLengthName,
    ];

    constructor(
      $stateParams: StateParams,
      private $state: StateService,
      private gamesService: GamesService,
      public filteredGamesLength: FilteredGamesLength
    ) {
      this.init();
      this.unsubscribe = gamesService.subscribe(this.init);
      this.pagination.currentPage = +$stateParams.page;
    }

    private init = () => {
      if (!this.gamesService.data) return;

      this.games = this.gamesService.data.games;

      const currentPage = +this.pagination.currentPage;
      const numberOfPages = (this.pagination.numberOfPages = Math.ceil(
        this.games.length / this.pagination.gamesPerPage
      ));

      if (
        Object.is(currentPage, NaN) ||
        currentPage < 0 ||
        currentPage > numberOfPages
      ) {
        this.redirectToStart();
      }
    };

    public $onDestroy() {
      this.unsubscribe();
    }

    public selection = {
      filter: {
        name: '',
        isFavorite: undefined,
      },
      intersect: {
        merchantId: [],
        categoryId: [],
      },
      order: ['-inPriority', '-isFavorite', 'name'],
    };

    public pagination = {
      currentPage: 1,
      gamesPerPage: 20,
      numberOfPages: 1,
    };

    public games: GamesArray = [];
    public unsubscribe: () => void;

    private redirectToStart() {
      this.$state.go('.', { page: 1 }, { notify: false });
    }

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
