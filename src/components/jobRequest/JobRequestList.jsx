import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientJobRequests, getWorkerJobRequests } from '../../services/api';
import { JobRequestItem } from './JobRequestItem';

export const JobRequestList = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Obtener solicitudes de trabajo enviadas y recibidas
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const clientResponse = await getClientJobRequests();
        const workerResponse = await getWorkerJobRequests();
        
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

  if (loading) return <div>Cargando solicitudes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Solicitudes Enviadas</h2>
      {sentRequests.length === 0 && <p>No tienes solicitudes enviadas.</p>}
      <div>
        {sentRequests.map((request) => (
          <JobRequestItem key={request._id} request={request} isSent={true} />
        ))}
      </div>

      <h2 className="text-3xl font-semibold mt-12 mb-6">Solicitudes Recibidas</h2>
      {receivedRequests.length === 0 && <p>No tienes solicitudes recibidas.</p>}
      <div>
        {receivedRequests.map((request) => (
          <JobRequestItem key={request._id} request={request} isSent={false} />
        ))}
      </div>
    </div>
  );
};
