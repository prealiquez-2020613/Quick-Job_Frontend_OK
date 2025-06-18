import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
import { getCurrentUid } from '../util/token'

export const ChatRoom = ({ chatId: propChatId }) => {
  const params = useParams()
  const chatId = propChatId || params.chatId
  const navigate = useNavigate()

  const [chat, setChat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [text, setText] = useState('')

  const currentUid = getCurrentUid()

  const socketRef = useRef(null)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:5400', {
        auth: { token: localStorage.getItem('token') }
      })
    }
    const socket = socketRef.current

    socket.emit('join chat', { chatId })

    const onIncoming = (msg) => {
      if (msg.chatId !== chatId) return
      setChat((p) => ({ ...p, messages: [...p.messages, msg] }))
    }
    socket.on('chat message', onIncoming)
    return () => socket.off('chat message', onIncoming)
  }, [chatId])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5400/v1/chat/get/${chatId}`,
          { headers: { Authorization: localStorage.getItem('token') } }
        )
        setChat(data.chat)
      } catch {
        setError('No se pudo cargar el chat.')
      } finally {
        setLoading(false)
      }
    })()
  }, [chatId])

  useEffect(() => {
    const box = messagesRef.current
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' })
  }, [chat?.messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    socketRef.current.emit(
      'chat message',
      { chatId, text: trimmed },
      (err, serverMsg) => {
        if (err) return
        setChat((p) => ({ ...p, messages: [...p.messages, serverMsg] }))
      }
    )
    setText('')
  }

  const handleProfileClick = (userId) => {
    navigate(`/user/${userId}`)
  }

  if (loading) return <div className="flex-1 flex items-center justify-center">Cargando chat…</div>
  if (error) return <div className="flex-1 flex items-center justify-center text-red-600">{error}</div>
  if (!chat) return <div className="flex-1 flex items-center justify-center">Chat no encontrado</div>

  const otherUser = chat.participants?.find(p => p._id !== currentUid)
  const profileImage = otherUser?.profileImage || 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750035099/default-profile_reot90.jpg'
  const userName = otherUser?.name || 'Usuario desconocido'

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4">
      {/* Barra superior con la foto de perfil y el nombre */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-t-md shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={profileImage}
            alt="Foto de perfil"
            className="w-12 h-12 object-cover rounded-full cursor-pointer"
            onClick={() => handleProfileClick(otherUser?._id)}
          />
          <span className="font-medium">{userName}</span>
        </div>
      </div>

      {/* Mensajes */}
      <div
        ref={messagesRef}
        className="flex flex-col flex-1 overflow-y-auto p-3 bg-white space-y-2"
        style={{ maxHeight: '70vh' }}
      >
        {chat.messages.length === 0 ? (
          <p className="text-gray-500">No hay mensajes aún.</p>
        ) : (
          chat.messages.map((m) => {
            const own = m.sender?._id?.toString() === currentUid
            return (
              <div
                key={m._id}
                className={`p-3 ${own ? 'bg-black text-white self-end rounded-l-2xl rounded-br-2xl' : 'bg-gray-200 text-black self-start rounded-r-2xl rounded-bl-2xl'}`}
                style={{
                  display: 'inline-block',
                  wordBreak: 'break-word',
                  maxWidth: '70%',
                }}
              >
                <strong>{own ? 'Tú' : m.sender?.name || 'Usuario'}</strong>: {m.text}
                <br />
                <small className="text-gray-500">{new Date(m.timestamp).toLocaleString()}</small>
              </div>
            )
          })
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-l-md p-2"
          placeholder="Escribe un mensaje"
        />
        <button className="bg-blue-600 text-white px-4 rounded-r-md">
          Enviar
        </button>
      </form>
    </div>
  )
}
