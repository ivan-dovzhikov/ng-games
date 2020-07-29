import { IComponentOptions } from 'angular';
import { StateParams } from 'angular-ui-router';

import { GamesServiceName, GamesService } from 'app/core/games/games.service';
import type { GamesArray } from 'app/core/games/types';

import template from './games-list.component.html';
import './games-list.component.scss';

export const GamesListComponentName = 'appGamesList';

export const GamesListComponent: IComponentOptions = {
  template,
  controllerAs: 'vm',
  controller: class GamesListController {
    static $inject = [GamesServiceName, '$stateParams'];

    constructor(private gamesService: GamesService, { page }: StateParams) {
      this.page = page;
    }

    private unsubscribe?: () => void;

    public games?: GamesArray;

    public page: number;
    public gamesPerPage = 20;
    public order = 'name';

    $onInit() {
      if (this.gamesService.data) {
        this.games = this.gamesService.data.games;
      }

      this.unsubscribe = this.gamesService.subscribe(data => {
        this.games = data.games;
      });
    }

    $onDestroy() {
      if (this.unsubscribe) this.unsubscribe();
    }
  },
};
