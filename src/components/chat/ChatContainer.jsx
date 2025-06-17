import { useState } from 'react'
import ChatList from './ChatList.jsx'
import {ChatRoom} from '../../pages/ChatRoom.jsx'
import useChatStarter from '../../shared/hooks/chat/useChatStarter.jsx'

const ChatContainer = () => {
  const [selectedChatId, setSelectedChatId] = useState(null)

  const startChat = useChatStarter(setSelectedChatId)

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatList onSelectChat={startChat} />   
      {selectedChatId ? (
        <div className="flex-1 border-l">
          <ChatRoom chatId={selectedChatId} /> 
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Selecciona un contacto para empezar a chatear
        </div>
      )}
    </div>
  )
}

export default ChatContainer
