import { useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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

export const rarityOptions = [
  "Consumer",
  "Industrial",
  "Mil-Spec",
  "Restricted",
  "Classified",
  "Covert",
];

export const typeOptions = ["Rifle", "Pistol", "Knife", "Gloves", "Container"];

export const wearOptions = [
  "Factory New",
  "Minimal Wear",
  "Field-Tested",
  "Well-Worn",
  "Battle-Scarred",
];

export const FilterPanel = ({
  isOpen,
  onClose,
  onApplyFilters,
}: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const handleApply = () => {
    onApplyFilters(filters);
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
              Price Range (€)
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

          {/* Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Type</label>
            <div className="space-y-2">
              {typeOptions.map((type) => (
                <div key={type} className="flex items-center">
                  <Checkbox
                    id={type}
                    checked={filters.types.includes(type)}
                    onCheckedChange={(checked) => {
                      setFilters({
                        ...filters,
                        types: checked
                          ? [...filters.types, type]
                          : filters.types.filter((t) => t !== type),
                      });
                    }}
                  />
                  <label htmlFor={type} className="ml-2 text-sm text-gray-300">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Wear */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Wear</label>
            <div className="space-y-2">
              {wearOptions.map((wear) => (
                <div key={wear} className="flex items-center">
                  <Checkbox
                    id={wear}
                    checked={filters.wear.includes(wear)}
                    onCheckedChange={(checked) => {
                      setFilters({
                        ...filters,
                        wear: checked
                          ? [...filters.wear, wear]
                          : filters.wear.filter((w) => w !== wear),
                      });
                    }}
                  />
                  <label htmlFor={wear} className="ml-2 text-sm text-gray-300">
                    {wear}
                  </label>
                </div>
              ))}
            </div>
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
