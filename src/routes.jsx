import { Login } from "./components/Login";
import { WorkersPage } from "./pages/WorkersPage";

export const routes = [
    {path:'/',element:<Login/>},
    {path:'/home',element:<WorkersPage/>},
]