import { IAutomobile } from './automobile-interface';
import { IClient, IProvince } from './client-interface';

export interface IProject {
  ID: number;
  name: string;
  pic_id: number;
  client_id: number;
  automobile_id: number;
  engine_id: number;
  Client?: IClient;
  Pic?: IProvince;
  Automobile?: IAutomobile;
  power_type: string;
  Engine?: IProvince;
  notes: string;
}
