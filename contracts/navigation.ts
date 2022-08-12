export interface ILinkGroup {
    icon: any;
    label: string;
    link?: string;
    initiallyOpened?: boolean;
    sub?: ILink[];  
}

export interface ILink {
    label: string;
    link?: string;
    icon?: any;
    isSubMenu?: boolean;
}

export interface ILinkProps extends ILink {
    active: boolean;
}

export interface ISidebar {
    group: string;
    menus: ILinkGroup[]
}

export type TLinkChangeCallback = (link: string) => any