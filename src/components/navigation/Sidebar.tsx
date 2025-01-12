import { useState, useEffect } from "react";
import {
  Menu,
  BarChart2,
  Grid,
  Package,
  Sticker,
  ChevronDown,
  ChevronRight,
  Boxes,
  PersonStanding,
  Ticket,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Add missing types
interface NavigationChildItem {
  title: string;
  path: string;
}

interface NavigationItem {
  title: string;
  icon: any; // or use the correct Lucide icon type
  path: string;
  children?: NavigationChildItem[];
}

interface SidebarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  sidebarWidth?: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: BarChart2,
    path: "/dashboard",
  },
  {
    title: "Browse",
    icon: Grid,
    path: "/browse",
  },
  {
    title: "Cases",
    icon: Package,
    path: "/cases", // Added missing path
    children: [
      { title: "Gallery Case", path: "/cases/gallery" },
      { title: "Danger Zone Case", path: "/cases/danger-zone" },
      { title: "Horizon Case", path: "/cases/horizon" },
    ],
  },
  {
    title: "Collections",
    icon: Boxes,
    path: "/collections", // Added missing path
    children: [
      { title: "Dust 2021 Collection", path: "/collections/dust-2021" },
      {
        title: "Graphic Design Collection",
        path: "/collections/graphic-design",
      },
      {
        title: "The Overpass 2024 Collection",
        path: "/collections/overpass-2024",
      },
    ],
  },
  {
    title: "Stickers",
    icon: Sticker,
    path: "/stickers", // Added missing path
    children: [
      {
        title: "Shanghai 2024 Sticker Capsules",
        path: "/stickers/shanghai-2024-sticker-capsules",
      },
      {
        title: "Copenhagen 2024 Sticker Capsules",
        path: "/stickers/copenhagen-2024-sticker-capsules",
      },
      {
        title: "Paris 2023 Sticker Capsules",
        path: "/stickers/paris-2023-sticker-capsules",
      },
    ],
  },
  {
    title: "Agents",
    icon: PersonStanding,
    path: "/agents", // Added missing path
    children: [
      {
        title: "Operation Ripdide",
        path: "/agent/operation-riptide",
      },
      {
        title: "Operation Broken Fang",
        path: "/agent/operation-broken-fang",
      },
      {
        title: "Operation Shattered Web",
        path: "/agent/operation-sattered-web",
      },
    ],
  },
  {
    title: "Operation",
    icon: Ticket,
    path: "/operation", // Added missing path
    children: [
      {
        title: "Ripdide",
        path: "/operation/riptide",
      },
      {
        title: "Broken Fang",
        path: "/operation/broken-fang",
      },
      {
        title: "Shattered Web",
        path: "/operation/sattered-web",
      },
    ],
  },
  {
    title: "Charms",
    icon: Gem,
    path: "/charms", // Added missing path
    children: [
      {
        title: "Missing Link Charms",
        path: "/charms/missing-link-charms",
      },
      {
        title: "Small Arms Charms",
        path: "/charms/small-arms-charms",
      },
    ],
  },
];

export const Sidebar = ({
  onNavigate,
  currentPath,
  sidebarWidth = "w-64",
}: SidebarProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const renderNavItem = (item: NavigationItem) => {
    const isActive = currentPath === item.path;
    const isItemExpanded = expanded[item.title];
    const Icon = item.icon;

    return (
      <div key={item.title}>
        <button
          onClick={() => {
            if (item.children) {
              toggleExpand(item.title);
            } else {
              onNavigate(item.path);
            }
          }}
          className={cn(
            "text-primary-foreground flex items-center w-full px-3 py-2 text-sm font-medium rounded-md",
            isActive
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:bg-gray-700"
          )}
        >
          <div className="flex items-left">
            {Icon && <Icon className="w-5 h-5" />}
            {!isCollapsed && <span className="ml-3">{item.title}</span>}
          </div>
          {!isCollapsed && item.children && (
            <span className="ml-auto">
              {isItemExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
        </button>
        {!isCollapsed && item.children && isItemExpanded && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child) => (
              <button
                key={child.path}
                onClick={() => onNavigate(child.path)}
                className={cn(
                  "block w-full px-3 py-2 text-sm font-medium rounded-md text-left truncate",
                  currentPath === child.path
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                )}
              >
                {child.title}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-primary text-primary-foreground transition-opacity duration-300",
          isMobile && !isCollapsed
            ? "opacity-100 z-40"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCollapsed(true)}
      />
      <div
        className={cn(
          isCollapsed ? "w-16" : sidebarWidth,
          "fixed top-0 left-0 h-screen bg-gray-900 transition-all duration-300 ease-in-out",
          isMobile && !isCollapsed ? "z-50 shadow-lg" : "z-30"
        )}
      >
        <div className="px-4 py-5">
          <div className="flex items-center justify-between mb-8">
            {!isCollapsed && (
              <span className="text-xl font-bold text-white">Logo</span>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md text-gray-300 hover:bg-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-1">{navigationItems.map(renderNavItem)}</nav>
        </div>
      </div>
    </>
  );
};
