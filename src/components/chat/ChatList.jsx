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

  if (loading) {
    return (
      <div className="flex flex-col h-full w-1/3 bg-white border-r border-slate-200 p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Cargando chats...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-1/3 bg-white border-r border-slate-200 shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-700 to-blue-600">
        <h2 className="text-xl font-bold text-white mb-4">Mensajes</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar en chats..."
            className="w-full p-3 pl-10 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredChats.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-slate-500">No se encontraron chats</p>
          </div>
        ) : (
          filteredChats.map(chat => {
            const partner = chat.participants.find(p => p._id !== me)
            const lastMessage = chat.lastMessage?.text
            const displayMessage = lastMessage && lastMessage.length > 35 
              ? `${lastMessage.substring(0, 35)}...` 
              : lastMessage || 'No hay mensajes'

            return (
              <div
                key={chat._id}
                className="flex items-center p-4 bg-white hover:bg-slate-50 rounded-xl cursor-pointer border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => handleClick(partner?._id)} 
              >
                <div className="relative">
                  <img
                    src={partner?.profileImage || 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750035099/default-profile_reot90.jpg'}
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 ml-4 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-700 truncate">
                      {partner?.name} {partner?.surname}
                    </span>
                    <span className="text-xs text-slate-400">
                      {chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">
                    {displayMessage}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ChatList