import { useState } from 'react';
import ChatList from './ChatList.jsx'; // Asegúrate de importar correctamente
import useChats from '../../shared/hooks/chat/useChats.jsx'; // Importa el custom hook

const ChatContainer = () => {
  const { chats, loading, error, selectedChatId, handleSelectChat } = useChats();

  if (loading) {
    return <div>Loading chats...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      {/* Aquí mostrarías el chat seleccionado */}
      {selectedChatId && (
        <div>
          <h2>Chat seleccionado: {selectedChatId}</h2>
          {/* Aquí puedes renderizar el chat específico que se ha seleccionado */}
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
