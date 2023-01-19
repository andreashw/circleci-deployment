export interface IRole {
  ID: number;
  Name: string;
  Description: string;
}

export interface IGetOneRole {
  ID: number;
  Name: string;
  Description: string;
  Permissions: number[];
}
