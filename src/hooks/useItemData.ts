import { useState, useEffect } from 'react';
import { Item } from '@/types/item';

interface UseItemDataResult {
  data: Item | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useItemData = (itemId: string): UseItemDataResult => {
  const [data, setData] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: Item = {
        name: "Gallery Case",
        thumbnail: "/src/img/gallery-case.webp",
        category: "Skin",
        type: "Rifle",
        weapon: "Covert",
        currentPrice: 20,
        totalQuantity: 15000,
        demandScore: 8.5,
        priceHistory: Array.from({ length: 100 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          price: Math.random() * 100 + 50,
          supply: Math.floor(Math.random() * 1000),
          offersSold: Math.floor(Math.random() * 100),
        })),
        stats: {
          priceChange: 2.5,
          priceChangePercentage: 12.5,
          offersSold: 150,
          offersChange: 5,
        },
      };
      
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch item data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemId]);

  return { data, isLoading, error, refetch: fetchData };
};