// src/routes.jsx
import { Login } from "./components/Login";
import { Register } from "./components/Regsiter";
import { WorkersPage } from "./pages/WorkersPage";
import { WorkerInfo } from "./components/user/WorkerInfo";
import { MainLayout } from "./MainLayout";
import { JobRequestList } from "./components/jobRequest/JobRequestList";
import { ChatRoom } from "./pages/ChatRoom";
import ChatContainer from "./components/chat/ChatContainer.jsx";

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
      {
        path: '/chats',  // Nueva ruta para los chats
        element: <ChatContainer /> // Componente de los chats
      },
      {
        path: '/search', 
        element: <SearchPage />,
      },
    ]
  }
]
