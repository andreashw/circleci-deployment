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
  Model: string;
  YearStart: number;
  YearEnd: number;
  PowerType: string;
  CurbWight: number;
  WheelBase: number;
  Lengths: IAutomobileDimensionLength[];
  Heights: IAutomobileDimensionHeight[];
  Widths: IAutomobileDimensionWidth[];
}

export interface IAutomobileManufactures {
  ID: number;
  Name: string;
}

export interface IAutomobileBrands {
  ID: number;
  Name: string;
}

export interface IAutomobileBodyTypes {
  ID: number;
  Name: string;
}

export interface IAutomobileLayouts {
  ID: number;
  Name: string;
}

export interface IAutomobileDimensionLength {
  length: number;
  StartYear: string;
  EndYear: string;
}

export interface IAutomobileDimensionWidth {
  width: number;
  StartYear: string;
  EndYear: string;
}

export interface IAutomobileDimensionHeight {
  height: number;
  StartYear: string;
  EndYear: string;
}
