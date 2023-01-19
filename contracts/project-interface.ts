import { IAutomobile } from './automobile-interface';
import { IClient, IProvince } from './client-interface';
import { IEngine } from './engine-interface';

export interface IProject {
  ID: number;
  Name: string;
  PicId: number;
  ClientId: number;
  AutomobileId: number;
  EngineId: number;
  Client?: IClient;
  PIC?: IProvince;
  Automobile?: IAutomobile;
  PowerType: string;
  Engine?: IEngine;
  Notes: string;
}
