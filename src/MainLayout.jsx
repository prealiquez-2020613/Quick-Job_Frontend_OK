import { Navbar } from './components/Navbar.jsx'
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Navbar a la izquierda */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}