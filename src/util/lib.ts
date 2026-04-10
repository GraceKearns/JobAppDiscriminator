import { JobApplication } from "./types";

export function date2String(date: Date) {
  return date.toString();
}

export type JobStatus = 'applied' | 'rejected' | 'accepted'

export const getFilteredApplications = (timePeriod: string, jobApplications: JobApplication[]) => {
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;

  switch (timePeriod) {
    case '1d':
      const oneDaysAgo = new Date(now - 1 * msPerDay);
      return jobApplications.filter(app => new Date(app.jobAppliedAt) >= oneDaysAgo);
    case '7d':
      const sevenDaysAgo = new Date(now - 7 * msPerDay);
      return jobApplications.filter(app => new Date(app.jobAppliedAt) >= sevenDaysAgo);
    case '30d':
      const thirtyDaysAgo = new Date(now - 30 * msPerDay);
      return jobApplications.filter(app => new Date(app.jobAppliedAt) >= thirtyDaysAgo);
    case '90d':
      const ninetyDaysAgo = new Date(now - 90 * msPerDay);
      return jobApplications.filter(app => new Date(app.jobAppliedAt) >= ninetyDaysAgo);
    case 'all':
    default:
      return jobApplications;
  }
};
