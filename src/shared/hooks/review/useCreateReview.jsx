import { useState } from 'react';
import toast from 'react-hot-toast';
import { createReview } from '../../../services/api';

export const useCreateReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const createReviewHandler = async (payload) => {
    setIsLoading(true);
    setError('');
    
    const response = await createReview(payload);
    
    if (response.error) {
      setError(response?.err?.response?.data?.message || 'Error al crear la reseña');
      toast.error('Error al enviar la reseña');
    } else {
      toast.success('¡Reseña enviada con éxito!');
    }

    setIsLoading(false);
    return response;
  };

  return {
    createReview: createReviewHandler,
    isLoading,
    error,
  };
};