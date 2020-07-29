export interface Game {
  id: string;
  name: string;
  imageFullPath: string;
  url: string;
  merchantId: string;
  categoryId: string[];
}

export type GamesArray = Game[];

export interface Category {
  id: string;
  name: string;
}

export type CategoriesArray = Category[];

export interface Merchant {
  id: string;
  name: string;
}

export type MerchantsArray = Merchant[];

export interface GamesData {
  games: GamesArray;
  categories: CategoriesArray;
  merchants: MerchantsArray;
}
