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

  const handleDelete = async () => {
    const confirm = window.confirm('¿Estás seguro de eliminar esta solicitud?');
    if (confirm) {
      const response = await deleteJobRequest(request._id);
      if (response.error) {
        toast.error('Error al eliminar la solicitud');
      } else {
        toast.success('Solicitud eliminada');
      }
    }
  };

  // Lógica para habilitar/deshabilitar botones según el estado
  const isSentPending = isSent && status === 'PENDING';
  const isSentConfirmed = isSent && status === 'CONFIRMED';
  const isSentCompleted = isSent && status === 'COMPLETED';

  const isReceivedPending = !isSent && status === 'PENDING';
  const isReceivedConfirmed = !isSent && status === 'CONFIRMED';
  const isReceivedCompleted = !isSent && status === 'COMPLETED';

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">
          {isSent ? 'Enviada a' : 'Recibida de'} {isSent ? request.worker.name : request.client.name}
        </h3>
        <span className="text-gray-500 text-sm">{new Date(request.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="mt-2 text-gray-800">{request.description}</div>

      <div className="mt-4">
        <strong>Precio acordado: </strong>${request.agreedPrice}
      </div>

      <div className="mt-4 flex gap-4">
        {/* Lógica para solicitudes enviadas */}
        {isSent && isSentPending && (
          <button
            onClick={() => handleStatusChange('CANCELLED')}
            disabled={loading || isSentCompleted}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
        )}
        {isSent && isSentConfirmed && (
          <button
            onClick={() => handleStatusChange('COMPLETED')}
            disabled={loading || isSentCompleted}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Marcar como completada
          </button>
        )}

        {/* Lógica para solicitudes recibidas */}
        {!isSent && isReceivedPending && (
          <>
            <button
              onClick={() => handleStatusChange('CONFIRMED')}
              disabled={loading || isReceivedConfirmed || isReceivedCompleted}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Confirmar
            </button>
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              disabled={loading || isReceivedConfirmed || isReceivedCompleted}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
          </>
        )}

        {/* No se puede editar cuando ya está completada */}
        {!isSent && isReceivedConfirmed && (
          <button
            disabled
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Completado
          </button>
        )}

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Eliminar
        </button>
      </div>

      <div className="mt-4 text-gray-600">
        <strong>Estado:</strong> {status}
      </div>
    </div>
  );
};
