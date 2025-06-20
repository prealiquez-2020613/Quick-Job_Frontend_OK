import { Navigate, Outlet } from 'react-router-dom'

const isAuthenticated = () => {
  return !!localStorage.getItem('token') 
}

export const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />
}
