import { IDepartment } from './department-interface';
import { IEngineer } from './enginers-interface';
import { IProject } from './project-interface';

export interface IReportHourly {
  ID: number;
  date: number;
  worker_id: number;
  Worker: IEngineer;
  start_hour: string;
  end_hour: string;
  project_id: number;
  Project: IProject;
  department_id: number;
  Department: IDepartment;
  status: string;
  job_id: number;
  job_description: string;
  task: string;
  paid: boolean;
  title: string;
  message: string;
}
