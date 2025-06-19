import { WorkersList } from "../components/user/Workers";
import { GetWorkersProvider } from "../context/GetWorkersContext";

export const WorkersPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <GetWorkersProvider>
        <WorkersList/>
      </GetWorkersProvider>
    </div>
  )
}
