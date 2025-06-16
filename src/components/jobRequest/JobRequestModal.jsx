import { useState } from 'react';
import { useCreateJobRequest } from '../../shared/hooks/jobRequest/useCreateJobRequest';

export const JobRequestModal = ({ workerId, closeModal }) => {
  const { createJobRequest, isLoading, error } = useCreateJobRequest();
  const [description, setDescription] = useState('');
  const [agreedPrice, setAgreedPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { worker: workerId, description, agreedPrice: Number(agreedPrice) };
    await createJobRequest(payload);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4">Enviar Solicitud de Trabajo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium">Descripción</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium">Precio acordado</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={agreedPrice}
              onChange={(e) => setAgreedPrice(e.target.value)}
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
              {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};
