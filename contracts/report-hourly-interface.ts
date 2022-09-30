import { IEngineer } from './enginers-interface';
import { IProject } from './project-interface';

export interface IReportHourly {
  ID: number;
  date: number;
  worker_id: number;
  Worker: IEngineer;
  start_hour: string;
  project_id: number;
  Project: IProject;
  department_id: number;
  status: string;
  job_id: number;
  job_description: string;
  task: string;
}
