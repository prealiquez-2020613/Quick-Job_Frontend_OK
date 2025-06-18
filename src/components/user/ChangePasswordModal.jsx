import { useState } from 'react'
import { changePasswordRequest } from '../../services/api'
import toast from 'react-hot-toast'

export const ChangePasswordModal = ({ closeModal }) => {
  const [actualPassword, setActualPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!actualPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres")
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const response = await changePasswordRequest({ actualPassword, newPassword })
      if (response.error) throw new Error(response.message)
      toast.success('Contraseña cambiada correctamente')
      closeModal()
    } catch (err) {
      setError(err.message || 'Error al cambiar la contraseña')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="actualPassword"
            value={actualPassword}
            onChange={(e) => setActualPassword(e.target.value)}
            placeholder="Contraseña Actual"
            className="w-full px-4 py-3 rounded-lg border border-blue-300 mb-4"
          />
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva Contraseña"
            className="w-full px-4 py-3 rounded-lg border border-blue-300 mb-4"
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Nueva Contraseña"
            className="w-full px-4 py-3 rounded-lg border border-blue-300 mb-4"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium ${isLoading && 'opacity-50'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-300 rounded-lg">Cerrar</button>
      </div>
    </div>
  )
}