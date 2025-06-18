import React, { useState, useEffect } from 'react';
import { WorkerCard } from './WorkerCard.jsx';
import { getWorkersRequest } from '../../services/api.js';

const SearchWorkers = ({ departments }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      const response = await getWorkersRequest();
      console.log('Respuesta de la API:', response);

      if (!response.error && Array.isArray(response.data.users)) {
        setWorkers(response.data.users);
      } else {
        console.error('Error al obtener los trabajadores:', response.err);
      }
    };

    fetchWorkers();
  }, []);

  useEffect(() => {
    const results = workers.filter((worker) =>
      (worker.category.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
      (worker.location === selectedDepartment || selectedDepartment === '')
    );
    setFilteredWorkers(results);
  }, [searchQuery, selectedDepartment, workers]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Búsqueda de Trabajadores</h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por profesión..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Filtro de departamento */}
      <div className="mb-6">
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full p-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Selecciona un departamento</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de trabajadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredWorkers.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron trabajadores</p>
        ) : (
          filteredWorkers.map((worker) => (
            <WorkerCard
              key={worker._id}
              _id={worker._id}
              name={worker.name}
              category={worker.category}
              ratingAverage={worker.ratingAverage}
              profileImage={worker.profileImage}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchWorkers;