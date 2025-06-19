import { useEffect, useState } from 'react';
import { getClientJobRequests, getWorkerJobRequests } from '../../services/api';
import { JobRequestItem } from './JobRequestItem';

export const JobRequestList = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [requestType, setRequestType] = useState('sent');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [clientResponse, workerResponse] = await Promise.all([
          getClientJobRequests(),
          getWorkerJobRequests()
        ]);
        setSentRequests(clientResponse.data.requests);
        setReceivedRequests(workerResponse.data.requests);
      } catch (err) {
        setError('Error al cargar las solicitudes');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestTypeChange = (e) => setRequestType(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const filterRequests = (requests) => {
    if (statusFilter === 'ALL') return requests;
    return requests.filter((req) => req.status === statusFilter);
  };

  const currentRequests =
    requestType === 'sent'
      ? filterRequests(sentRequests)
      : filterRequests(receivedRequests);

  if (loading) return <div className="flex items-center justify-center p-8 text-blue-600">Cargando solicitudes...</div>;
  if (error) return <div className="flex items-center justify-center p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-blue-800">Solicitudes de Trabajo</h2>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <select
          value={requestType}
          onChange={handleRequestTypeChange}
          className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="sent">Solicitudes Enviadas</option>
          <option value="received">Solicitudes Recibidas</option>
        </select>

        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="ALL">Todos los Estados</option>
          <option value="PENDING">Pendiente</option>
          <option value="CONFIRMED">Confirmada</option>
          <option value="CANCELLED">Cancelada</option>
          <option value="COMPLETED">Completada</option>
        </select>
      </div>

      {currentRequests.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No hay solicitudes que coincidan con los filtros seleccionados.</p>
      ) : (
        currentRequests.map((request) => (
          <JobRequestItem
            key={request._id}
            request={request}
            isSent={requestType === 'sent'}
          />
        ))
      )}
    </div>
  );
};