import { useState, useEffect, useMemo } from 'react'
import { getUserChatsRequest } from '../../services/api.js'
import { getCurrentUid } from '../../util/token.js'

const ChatList = ({ onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const me = getCurrentUid()

  useEffect(() => {
    (async () => {
      try {
        const { error, data } = await getUserChatsRequest()
        if (!error) setChats(data)
      } catch (err) {
        console.error('Error al obtener chats:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filteredChats = useMemo(() => chats.filter(chat => {
    const partner = chat.participants.find(p => p._id !== me)
    const partnerName = `${partner?.name ?? ''} ${partner?.surname ?? ''}`.toLowerCase()
    return (
      partnerName.includes(searchQuery.toLowerCase()) ||
      (chat.lastMessage?.text?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }), [chats, searchQuery, me])

  const handleClick = (partnerId) => onSelectChat(partnerId)

  if (loading) return <div>Loading chats...</div>

  return (
    <div className="flex flex-col h-full w-1/3 bg-gray-100 p-4">
      <input
        type="text"
        placeholder="Buscar en chats"
        className="mb-4 p-2 border rounded-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex flex-col space-y-4 overflow-y-auto">
        {filteredChats.map(chat => {
          const partner = chat.participants.find(p => p._id !== me)
          const lastMessage = chat.lastMessage?.text
          const displayMessage = lastMessage && lastMessage.length > 35 
            ? `${lastMessage.substring(0, 35)}...` 
            : lastMessage || 'No hay mensajes'

          return (
            <div
              key={chat._id}
              className="flex items-center p-3 bg-white hover:bg-gray-200 rounded-lg cursor-pointer"
              onClick={() => handleClick(partner?._id)} 
            >
              <img
                src={partner?.profileImage || 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750035099/default-profile_reot90.jpg'}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="font-semibold">
                  {partner?.name} {partner?.surname}
                </span>
                <span className="text-sm text-gray-600 truncate max-w-xs">
                  {displayMessage}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatList
