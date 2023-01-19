export interface IClient {
  ID: number;
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  Notes: string;
  CityId: number;
  ProvinceId: number;
  City?: IProvince;
  Province?: IProvince;
}

export interface IProvince {
  ID: number;
  Id?: number;
  name?: string;
  Name?: string;
}
