// src/routes.jsx
import { Login } from "./components/Login";
import { Register } from "./components/Regsiter";
import { WorkersPage } from "./pages/WorkersPage";
import { WorkerInfo } from "./components/user/WorkerInfo";
import { MainLayout } from "./MainLayout";
import { JobRequestList } from "./components/jobRequest/JobRequestList";
import { ChatRoom } from "./pages/ChatRoom";

export const routes = [
  {
    path: '/',
    element: <Login /> // SIN NAVBAR
  },
  {
    path: '/register',
    element: <Register /> // SIN NAVBAR
  },
  {
    path: '/',
    element: <MainLayout />, // CON NAVBAR
    children: [
      {
        path: '/home',
        element: <WorkersPage />
      },
      {
        path: '/worker/:workerId',
        element: <WorkerInfo />
      },
      {
        path: '/history',
        element: <JobRequestList />
      },
      {
        path: '/chat/:chatId',
        element: <ChatRoom />
      },
    ]
  }
]
