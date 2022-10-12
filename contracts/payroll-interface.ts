export interface IPayroll {
  ID: number;
  status: string;
  end_date: string;
  start_date: string;
  payroll_date: string;
  payrolls: Payrolls[];
  total: number;
  clients: ClientsPay[];
  province_id: number;
}

export interface ClientsPay {
  client_id: number;
  name: string;
  total_pay: number;
}
export interface Payrolls {
  worker: string;
  total_hm: number;
  total_pay: number;
  worker_id: number;
  hourly_pay: number;
}
