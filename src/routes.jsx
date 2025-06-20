import { Login } from "./components/Login";
import { Register } from "./components/Regsiter";
import { WorkersPage } from "./pages/WorkersPage";
import { WorkerInfo } from "./components/user/WorkerInfo";
import { MainLayout } from "./MainLayout";
import { JobRequestList } from "./components/jobRequest/JobRequestList";
import { ChatRoom } from "./pages/ChatRoom";
import ChatContainer from "./components/chat/ChatContainer.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import { MyProfile } from "./components/user/MyProfile.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"; 

export const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <ProtectedRoute />, 
    children: [
      {
        path: '/',
        element: <MainLayout />, 
        children: [
          { path: '/home', element: <WorkersPage /> },
          { path: '/user/:workerId', element: <WorkerInfo /> },
          { path: '/history', element: <JobRequestList /> },
          { path: '/chat/:chatId', element: <ChatRoom /> },
          { path: '/chats', element: <ChatContainer /> },
          { path: '/search', element: <SearchPage /> },
          { path: '/profile', element: <MyProfile /> },
        ]
      }
    ]
  }
];
