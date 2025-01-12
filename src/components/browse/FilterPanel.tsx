import { useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  priceRange: [number, number];
  rarities: string[];
  types: string[];
  wear: string[];
  minDemandScore: number;
}

const initialFilters: FilterOptions = {
  priceRange: [0, 1000],
  rarities: [],
  types: [],
  wear: [],
  minDemandScore: 0,
};

export const FilterPanel = ({
  isOpen,
  onClose,
  onApplyFilters,
}: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const rarityOptions = [
    "Consumer",
    "Industrial",
    "Mil-Spec",
    "Restricted",
    "Classified",
    "Covert",
  ];
  const typeOptions = ["Rifle", "Pistol", "Knife", "Gloves", "Container"];
  const wearOptions = [
    "Factory New",
    "Minimal Wear",
    "Field-Tested",
    "Well-Worn",
    "Battle-Scarred",
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[300px] sm:w-[400px] bg-gray-800 border-gray-700">
        <SheetHeader>
          <SheetTitle className="text-white">Filters</SheetTitle>
        </SheetHeader>

        <div className="py-4 space-y-6">
          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Price Range
            </label>
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    priceRange: value as [number, number],
                  })
                }
                className="mt-2"
              />
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>€{filters.priceRange[0]}</span>
                <span>€{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Rarity */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Rarity</label>
            <div className="space-y-2">
              {rarityOptions.map((rarity) => (
                <div key={rarity} className="flex items-center">
                  <Checkbox
                    id={rarity}
                    checked={filters.rarities.includes(rarity)}
                    onCheckedChange={(checked) => {
                      setFilters({
                        ...filters,
                        rarities: checked
                          ? [...filters.rarities, rarity]
                          : filters.rarities.filter((r) => r !== rarity),
                      });
                    }}
                  />
                  <label
                    htmlFor={rarity}
                    className="ml-2 text-sm text-gray-300"
                  >
                    {rarity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Demand Score */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Minimum Demand Score
            </label>
            <Select
              value={filters.minDemandScore.toString()}
              onValueChange={(value) =>
                setFilters({ ...filters, minDemandScore: Number(value) })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select minimum score" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((score) => (
                  <SelectItem key={score} value={score.toString()}>
                    {score}+
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleReset}
              className="flex-1"
            >
              Reset
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
