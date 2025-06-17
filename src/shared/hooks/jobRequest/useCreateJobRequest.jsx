import { useState } from 'react';
import toast from 'react-hot-toast';
import { createJobRequest } from '../../../services/api';

export const useCreateJobRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const createJobRequestHandler = async (payload) => {
    setIsLoading(true);
    setError('');
    
    const response = await createJobRequest(payload);
    
    if (response.error) {
      setError(response?.err?.response?.data?.message || 'Error al crear la solicitud');
      toast.error('Error al enviar la solicitud');
    } else {
      toast.success('¡Solicitud enviada con éxito!');
    }

    setIsLoading(false);
    return response;
  };

  return {
    createJobRequest: createJobRequestHandler,
    isLoading,
    error,
  };
};