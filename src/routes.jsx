import { Login } from "./components/Login";
import { WorkersPage } from "./pages/WorkersPage";
import { WorkerInfo } from "./components/user/WorkerInfo";

export const routes = [
    {path:'/',element:<Login/>},
    {path:'/home',element:<WorkersPage/>},
    {path:'/worker/:workerId', element:<WorkerInfo/>},
]