import { IVendor } from './vendor-interface';

export interface IParts {
  ID: number;
  name_input: string;
  brand_input: string;
  category: string;
  material_input: string;
  req_pcs_input: string;
  req_unit: number;
  vendors?: IVendor[];
  automobiles: IAutomobile[];
}

export interface IAutomobile {
  id: number;
  name: string;
}
