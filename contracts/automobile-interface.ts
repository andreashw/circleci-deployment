export interface IAutomobile {
  ID: number;
  automobile_manufacture_id: number;
  AutomobileManufactures: IAutomobileManufactures;
  automobile_brand_id: number;
  AutomobileBrands: IAutomobileBrands;
  automobile_body_type_id: number;
  AutomobileBodyTypes: IAutomobileBodyTypes;
  automobile_layout_id: number;
  AutomobileLayouts: IAutomobileLayouts;
  model: string;
  year_start: number;
  year_end: number;
  power_type: string;
  curb_wight: number;
  wheel_base: number;
  lengths: IAutomobileDimensionLength[];
  heights: IAutomobileDimensionHeight[];
  widths: IAutomobileDimensionWidth[];
}

export interface IAutomobileManufactures {
  ID: number;
  name: string;
}

export interface IAutomobileBrands {
  ID: number;
  name: string;
}

export interface IAutomobileBodyTypes {
  ID: number;
  name: string;
}

export interface IAutomobileLayouts {
  ID: number;
  name: string;
}

export interface IAutomobileDimensionLength {
  length: number;
  startYear: string;
  endYear: string;
}

export interface IAutomobileDimensionWidth {
  width: number;
  startYear: string;
  endYear: string;
}

export interface IAutomobileDimensionHeight {
  height: number;
  startYear: string;
  endYear: string;
}
