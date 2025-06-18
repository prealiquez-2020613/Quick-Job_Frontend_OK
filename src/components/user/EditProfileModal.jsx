import { useState } from 'react';
import { useEditProfile } from '../../shared/hooks/user/useEditProfile';
import toast from 'react-hot-toast';

export const EditProfileModal = ({ closeModal }) => {
  const { formData, handleChange, handleSubmit, categories, setImage, isLoading, error } = useEditProfile();
  const [validation, setValidation] = useState({});

  const departamentos = [ 'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'Escuintla', 'Guatemala',
    'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché', 'Retalhuleu', 'Sacatepéquez',
    'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez', 'Totonicapán', 'Zacapa' ];

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    setValidation((prev) => ({
      ...prev,
      [name]: value.trim() === '' ? `El campo ${name} no puede estar vacío` : ''
    }));
  };

  const requiredFields = ['name', 'surname', 'username', 'email', 'phone', 'location'];
  const isDisabled = requiredFields.some((field) => !formData[field] || validation[field]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {['name', 'surname', 'username', 'email', 'phone'].map((field) => (
            <div key={field}>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleFieldChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full px-4 py-3 rounded-lg border border-blue-300"
              />
              {validation[field] && <span className="text-red-600 text-sm">{validation[field]}</span>}
            </div>
          ))}

          <div>
            <select
              name="location"
              value={formData.location}
              onChange={handleFieldChange}
              className="w-full px-4 py-3 rounded-lg border border-blue-300"
            >
              <option value="">Seleccione ubicación</option>
              {departamentos.map((dep, idx) => (
                <option key={idx} value={dep}>{dep}</option>
              ))}
            </select>
            {validation.location && <span className="text-red-600 text-sm">{validation.location}</span>}
          </div>

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

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del usuario"
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />

          <input
            type="file"
            name="profileImage"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />

          <button
            type="submit"
            className={`w-full px-4 py-3 rounded-lg text-white font-medium transition ${
              isDisabled || isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isDisabled || isLoading}
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