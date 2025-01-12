import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  title: string;
  icon?: LucideIcon;
  path: string;
  children?: NavigationChildItem[];
}

export interface NavigationChildItem {
  title: string;
  path: string;
}