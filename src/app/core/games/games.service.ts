import { resource } from 'angular';

import type { Category, Game, GamesData, Merchant } from './types';
import {
  ObserverService,
  ObserverServiceName,
} from 'app/core/observer/observer.service';

export const GamesServiceName = 'GamesService';

export class GamesService {
  static $inject = ['$resource', ObserverServiceName];
  constructor(
    private $resource: resource.IResourceService,
    Observer: typeof ObserverService
  ) {
    this.observer = new Observer();
    this.subscribe = this.observer.subscribe;
    this.fetchData();
  }

  private readonly API_PATH = 'https://www.rost.bet/api/v1/games';
  private observer: ObserverService<GamesData>;

  public data?: GamesData;

  public subscribe: ObserverService<GamesData>['subscribe'];

  private fetchData() {
    return this.$resource(this.API_PATH).get({}, this.onSuccess);
  }

  private onSuccess = (data: any) => {
    this.data = this.processData(data);
    this.observer.notify(this.data);
  };

  private processData(data: any): GamesData {
    const { games, categories, merchants } = data;

    const processedData: GamesData = {
      games: [],
      categories: [],
      merchants: [],
    };

    processedData.games = games.map(
      (game: any): Game => ({
        id: game.ID,
        name: game.Name.en,
        imageFullPath: game.ImageFullPath,
        url: game.Url,
        merchantId: game.MerchantID,
        categoryId: game.CategoryID,
        isFavorite: false,
        inPriority: false,
      })
    );

    processedData.categories = categories.map(
      (category: any): Category => ({
        id: category.ID,
        name: category.Name.en,
      })
    );

    processedData.merchants = Object.values(merchants).map(
      (merchant: any): Merchant => ({
        id: merchant.ID,
        name: merchant.Name,
      })
    );

    return processedData;
  }
}
