export interface PriceHistoryPoint {
  date: Date;
  price: number;
  supply: number;
  offersSold: number;
}

export interface ItemStats {
  priceChange: number;
  priceChangePercentage: number;
  offersSold: number;
  offersChange: number;
}

export interface Item {
  name: string;
  thumbnail: string;
  category: string;
  type: string;
  weapon: string;
  currentPrice: number;
  totalQuantity: number;
  demandScore: number;
  priceHistory: PriceHistoryPoint[];
  stats: ItemStats;
}