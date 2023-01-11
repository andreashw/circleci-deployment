export interface IReportDaily {
  Id: number;
  date: number;
  worker_id: number;
  worker: string;
  department_id: number;
  department: string;
  Deletable?: boolean;
  message?: string;
}
