import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEditProfile } from '../../shared/hooks/user/useEditProfile'

export const EditProfileModal = ({ closeModal }) => {
  const navigate = useNavigate()
  const [role, setRole] = useState('CLIENT')
  const { formData, handleChange, handleSubmit, categories, setImage } = useEditProfile(role)

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    setRole(userRole || 'CLIENT')
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          >
            <option value="">Seleccione categoría</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <input
            type="file"
            name="profileImage"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Guardar Cambios
          </button>
        </form>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-300 rounded-lg">Cerrar</button>
      </div>
    </div>
  )
}