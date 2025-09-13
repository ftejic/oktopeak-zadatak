import { ArrowUpDown } from "lucide-react";
import { useJobs, type Job } from "../context/JobContext";
import { useEffect, useState, type Dispatch } from "react";

export default function JobFilterSort({
  setFilteredJobs,
}: {
  setFilteredJobs: Dispatch<React.SetStateAction<Job[]>>;
}) {
  const { jobs } = useJobs();
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    let filtered =
      statusFilter === "All"
        ? [...jobs]
        : jobs.filter((job) => job.status === statusFilter);

    filtered.sort((a, b) => {
      if (sortAsc)
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      else
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    });

    setFilteredJobs(filtered);
  }, [statusFilter, sortAsc, jobs, setFilteredJobs]);

  return (
    <div className="flex items-center gap-3 mb-5 justify-end">
      <select
        value={statusFilter}
        className="px-2 py-1 border rounded-sm text-sm bg-background"
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <ArrowUpDown onClick={() => setSortAsc(!sortAsc)} />
    </div>
  );
}
