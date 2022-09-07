export interface IClient {
  ID: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  city_id: number;
  province_id: number;
}

export interface IProvince {
  ID: number;
  name: string;
}
