import { WorkersList } from "../components/user/Workers";
import { GetWorkersProvider } from "../context/GetWorkersContext";

export const WorkersPage = () => {
  return (
    <>
    <GetWorkersProvider>
        <WorkersList/>
    </GetWorkersProvider>
    </>
  )
}