import { IVendor } from './vendor-interface';

export interface IParts {
  ID: number;
  NameInput: string;
  BrandInput: string;
  Category: string;
  MaterialInput: string;
  ReqPcsInput: string;
  ReqUnit: number;
  Vendors?: IVendor[];
  Automobiles: IAutomobile[];
}

export interface IAutomobile {
  Id: number;
  Name: string;
}
