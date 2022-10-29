export interface ILinkGroup {
  props?: any;
  icon: any;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  sub?: ILink[];
  showMenu?: any;
}

export interface ILink {
  label: string;
  link?: string;
  icon?: any;
  isSubMenu?: boolean;
}

export interface ILinkProps extends ILink {
  active: boolean;
  onClicked?: () => void;
  props?: any;
}

export interface ISidebar {
  group: string;
  menus: ILinkGroup[];
}

export interface IBreadcrumbs {
  title?: string;
  href?: string;
}

export type TLinkChangeCallback = (link: string) => any;
