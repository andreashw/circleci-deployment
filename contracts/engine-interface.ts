export interface IEngine {
  ID: number;
  Name: string;
  engine_manufacture_id: number;
  engine_layout_id: number;
  YearStart: number;
  YearEnd: number;
  EngineType: string;
  FuelType: string;
  EngineManufactures: IEngineManufacture;
  EngineLayouts: IEngineLayouts;
  Displacements: IDisplacement[];
  CylinderBores: ICylinderBore[];
  Transmissions: ITransmission[];
}

export interface IEngineManufacture {
  ID: number;
  Name: string;
}

export interface IEngineLayouts {
  ID: number;
  Name: string;
}

export interface IDisplacement {
  power: number;
  displacement: number;
  torque_output: number;
}

export interface ICylinderBore {
  cylinder_bore: number;
}

export interface ITransmission {
  transmission: string;
  no_gear: string;
}
