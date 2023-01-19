export interface IPayroll {
  ID: number;
  Status: string;
  EndDate: string;
  StartDate: string;
  PayrollDate: string;
  Payrolls: Payrolls[];
  Total: number;
  Clients: ClientsPay[];
  ProvinceId: number;
}

export interface ClientsPay {
  ClientId: number;
  Name: string;
  TotalPay: number;
}
export interface Payrolls {
  Worker: string;
  TotalHm: number;
  TotalPay: number;
  WorkerId: number;
  HourlyPay: number;
}
