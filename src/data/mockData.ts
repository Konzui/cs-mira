import { CaseItem, CollectionItem } from "@/types/item";

export const mockCases: CaseItem[] = [
  {
    id: "revolution-case",
    name: "Revolution Case",
    thumbnail: "/api/placeholder/400/400",
    price: 12.50,
    priceChange: -2.3,
    rarity: "Industrial",
    items: [
      {
        id: "glock-neo-noir",
        name: "Glock-18 | Neo-Noir",
        thumbnail: "/api/placeholder/400/400",
        price: 8.50,
        priceChange: -1.2,
        rarity: "Classified"
      }
    ]
  }
];

export const mockCollections: CollectionItem[] = [
  {
    id: "dust-2021",
    name: "Dust 2021 Collection",
    thumbnail: "/api/placeholder/400/400",
    price: 245.50,
    priceChange: 12.3,
    rarity: "Classified",
    items: [
      {
        id: "ak47-asiimov",
        name: "AK-47 | Asiimov",
        thumbnail: "/api/placeholder/400/400",
        price: 124.50,
        priceChange: 5.2,
        rarity: "Covert"
      }
    ]
  }
];