import { createContext, useContext, useEffect, useState } from "react";

export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Job {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
}

interface JobsContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => void;
  updateJobStatus: (id: string, status: Job["status"]) => void;
  deleteJob: (id: string) => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs must be used within a JobProvider");
  return context;
};

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      try {
        return JSON.parse(savedJobs) as Job[];
      } catch (error) {
        return [];
      }
    }
    return [
      {
        id: crypto.randomUUID(),
        company: "Oktopeak",
        position: "Junior Frontend Developer",
        status: "Interview",
      },
      {
        id: crypto.randomUUID(),
        company: "Facebook",
        position: "Backend Developer",
        status: "Applied",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job: Omit<Job, "id">) => {
    setJobs((prevJobs) => [...prevJobs, { id: crypto.randomUUID(), ...job }]);
  };

  const updateJobStatus = (id: string, status: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job))
    );
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJobStatus, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};
