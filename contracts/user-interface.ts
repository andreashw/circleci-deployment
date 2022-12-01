import { IRole } from './role-interface';

export interface IUser {
  ID: number;
  Email: string;
  IsActive: boolean;
  Roles: string;
}

export interface IGetUser {
  ID: number;
  Name: string;
  Email: string;
  IsActive: boolean;
  Roles: IRole[];
}
