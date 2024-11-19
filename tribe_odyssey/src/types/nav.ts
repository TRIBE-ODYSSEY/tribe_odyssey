export interface NavLink {
  name: string;
  path: string;
  external?: boolean;
}

export interface NavItem {
  text: string;
  links: NavLink[];
} 