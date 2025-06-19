import React, { useState, useEffect } from 'react';
import SearchWorkers from '../components/user/SearchWorkers';

const SearchPage = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const departamentos = [
    'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'Escuintla', 'Guatemala',
    'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché',
    'Retalhuleu', 'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez',
    'Totonicapán', 'Zacapa'
  ];
    setDepartments(departamentos);
  }, []);

  return (
    <div className="search-page">
      <SearchWorkers departments={departments} />
    </div>
  );
};

export default SearchPage;
