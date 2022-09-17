export interface IEngine {
  ID: number;
  name: string;
  engine_manufacture_id: number;
  year_start: number;
  year_end: number;
  engine_type: string;
  fuel_type: string;
  EngineManufactures: IEngineManufacture;
  EngineLayouts: IEngineLayouts;
  displacements: IDisplacement[];
  transmissions: ITransmission[];
}

export interface IEngineManufacture {
  ID: number;
  name: string;
}

export interface IEngineLayouts {
  ID: number;
  name: string;
}

export interface IDisplacement {
  power: number;
  displacement: number;
  torque_output: number;
}

export interface ITransmission {
  transmission: string;
  no_gear: string;
}
