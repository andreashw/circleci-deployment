export interface IReportDaily {
  Id: number;
  Date: number;
  WorkerId: number;
  Worker: string;
  DepartmentId: number;
  Department: string;
  Deletable?: boolean;
  Message?: string;
}
