import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ItemDetailsProps {
  name: string;
  thumbnail: string;
  category: string;
  type: string;
  weapon: string;
  currentPrice: number;
  totalQuantity: number;
  demandScore: number;
}

export const ItemDetails = ({
  name,
  thumbnail,
  category,
  type,
  weapon,
  currentPrice,
  totalQuantity,
  demandScore,
}: ItemDetailsProps) => {
  return (
    <div className="p-4 lg:p-6 overflow-y-auto max-h-screen">
      <h2 className="text-lg lg:text-xl font-bold text-white mb-4">{name}</h2>
      <img
        src={thumbnail}
        alt={name}
        className="w-full h-32 lg:h-48 object-cover rounded-lg mb-4"
      />
      <div className="space-y-4">
        <table className="w-full text-sm text-gray-300">
          <tbody>
            <tr>
              <td className="py-2">Category</td>
              <td className="text-right">{category}</td>
            </tr>
            <tr>
              <td className="py-2">Type</td>
              <td className="text-right">{type}</td>
            </tr>
            <tr>
              <td className="py-2">Weapon</td>
              <td className="text-right">{weapon}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
          <span className="text-white">Steam: €{currentPrice.toFixed(2)}</span>
          <Button variant="default">View Offer</Button>
        </div>

        <table className="w-full text-sm text-gray-300">
          <tbody>
            <tr>
              <td className="py-2">Total Quantity</td>
              <td className="text-right">{totalQuantity.toLocaleString()}</td>
            </tr>
            <tr>
              <td className="py-2">Demand Score</td>
              <td className="text-right">{demandScore.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
