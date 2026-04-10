import { JobStatus } from './lib';

export interface JobApplication {
  jobId: number;
  jobTitle: string;
  jobCompany: string;
  jobAppliedAt: Date | string;
  jobUpdatedAt: Date | string | null;
  jobStatus: JobStatus;
  jobNotes: string ;
}

export interface JobApplicationTable {
  jobId: number;
  jobTitle: string;
  jobCompany: string;
  jobAppliedAt: string;
  jobUpdatedAt: string | null;
  jobStatus: JobStatus;
  jobNotes: string;
}

export interface Database {
  JobApplication: JobApplicationTable;
}


