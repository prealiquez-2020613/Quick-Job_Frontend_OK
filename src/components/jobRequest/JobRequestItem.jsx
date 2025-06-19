import { useState } from 'react';
import { updateJobRequestStatus, deleteJobRequest } from '../../services/api';
import toast from 'react-hot-toast';

export const JobRequestItem = ({ request, isSent }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(request.status);

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    const response = await updateJobRequestStatus(request._id, { status: newStatus });

    if (response.error) {
      toast.error('Error al actualizar el estado');
    } else {
      setStatus(newStatus);
      toast.success('Estado actualizado');
    }

    setLoading(false);
  };

  // Lógica para habilitar/deshabilitar botones según el estado
  const isSentPending = isSent && status === 'PENDING';
  const isSentConfirmed = isSent && status === 'CONFIRMED';
  const isSentCompleted = isSent && status === 'COMPLETED';

  const isReceivedPending = !isSent && status === 'PENDING';
  const isReceivedConfirmed = !isSent && status === 'CONFIRMED';
  const isReceivedCompleted = !isSent && status === 'COMPLETED';

  const getStatusBadge = (status) => {
    const statusConfig = {
      'PENDING': { bg: 'bg-amber-400', text: 'text-slate-700', label: 'Pendiente' },
      'CONFIRMED': { bg: 'bg-blue-600', text: 'text-white', label: 'Confirmada' },
      'COMPLETED': { bg: 'bg-green-500', text: 'text-white', label: 'Completada' },
      'CANCELLED': { bg: 'bg-red-500', text: 'text-white', label: 'Cancelada' }
    };
    
    const config = statusConfig[status] || statusConfig['PENDING'];
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-slate-200 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-700">
              {isSent ? 'Enviada a' : 'Recibida de'} {isSent ? request.worker.name : request.client.name}
            </h3>
            <span className="text-slate-500 text-sm">{new Date(request.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        {getStatusBadge(status)}
      </div>

      {/* Content */}
      <div className="bg-slate-50 rounded-xl p-4 mb-4">
        <p className="text-slate-700 leading-relaxed">{request.description}</p>
      </div>

      {/* Price */}
      <div className="flex items-center mb-6 p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
        <svg className="w-5 h-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
        <span className="font-bold text-lg text-slate-700">${request.agreedPrice}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        {/* Lógica para solicitudes enviadas */}
        {isSent && isSentPending && (
          <button
            onClick={() => handleStatusChange('CANCELLED')}
            disabled={loading || isSentCompleted}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg"
          >
            {loading ? 'Procesando...' : 'Cancelar'}
          </button>
        )}
        
        {isSent && isSentConfirmed && (
          <button
            onClick={() => handleStatusChange('COMPLETED')}
            disabled={loading || isSentCompleted}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg"
          >
            {loading ? 'Procesando...' : 'Marcar como completada'}
          </button>
        )}

        {/* Lógica para solicitudes recibidas */}
        {!isSent && isReceivedPending && (
          <>
            <button
              onClick={() => handleStatusChange('CONFIRMED')}
              disabled={loading || isReceivedConfirmed || isReceivedCompleted}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg"
            >
              {loading ? 'Procesando...' : 'Confirmar'}
            </button>
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              disabled={loading || isReceivedConfirmed || isReceivedCompleted}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg"
            >
              {loading ? 'Procesando...' : 'Cancelar'}
            </button>
          </>
        )}

        {/* Estado completado para solicitudes recibidas */}
        {!isSent && isReceivedConfirmed && (
          <button
            disabled
            className="px-6 py-3 bg-slate-400 text-white rounded-xl font-semibold cursor-not-allowed"
          >
            Esperando confirmación del cliente
          </button>
        )}
      </div>
    </div>
  );
};