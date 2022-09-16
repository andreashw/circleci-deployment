import { IProvince } from './client-interface';

export interface IVendor {
  ID: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  url_website: string;
  country_id: number;
  Country?: IProvince;
  description: string;
}
