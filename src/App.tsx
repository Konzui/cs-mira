import { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { ItemView } from "@/components/item/ItemView";

const App = () => {
  const [currentPath, setCurrentPath] = useState("/dashboard");
  const [currentCategory, setCurrentCategory] = useState("Cases");
  const [currentItemId, setCurrentItemId] = useState("gallery-case");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);

    const pathParts = path.split("/").filter(Boolean);
    if (pathParts.length >= 1) {
      setCurrentCategory(
        pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1)
      );
    }
    if (pathParts.length >= 2) {
      setCurrentItemId(pathParts[1]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900">
      <Sidebar onNavigate={handleNavigate} currentPath={currentPath} />

      <main className="flex-1 lg:ml-64">
        {currentPath.includes("/cases/") ||
        currentPath.includes("/collections/") ||
        currentPath.includes("/stickers/") ? (
          <ItemView
            category={currentCategory}
            itemId={currentItemId}
            onNavigate={handleNavigate}
          />
        ) : (
          <div className="p-4 lg:p-8">
            <h1 className="text-xl lg:text-2xl font-bold text-white">
              {currentPath === "/dashboard"
                ? "Dashboard"
                : currentPath === "/browse"
                ? "Browse"
                : "Select an item to view details"}
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
