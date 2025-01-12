import { useState, useEffect } from "react";
import { mockCases } from "@/data/mockData";
import { ItemCard } from "../browse/ItemCard";
import { ChevronRight } from "lucide-react";
import { CaseItem } from "@/types/item";

interface CasesViewProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const CasesView = ({ onNavigate, currentPath }: CasesViewProps) => {
  const [currentCase, setCurrentCase] = useState<CaseItem | null>(null);

  useEffect(() => {
    const caseId = currentPath.split("/").pop();
    if (caseId && caseId !== "cases") {
      const foundCase = mockCases.find((c) => c.id === caseId);
      setCurrentCase(foundCase || null);
    } else {
      setCurrentCase(null);
    }
  }, [currentPath]);

  if (currentCase) {
    return (
      <div className="p-8 bg-background">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button
            onClick={() => onNavigate("/cases")}
            className="hover:text-foreground"
          >
            Cases
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{currentCase.name}</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">
          {currentCase.name}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {currentCase.items.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              thumbnail={item.thumbnail}
              price={item.price}
              priceChange={item.priceChange}
              rarity={item.rarity}
              onClick={() => onNavigate(`/cases/${currentCase.id}/${item.id}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background">
      <h1 className="text-3xl font-bold text-foreground mb-8">Cases</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {mockCases.map((caseItem) => (
          <ItemCard
            key={caseItem.id}
            name={caseItem.name}
            thumbnail={caseItem.thumbnail}
            price={caseItem.price}
            priceChange={caseItem.priceChange}
            rarity={caseItem.rarity}
            onClick={() => onNavigate(`/cases/${caseItem.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
