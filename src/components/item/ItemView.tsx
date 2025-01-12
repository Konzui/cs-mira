import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { PriceChart } from "./PriceChart";
import { ItemStats } from "./ItemStats";
import { ItemDetails } from "./ItemDetails";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import { useItemData } from "@/hooks/useItemData";

interface ItemViewProps {
  category: string;
  itemId: string;
  onNavigate: (path: string) => void;
}

export const ItemView = ({ category, itemId, onNavigate }: ItemViewProps) => {
  const [timeRange, setTimeRange] = useState("7d");
  const { data, isLoading, error, refetch } = useItemData(itemId);

  if (isLoading) {
    return (
      <div className="flex-1 h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex-1 h-screen">
        <ErrorMessage
          message={error || "Failed to load data"}
          retry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900">
      <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-4 lg:mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <button
                onClick={() => onNavigate("/")}
                className="text-gray-400 hover:text-white text-sm lg:text-base"
              >
                Home
              </button>
            </li>
            <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
            <li>
              <button
                onClick={() => onNavigate(`/${category.toLowerCase()}`)}
                className="text-gray-400 hover:text-white text-sm lg:text-base"
              >
                {category}
              </button>
            </li>
            <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
            <li>
              <div className="text-white font-medium text-sm lg:text-base">
                {data.name}
              </div>
            </li>
          </ol>
        </nav>

        {/* Stats */}
        <ItemStats
          priceChange={data.stats.priceChange}
          priceChangePercentage={data.stats.priceChangePercentage}
          offersSold={data.stats.offersSold}
          offersChange={data.stats.offersChange}
        />

        {/* Time Range Selector */}
        <div className="overflow-x-auto -mx-4 px-4 mb-4 lg:mb-8">
          <TimeRangeSelector
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>

        {/* Price Chart */}
        <div className="h-[50vh] lg:h-[60vh]">
          <PriceChart data={data.priceHistory} />
        </div>
      </div>

      {/* Right Drawer - Fixed on mobile, side drawer on desktop */}
      <div className="lg:w-80 bg-gray-800 border-t lg:border-l border-gray-700">
        <ItemDetails
          name={data.name}
          thumbnail={data.thumbnail}
          category={data.category}
          type={data.type}
          weapon={data.weapon}
          currentPrice={data.currentPrice}
          totalQuantity={data.totalQuantity}
          demandScore={data.demandScore}
        />
      </div>
    </div>
  );
};
