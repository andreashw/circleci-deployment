export interface IPermission {
  Group: string;
  Permission: IListPermission[];
}

export interface IListPermission {
  ID: number;
  name: string;
  group: string;
}
