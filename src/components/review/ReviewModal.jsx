import { useState } from 'react';
import { useCreateReview } from '../../shared/hooks/review/useCreateReview';

export const ReviewModal = ({ receiverId, closeModal, receiverName }) => {
  const { createReview, isLoading, error } = useCreateReview();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { receiver: receiverId, rating, comment };
    await createReview(payload);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4">Reseñar a {receiverName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium">Calificación</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value={5}>5 estrellas</option>
              <option value={4}>4 estrellas</option>
              <option value={3}>3 estrellas</option>
              <option value={2}>2 estrellas</option>
              <option value={1}>1 estrella</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium">Comentario</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded-lg">
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${isLoading ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar Reseña'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};