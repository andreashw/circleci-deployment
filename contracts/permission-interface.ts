export interface IPermission {
  Group: string;
  Permission: IListPermission[];
}

export interface IListPermission {
  ID: number;
  name: string;
  group: string;
}

export interface IResPermission {
  permissions: IListAllPermission[];
}

export interface IListAllPermission {
  name: string;
  group: string;
  roles: IRoleDesc[];
}

export interface IRoleDesc {
  name: string;
}
