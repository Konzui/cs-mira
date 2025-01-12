export interface BaseItem {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  priceChange: number;
  rarity: string;
}

export interface MarketItem extends BaseItem {
  items: BaseItem[];
}

export interface CaseItem extends BaseItem {
  items: BaseItem[];
}

export interface CollectionItem extends BaseItem {
  items: BaseItem[];
}