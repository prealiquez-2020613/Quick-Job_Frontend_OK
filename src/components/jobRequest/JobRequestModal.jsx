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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-blue-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2-2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Enviar Solicitud</h2>
            </div>
            <button
              onClick={closeModal}
              className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-slate-200 mt-2">Completa los detalles de tu solicitud de trabajo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Descripción del trabajo
              </label>
              <div className="relative">
                <textarea
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none resize-none"
                  rows="4"
                  placeholder="Describe detalladamente el trabajo que necesitas..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {description.length}/500
                </div>
              </div>
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Oferta económica
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 text-lg font-semibold">$</span>
                </div>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                  placeholder="0.00"
                  value={agreedPrice}
                  onChange={(e) => setAgreedPrice(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                💡 Propón una oferta justa basada en la complejidad del trabajo
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button 
              type="button" 
              onClick={closeModal} 
              className="flex-1 px-6 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                isLoading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Enviando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Enviar Solicitud</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};