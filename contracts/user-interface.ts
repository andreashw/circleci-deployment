import { IRole } from './role-interface';

export interface IUser {
  ID: number;
  name: string;
  email: string;
  is_active: boolean;
  Roles: IRole[];
}

export interface IGetUser {
  ID: number;
  Name: string;
  Email: string;
  IsActive: boolean;
  Roles: IRole[];
}
