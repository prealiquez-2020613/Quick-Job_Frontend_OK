import { useState, useEffect } from 'react';
import { getUserChatsRequest } from '../../../services/api.js';

const useChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [error, setError] = useState(null);

  // Obtener chats desde la API
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { error, data } = await getUserChatsRequest();
        if (error) {
          setError(data.message);
        } else {
          setChats(data); // guardamos los chats obtenidos
        }
      } catch (err) {
        setError('Error al obtener los chats');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  return {
    chats,
    loading,
    error,
    selectedChatId,
    handleSelectChat
  };
};

export default useChats;