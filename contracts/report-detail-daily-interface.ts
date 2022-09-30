export interface IReportDetailDaily {
  Date: number;
  Worker: string;
  Tasks: ITask[];
}

export interface ITask {
  Hours: string;
  TotalHours: number;
  Project: string;
  Job: string;
  Status: string;
  Task: string;
}
