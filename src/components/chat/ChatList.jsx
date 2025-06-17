import { useState, useEffect } from 'react';
import { getUserChatsRequest, createOrGetChatRequest } from '../../services/api.js'; // Asegúrate de importar las funciones de tu archivo api.js

const ChatList = ({ onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener los chats del usuario
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { error, data } = await getUserChatsRequest();
        if (error) {
          console.error('Error al obtener chats:', data.message);
        } else {
          setChats(data); // Aquí guardamos los chats obtenidos
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Filtrar los chats según la búsqueda
  const filteredChats = chats.filter(chat =>
    chat.participants.some(p => p.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (chat.lastMessage && chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Función para seleccionar un chat
  const handleSelectChat = async (chatId, participantId) => {
    try {
      // Crear o obtener el chat al seleccionar un participante
      const { error, data } = await createOrGetChatRequest(participantId);
      if (error) {
        console.error('Error al seleccionar o crear chat:', data.message);
      } else {
        onSelectChat(data._id); // Llama a la función para abrir el chat
      }
    } catch (error) {
      console.error('Error seleccionando chat:', error);
    }
  };

  if (loading) {
    return <div>Loading chats...</div>;
  }

  return (
    <div className="flex flex-col h-full w-1/3 bg-gray-100 p-4">
      <input
        type="text"
        placeholder="Buscar en chats"
        className="mb-4 p-2 border border-gray-300 rounded-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex flex-col space-y-4 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat._id}
            className="flex items-center p-3 bg-white hover:bg-gray-200 rounded-lg cursor-pointer"
            onClick={() => handleSelectChat(chat._id, chat.participants[1]._id)} // Suponemos que el otro participante es el segundo
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full mr-4">
              {/* Aquí podrías poner una imagen de perfil */}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{chat.participants.map(p => p.username).join(', ')}</span>
              <span className="text-sm text-gray-600">
                {chat.lastMessage ? chat.lastMessage.text : 'No hay mensajes'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
