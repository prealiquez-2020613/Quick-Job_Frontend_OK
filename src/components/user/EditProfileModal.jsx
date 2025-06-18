import { useState } from 'react';
import { useEditProfile } from '../../shared/hooks/user/useEditProfile';
import toast from 'react-hot-toast';

export const EditProfileModal = ({ closeModal }) => {
  const { formData, handleChange, handleSubmit, categories, setImage, isLoading, error } = useEditProfile();

  const departamentos = [
    'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'Escuintla', 'Guatemala',
    'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché',
    'Retalhuleu', 'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez',
    'Totonicapán', 'Zacapa'
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          >
            <option value="">Seleccione ubicación</option>
            {departamentos.map((dep, idx) => (
              <option key={idx} value={dep}>{dep}</option>
            ))}
          </select>

          {formData.role === 'WORKER' && (
            <>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-blue-300"
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción del trabajador"
                className="w-full px-4 py-3 rounded-lg border border-blue-300"
              />

              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                placeholder="Años de experiencia"
                className="w-full px-4 py-3 rounded-lg border border-blue-300"
              />
            </>
          )}

          <input
            type="file"
            name="profileImage"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gray-300 text-black font-medium rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};