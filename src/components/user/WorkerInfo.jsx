import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JobRequestModal } from '../jobRequest/JobRequestModal'
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

export const WorkerInfo = () => {
  const { workerId } = useParams()
  const navigate = useNavigate()
  const [worker, setWorker] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const socketRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token') || ''
    socketRef.current = io('http://localhost:5400', {
      auth: { token },
      autoConnect: true
    })
  }, [])

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5400/v1/user/findUser/${workerId}`)
        setWorker(data.user)
      } catch {
        setError('Error al cargar información del trabajador')
      } finally {
        setLoading(false)
      }
    }

    fetchWorker()
  }, [workerId])

  const handleContactClick = () => {
    const socket = socketRef.current
    const payload = { participantId: workerId }

    const send = () => {
      socket.emit('chat startup', payload)
    }

    socket.once('chat ready', ({ chatId }) => {
      navigate(`/chat/${chatId}`)
    })

    if (socket.connected) {
      send()
    } else {
      socket.once('connect', send)
    }
  }

  if (loading) return <div className="pt-24 text-center">Cargando trabajador...</div>
  if (error) return <div className="pt-24 text-center">{error}</div>
  if (!worker) return <div className="pt-24 text-center">Trabajador no encontrado</div>

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto pt-24 px-6 md:px-16 space-y-10 md:space-y-0 md:space-x-14">
      <img
        src={worker.profileImage || 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750035099/default-profile_reot90.jpg'}
        alt={`Foto de ${worker.name}`}
        className="w-full md:w-[450px] h-auto object-cover rounded-xl shadow-lg"
      />
      <div className="flex flex-col justify-center max-w-2xl text-left">
        <h2 className="text-4xl font-bold leading-tight">{worker.name} {worker.surname}</h2>
        <p className="text-gray-500 text-xl mt-1">{worker.category?.name || 'Sin categoría'}</p>
        <p className="text-gray-900 text-md mt-6 leading-relaxed">
          <strong className="block mb-1">Acerca de {worker.name}:</strong>
          {worker.description || 'Este trabajador aún no ha escrito una descripción personal.'}
        </p>
        <button
          onClick={handleContactClick}
          className="mt-8 bg-black text-white text-lg font-semibold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Contacta a {worker.name}
        </button>

        <button
          onClick={openModal}
          className="mt-4 bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Enviar solicitud de trabajo
        </button>
      </div>

      {isModalOpen && <JobRequestModal workerId={workerId} closeModal={closeModal} />}
    </div>
  )
}
