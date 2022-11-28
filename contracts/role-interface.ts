export interface IRole {
  ID: number;
  name: string;
  description: string;
}

export interface IGetOneRole {
  ID: number;
  Name: string;
  Description: string;
  Permissions: number[];
}
