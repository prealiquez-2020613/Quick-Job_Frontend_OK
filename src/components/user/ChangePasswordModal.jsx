import { useState } from 'react'
import { changePasswordRequest } from '../../services/api'
import toast from 'react-hot-toast'

export const ChangePasswordModal = ({ closeModal }) => {
  const [actualPassword, setActualPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validation, setValidation] = useState({
    actualPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isDisabled =
    !actualPassword || !newPassword || !confirmPassword ||
    newPassword !== confirmPassword ||
    Object.values(validation).some(v => v)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isDisabled) return

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
            onChange={(e) => {
              const value = e.target.value
              setActualPassword(value)
              setValidation((prev) => ({ ...prev, actualPassword: value.trim() === '' ? 'Campo requerido' : '' }))
            }}
            placeholder="Contraseña Actual"
            className="w-full px-4 py-3 rounded-lg border border-blue-300 mb-1"
          />
          {validation.actualPassword && <span className="text-red-600 text-sm">{validation.actualPassword}</span>}

          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => {
              const value = e.target.value
              setNewPassword(value)
              setValidation((prev) => ({ ...prev, newPassword: value.trim() === '' ? 'Campo requerido' : '' }))
            }}
            placeholder="Nueva Contraseña"
            className="w-full px-4 py-3 rounded-lg border border-blue-300 mb-1"
          />
          {validation.newPassword && <span className="text-red-600 text-sm">{validation.newPassword}</span>}

          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value
              setConfirmPassword(value)
              setValidation((prev) => ({
                ...prev,
                confirmPassword:
                  value.trim() === '' ? 'Campo requerido' :
                  value !== newPassword ? 'Las contraseñas no coinciden' : ''
              }))
            }}
            placeholder="Confirmar Nueva Contraseña"
            className="w-full px-4 py-3 rounded-lg border border-blue-300 mb-1"
          />
          {validation.confirmPassword && <span className="text-red-600 text-sm">{validation.confirmPassword}</span>}

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full px-4 py-3 rounded-lg text-white font-medium ${
              isDisabled || isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-300 rounded-lg">Cerrar</button>
      </div>
    </div>
  )
}