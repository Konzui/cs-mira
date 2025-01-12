import { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { ItemView } from "@/components/item/ItemView";
import { BrowseView } from "@/components/browse/BrowseView";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { CollectionsView } from "@/components/collections/CollectionsView";
import { CasesView } from "@/components/cases/CasesView";

interface CollectionItem {
  id: string;
  name: string;
  thumbnail: string;
  // Add other relevant fields
}

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

  const renderContent = () => {
    // If path includes a nested route like /cases/something
    if (currentPath.startsWith("/cases/")) {
      // Check if we're viewing a specific case or an item in a case
      const pathParts = currentPath.split("/").filter(Boolean);
      if (pathParts.length === 2) {
        // We're viewing a specific case (e.g., /cases/revolution-case)
        return (
          <CasesView onNavigate={handleNavigate} currentPath={currentPath} />
        );
      } else {
        // We're viewing an item in a case (e.g., /cases/revolution-case/glock-neo-noir)
        return (
          <ItemView
            category={currentCategory}
            itemId={currentItemId}
            onNavigate={handleNavigate}
          />
        );
      }
    }

    // If path includes a nested collections route
    if (currentPath.startsWith("/collections/")) {
      const pathParts = currentPath.split("/").filter(Boolean);
      if (pathParts.length === 2) {
        // We're viewing a specific collection
        return (
          <CollectionsView
            onNavigate={handleNavigate}
            currentPath={currentPath}
          />
        );
      } else {
        // We're viewing an item in a collection
        return (
          <ItemView
            category={currentCategory}
            itemId={currentItemId}
            onNavigate={handleNavigate}
          />
        );
      }
    }

    // Root routes
    switch (currentPath) {
      case "/dashboard":
        return <DashboardView />;
      case "/browse":
        return <BrowseView onNavigate={handleNavigate} />;
      case "/collections":
        return (
          <CollectionsView
            onNavigate={handleNavigate}
            currentPath={currentPath}
          />
        );
      case "/cases":
        return (
          <CasesView onNavigate={handleNavigate} currentPath={currentPath} />
        );
      default:
        return (
          <div className="p-4 lg:p-8">
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">
              Select an item to view details
            </h1>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <Sidebar onNavigate={handleNavigate} currentPath={currentPath} />
      <main className="flex-1 lg:ml-64">{renderContent()}</main>
    </div>
  );
};

export default App;
