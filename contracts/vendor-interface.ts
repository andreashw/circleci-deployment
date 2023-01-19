import { IProvince } from './client-interface';

export interface IVendor {
  ID: number;
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  Type: string;
  UrlWebsite: string;
  CountryId: number;
  Country?: IProvince;
  Description: string;
}
