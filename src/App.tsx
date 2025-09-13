import JobForm from "./components/job-form";
import JobList from "./components/job-list";
import { JobProvider } from "./context/JobContext";

function App() {
  return (
    <>
      <JobProvider>
        <div className="container mx-auto px-5 py-10">
          <div>
            <h2 className="font-bold text-xl mb-5">Add New Application</h2>
            <JobForm />
          </div>
          <div className="mt-20">
            <h2 className="font-bold text-xl mb-5">My Applications</h2>
            <JobList />
          </div>
        </div>
      </JobProvider>
    </>
  );
}

export default App;
