import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useJobs, type Job, type JobStatus } from "../context/JobContext";

const statuses: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function DropdownMenu({ job }: { job: Job }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { updateJobStatus, deleteJob } = useJobs();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="cursor-pointer text-text/50 hover:text-text/80"
      >
        <EllipsisVertical />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-background border rounded-md shadow-lg z-10">
          <div className="p-2">
            <label className="block text-sm font-semibold mb-1">
              Change Status:
            </label>
            <select
              value={job.status}
              onChange={(e) =>
                updateJobStatus(job.id, e.target.value as Job["status"])
              }
              className="w-full px-2 py-1 border rounded-sm text-sm bg-background"
            >
              {statuses.map((status) => (
                <option key={status} value={status} className="bg-background">
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2 border-t mt-1">
            <button
              onClick={() => {
                deleteJob(job.id);
                setDropdownOpen(false);
              }}
              className="w-full text-left text-sm text-red-500 px-2 py-1 rounded hover:bg-text/5 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
