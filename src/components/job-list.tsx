import { useEffect, useState } from "react";
import { useJobs } from "../context/JobContext";
import JobFilterSort from "./job-filter-sort";
import JobItem from "./job-item";

export default function JobList() {
  const { jobs } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const sorted = [...jobs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setFilteredJobs(sorted);
  }, []);

  return (
    <div>
      <JobFilterSort setFilteredJobs={setFilteredJobs} />
      <div className="grid gap-5 lg:grid-cols-2">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobItem key={job.id} job={job} />)
        ) : (
          <p className="text-center col-span-2 italic">No applications found.</p>
        )}
      </div>
    </div>
  );
}
