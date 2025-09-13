import { Building2, Circle } from "lucide-react";
import { type Job } from "../context/JobContext";
import DropdownMenu from "./dropdown-menu";
import { useState } from "react";

export default function JobItem({ job }: { job: Job }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="min-h-40">
      {!flipped ? (
        <div className="flex justify-between space-x-4 p-4 border rounded-md h-full">
          <div className="flex flex-col min-w-0">
            <span className="text-primary font-bold truncate mb-2">
              {job.position}
            </span>
            <div className="flex items-center space-x-2">
              <Building2 size={14} />
              <span className="text-sm truncate">{job.company}</span>
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

            <span
              onClick={() => setFlipped(true)}
              className="mt-auto pt-1 text-xs text-muted-foreground cursor-pointer"
            >
              Show message
            </span>
          </div>
          <div className="flex items-center">
            <DropdownMenu job={job} />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col p-4 border rounded-md">
          {job.message}
          <span
            onClick={() => setFlipped(false)}
            className="mt-auto pt-1 text-xs text-muted-foreground cursor-pointer"
          >
            Back
          </span>
        </div>
      )}
    </div>
  );
}
