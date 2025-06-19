import { useState } from 'react'
import ChatList from './ChatList.jsx'
import {ChatRoom} from '../../pages/ChatRoom.jsx'
import useChatStarter from '../../shared/hooks/chat/useChatStarter.jsx'

const ChatContainer = () => {
  const [selectedChatId, setSelectedChatId] = useState(null)

  const startChat = useChatStarter(setSelectedChatId)

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-200">
      <ChatList onSelectChat={startChat} />   
      {selectedChatId ? (
        <div className="flex-1 border-l border-slate-200">
          <ChatRoom chatId={selectedChatId} /> 
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-slate-700 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">¡Comienza a conversar!</h3>
            <p className="text-slate-500">Selecciona un contacto para empezar a chatear</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatContainer