import { useJobs } from "../context/JobContext";
import JobItem from "./job-item";

export default function JobList() {
  const { jobs } = useJobs();

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job}/>
      ))}
    </div>
  );
}
