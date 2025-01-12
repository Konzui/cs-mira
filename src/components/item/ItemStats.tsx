import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ItemStatsProps {
  priceChange: number;
  priceChangePercentage: number;
  offersSold: number;
  offersChange: number;
}

export const ItemStats = ({
  priceChange,
  priceChangePercentage,
  offersSold,
  offersChange,
}: ItemStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
      <Card className="px-4 py-5 bg-gray-800">
        <dt className="text-sm font-medium text-gray-400 truncate">
          Price Change
        </dt>
        <dd className="mt-1 text-3xl font-semibold text-white flex items-center">
          €{Math.abs(priceChange).toFixed(2)}
          <span
            className={`ml-2 flex items-center ${
              priceChangePercentage >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {priceChangePercentage >= 0 ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span className="text-sm">
              {Math.abs(priceChangePercentage).toFixed(1)}%
            </span>
          </span>
        </dd>
      </Card>

      <Card className="px-4 py-5 bg-gray-800">
        <dt className="text-sm font-medium text-gray-400 truncate">
          Offers Sold
        </dt>
        <dd className="mt-1 text-3xl font-semibold text-white">
          {offersSold.toLocaleString()}
        </dd>
      </Card>

      <Card className="px-4 py-5 bg-gray-800">
        <dt className="text-sm font-medium text-gray-400 truncate">
          Offers Change
        </dt>
        <dd className="mt-1 text-3xl font-semibold text-white">
          {offersChange > 0 ? "+" : ""}
          {offersChange}%
        </dd>
      </Card>
    </div>
  );
};
