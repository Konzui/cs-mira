import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { ItemCard } from "./ItemCard";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface BrowseViewProps {
  onNavigate: (path: string) => void;
}

// Mock data - replace with real API data
const mockItems = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i}`,
  name: `Item ${i + 1}`,
  thumbnail: "/api/placeholder/400/400",
  price: Math.random() * 1000,
  priceChange: Math.random() * 20 - 10,
  rarity: ["Common", "Uncommon", "Rare", "Mythical", "Legendary"][
    Math.floor(Math.random() * 5)
  ],
}));

export const BrowseView = ({ onNavigate }: BrowseViewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState(mockItems);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setItems(
      mockItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setIsLoading(false);
  };

  const handleFilter = () => {
    // Implement filter modal/drawer
    console.log("Open filter modal");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <SearchBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={() => {}}
      />

      <div className="p-4 lg:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                name={item.name}
                thumbnail={item.thumbnail}
                price={item.price}
                priceChange={item.priceChange}
                rarity={item.rarity}
                onClick={() => onNavigate(`/items/${item.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
