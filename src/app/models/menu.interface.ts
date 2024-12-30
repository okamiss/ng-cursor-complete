export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  link?: string;
  permission?: string;
  children?: MenuItem[];
} 