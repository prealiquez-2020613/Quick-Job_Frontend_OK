import { useState } from 'react'
import { deleteAccountRequest } from '../../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const DeleteAccountModal = ({ closeModal }) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const response = await deleteAccountRequest({ password })
      if (response.error) throw new Error(response.message)

      toast.success('Cuenta borrada exitosamente')

      localStorage.removeItem('token')
      navigate('/')

      closeModal()
    } catch (err) {
      setError(err.message || 'Error al borrar la cuenta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4">Borrar Cuenta</h2>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full px-4 py-3 rounded-lg border border-blue-300"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleDelete}
            className={`w-full px-4 py-3 rounded-lg bg-red-600 text-white font-medium ${isLoading && 'opacity-50'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Borrando...' : 'Borrar Cuenta'}
          </button>
          <button
            onClick={closeModal}
            className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}