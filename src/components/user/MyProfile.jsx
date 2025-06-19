import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { EditProfileModal } from './EditProfileModal'
import { ChangePasswordModal } from './ChangePasswordModal'
import { DeleteAccountModal } from './DeleteAccountModal'
import ReviewsList from '../review/ReviewList'
import { useGetReviews } from '../../shared/hooks/review/useGetReviews';

export const MyProfile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)

  const [userId, setUserId] = useState(null)

  const { reviews, isLoading: reviewsLoading, error: reviewsError } = useGetReviews(userId)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('https://quick-job-backend-ok.vercel.app/v1/user/findUser', {
          headers: { Authorization: localStorage.getItem('token') }
        })
        setUser(data.user)
        setUserId(data.user._id)
      } catch (err) {
        setError('Error al cargar la información del usuario')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const openEditProfileModal = () => setIsEditProfileModalOpen(true)
  const closeEditProfileModal = () => setIsEditProfileModalOpen(false)

  const openChangePasswordModal = () => setIsChangePasswordModalOpen(true)
  const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false)

  const openDeleteAccountModal = () => setIsDeleteAccountModalOpen(true)
  const closeDeleteAccountModal = () => setIsDeleteAccountModalOpen(false)

  if (loading) return <div className="pt-24 text-center">Cargando perfil...</div>
  if (error) return <div className="pt-24 text-center">{error}</div>
  if (!user) return <div className="pt-24 text-center">Usuario no encontrado</div>

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto pt-24 px-6 md:px-16 space-y-10 md:space-y-0 md:space-x-14">
        <img
          src={user.profileImage || 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750035099/default-profile_reot90.jpg'}
          alt={`Foto de ${user.name}`}
          className="w-full md:w-[450px] h-auto object-cover rounded-xl shadow-lg"
        />
        <div className="flex flex-col justify-center max-w-2xl text-left">
          <h2 className="text-4xl font-bold leading-tight">{user.name} {user.surname}</h2>
          
          {/* Mostrar categoría o rol */}
          <p className="text-gray-500 text-xl mt-1">
            {user.role === 'CLIENT' ? 'Empleador' : user.category?.name || 'Sin categoría'}
          </p>
          
          <div className="mt-2">
            <strong className="text-lg">Calificación Promedio:</strong>
            <span className="ml-2 text-yellow-500">{'⭐'.repeat(Math.round(user.ratingAverage))}</span>
            <span className="ml-2 text-gray-500">({user.ratingAverage.toFixed(1)})</span>
          </div>

          <p className="text-gray-900 text-md mt-6 leading-relaxed">
            <strong className="block mb-1">Acerca de {user.name}:</strong>
            {user.description || 'Este usuario aún no ha escrito una descripción personal.'}
          </p>

          {/* Botones */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={openEditProfileModal}
              className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Editar Perfil
            </button>

            <button
              onClick={openChangePasswordModal}
              className="bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-md hover:bg-green-700 transition duration-300"
            >
              Cambiar Contraseña
            </button>

            <button
              onClick={openDeleteAccountModal}
              className="bg-red-600 text-white text-lg font-semibold py-3 px-6 rounded-md hover:bg-red-700 transition duration-300"
            >
              Borrar Cuenta
            </button>
          </div>

        </div>
      </div>

      {/* Mostrar reseñas */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto pt-24 px-6 md:px-16 space-y-10 md:space-y-0 md:space-x-14">
        {reviewsLoading ? (
          <div>Cargando reseñas...</div>
        ) : (
          <ReviewsList reviews={reviews} />
        )}
      </div>

      {/* Modales */}
      {isEditProfileModalOpen && <EditProfileModal closeModal={closeEditProfileModal} />}
      {isChangePasswordModalOpen && <ChangePasswordModal closeModal={closeChangePasswordModal} />}
      {isDeleteAccountModalOpen && <DeleteAccountModal closeModal={closeDeleteAccountModal} />}
    </>
  )
}