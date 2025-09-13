import { Building2, Circle } from "lucide-react";
import { type Job } from "../context/JobContext";
import DropdownMenu from "./dropdown-menu";
import { useState } from "react";

export default function JobItem({ job }: { job: Job }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div onClick={() => setFlipped(!flipped)} className="min-h-28">
      {!flipped ? (
        <div className="flex justify-between space-x-4 p-4 border border-primary/20 rounded-md">
          <div className="flex flex-col min-w-0">
            <span className="text-primary font-bold truncate mb-2">
              {job.position}
            </span>
            <div className="flex items-center space-x-2">
              <Building2 size={14} />
              <span className="text-text/80 text-sm truncate">
                {job.company}
              </span>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                job.status === "Applied"
                  ? "text-blue-500"
                  : job.status === "Interview"
                  ? "text-yellow-500"
                  : job.status === "Offer"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <Circle size={14} />
              <span className="text-sm truncate">{job.status}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu job={job} />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center p-4 border border-primary/20 rounded-md">
          {job.message}
        </div>
      )}
    </div>
  );
}
