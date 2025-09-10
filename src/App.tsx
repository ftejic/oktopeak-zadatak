import JobList from "./components/job-list";
import { JobProvider } from "./context/JobContext";

function App() {
  return (
    <>
      <JobProvider>
        <div className="container mx-auto p-4">
          <h2 className="font-bold text-xl mb-5">Lista prijava</h2>
          <JobList />
        </div>
      </JobProvider>
    </>
  );
}

export default App;
