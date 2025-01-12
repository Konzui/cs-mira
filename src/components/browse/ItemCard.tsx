import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ItemCardProps {
  name: string;
  thumbnail: string;
  price: number;
  priceChange: number;
  rarity: string;
  onClick: () => void;
}

export const ItemCard = ({
  name,
  thumbnail,
  price,
  priceChange,
  rarity,
  onClick,
}: ItemCardProps) => {
  const isPriceUp = priceChange >= 0;

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "consumer":
        return "bg-gray-500";
      case "industrial":
        return "bg-blue-500";
      case "mil-spec":
        return "bg-blue-600";
      case "restricted":
        return "bg-purple-500";
      case "classified":
        return "bg-pink-500";
      case "covert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card
      className="bg-gray-800 hover:bg-gray-750 transition-colors cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={name}
          className="w-full aspect-square object-cover"
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium text-white ${getRarityColor(
            rarity
          )}`}
        >
          {rarity}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium truncate">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-semibold text-white">
            €{price.toFixed(2)}
          </span>
          <span
            className={`flex items-center text-sm ${
              isPriceUp ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPriceUp ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(priceChange).toFixed(1)}%
          </span>
        </div>
      </div>
    </Card>
  );
};
