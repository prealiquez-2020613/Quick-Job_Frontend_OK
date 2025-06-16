import { useState } from "react";
import { useRegister } from "../shared/hooks/register/useRegister";
import { Link } from "react-router-dom";

export const Register = () => {
  const [role, setRole] = useState("CLIENT");
  const { formData, handleChange, handleSubmit, categories, setImage } = useRegister(role);

  const departamentos = [
    'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'Escuintla', 'Guatemala',
    'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché',
    'Retalhuleu', 'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez',
    'Totonicapán', 'Zacapa'
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-xl border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">REGISTRO</h1>

        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setRole("CLIENT")}
            className={`px-4 py-2 rounded-lg font-medium ${role === 'CLIENT' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
          >
            CLIENTE
          </button>
          <button
            onClick={() => setRole("WORKER")}
            className={`px-4 py-2 rounded-lg font-medium ${role === 'WORKER' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
          >
            TRABAJADOR
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className="w-full px-4 py-3 rounded-lg border border-blue-300" />
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Apellido" className="w-full px-4 py-3 rounded-lg border border-blue-300" />
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Nombre de usuario" className="w-full px-4 py-3 rounded-lg border border-blue-300" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" className="w-full px-4 py-3 rounded-lg border border-blue-300" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" className="w-full px-4 py-3 rounded-lg border border-blue-300" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" className="w-full px-4 py-3 rounded-lg border border-blue-300" />

          <select name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-blue-300">
            <option value="">Seleccione ubicación</option>
            {departamentos.map((dep, idx) => (
              <option key={idx} value={dep}>{dep}</option>
            ))}
          </select>

          {role === 'WORKER' && (
            <>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-blue-300">
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción del trabajador" className="w-full px-4 py-3 rounded-lg border border-blue-300" />

              <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} placeholder="Años de experiencia" className="w-full px-4 py-3 rounded-lg border border-blue-300" />
            </>
          )}

          <input 
            type="file" 
            name="profileImage" 
            onChange={(e) => setImage(e.target.files[0])} 
            className="w-full px-4 py-3 rounded-lg border border-blue-300"
          />

          <button type="submit" className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
            Registrarme
          </button>
        </form>

        <p className="mt-6 text-center text-blue-700">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
