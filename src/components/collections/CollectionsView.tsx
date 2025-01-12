import { useState, useEffect } from "react";
import { mockCollections } from "@/data/mockData";
import { ItemCard } from "../browse/ItemCard";
import { ChevronRight } from "lucide-react";

interface CollectionsViewProps {
  onNavigate: (path: string) => void;
  currentPath: string; // Add this prop to check if we're viewing a specific collection
}

export const CollectionsView = ({
  onNavigate,
  currentPath,
}: CollectionsViewProps) => {
  const [currentCollection, setCurrentCollection] = useState(null);

  useEffect(() => {
    // Extract collection ID from path if we're viewing a specific collection
    const collectionId = currentPath.split("/").pop();
    if (collectionId && collectionId !== "collections") {
      const collection = mockCollections.find((c) => c.id === collectionId);
      setCurrentCollection(collection);
    } else {
      setCurrentCollection(null);
    }
  }, [currentPath]);

  if (currentCollection) {
    return (
      <div className="p-8 bg-background">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button
            onClick={() => onNavigate("/collections")}
            className="hover:text-foreground"
          >
            Collections
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{currentCollection.name}</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">
          {currentCollection.name}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {currentCollection.items.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              thumbnail={item.thumbnail}
              price={item.price}
              priceChange={item.priceChange}
              rarity={item.rarity}
              onClick={() =>
                onNavigate(`/collections/${currentCollection.id}/${item.id}`)
              }
            />
          ))}
        </div>
      </div>
    );
  }

  // Collections list view remains the same
  return (
    <div className="p-8 bg-background">
      <h1 className="text-3xl font-bold text-foreground mb-8">Collections</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {mockCollections.map((collection) => (
          <ItemCard
            key={collection.id}
            name={collection.name}
            thumbnail={collection.thumbnail}
            price={collection.price}
            priceChange={collection.priceChange}
            rarity={collection.rarity}
            onClick={() => onNavigate(`/collections/${collection.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
