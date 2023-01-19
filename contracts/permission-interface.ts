export interface IPermission {
  Group: string;
  Permission: IListPermission[];
}

export interface IListPermission {
  ID: number;
  Name: string;
  Group: string;
}

export interface IResPermission {
  Permissions: IListAllPermission[];
}

export interface IListAllPermission {
  Name: string;
  Group: string;
  Roles: IRoleDesc[];
}

export interface IRoleDesc {
  Name: string;
}
