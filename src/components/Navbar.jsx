import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token') 
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }

  const handleLogin = () => {
    navigate('/')
  }

  return (
    <nav className="bg-white w-72 min-h-screen p-6 shadow-lg flex flex-col justify-between border-r border-gray-200">
      {/* Logo y Sección Contratar */}
      <div>
        <div className="mb-8">
          <img
            src="https://res.cloudinary.com/djedsgxyh/image/upload/v1750047799/Quick-Job_Black_qhmmmc.png" 
            alt="QuickJob Logo"
            className="w-32 mx-auto"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Contratar</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/home"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-800 font-medium transition"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-800 font-medium transition"
              >
                Buscar
              </Link>
            </li>
            <li>
              <Link
                to="/nearby"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-800 font-medium transition"
              >
                Los más cercanos
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección Perfil */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Perfil</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-800 font-medium transition"
              >
                Mi Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-800 font-medium transition"
              >
                Historial
              </Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-800 font-medium transition"
              >
                Mis reseñas
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Botón login / logout */}
      <div className="mt-10">
        <button
          onClick={isLoggedIn ? handleLogout : handleLogin}
          aria-label={isLoggedIn ? "Cerrar sesión" : "Ir a login"}
          className="w-full flex items-center justify-center gap-3 text-gray-600 hover:text-blue-600 transition"
        >
          <img
            src="https://cdn-icons-png.freepik.com/512/9307/9307950.png"
            alt="Usuario"
            className="h-10 w-10 object-cover rounded-full"
          />
          <span className="font-medium">
            {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
          </span>
        </button>
      </div>
    </nav>
  )
}