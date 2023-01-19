import { IDepartment } from './department-interface';
import { IEngineer } from './enginers-interface';
import { IProject } from './project-interface';

export interface IReportHourly {
  ID: number;
  Date: number;
  WorkerId: number;
  Worker: IEngineer;
  StartHour: string;
  EndHour: string;
  ProjectId: number;
  Project: IProject;
  DepartmentId: number;
  Department: IDepartment;
  Status: string;
  JobId: number;
  JobDescription: string;
  Task: string;
  Paid: boolean;
  Title: string;
  Message: string;
}
