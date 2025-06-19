import { useState } from "react";
import { useRegister } from "../shared/hooks/register/useRegister";
import { Link } from "react-router-dom";

export const Register = () => {
  const [role, setRole] = useState("CLIENT");
  const { formData, handleChange, handleSubmit, categories, setImage } = useRegister(role);
  const [imagePreview, setImagePreview] = useState(null);

  const [checkValidation, setCheckValidation] = useState({
    name: undefined,
    surname: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleValidationChange = (field, value) => {
    const validations = {
      name: value.length > 0 ? "" : "El nombre no puede estar vacío",
      surname: value.length > 0 ? "" : "El apellido no puede estar vacío",
      username: value.length > 0 ? "" : "El nombre de usuario no puede estar vacío",
      email: /\S+@\S+\.\S+/.test(value) ? "" : "Correo electrónico no válido",
      password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(value)
        ? ""
        : "La contraseña debe tener entre 8 y 16 caracteres, un número, una mayúscula, una minúscula y un carácter especial.",
      phone: value.length >= 8 ? "" : "El número debe tener al menos 8 dígitos"
    };
    setCheckValidation({ ...checkValidation, [field]: validations[field] });
  };

  const handleInputChange = (e) => {
    handleChange(e);
    handleValidationChange(e.target.name, e.target.value);
  };

  const requiredFields = ["name", "surname", "username", "email", "password", "phone"];
  const disabledButton = requiredFields.every((field) => checkValidation[field] === "");

  const departamentos = [
    'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'Escuintla', 'Guatemala',
    'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché',
    'Retalhuleu', 'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez',
    'Totonicapán', 'Zacapa'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-12">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-md px-10 py-10 overflow-y-auto max-h-screen">
        <div className="flex justify-center mb-8">
          <img
            src="https://res.cloudinary.com/djedsgxyh/image/upload/v1750047799/Quick-Job_Black_qhmmmc.png"
            alt="Quick Job"
            className="h-20 object-contain"
          />
        </div>

        <h2 className="text-center text-xl font-bold mb-4 text-black">Registro</h2>

        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setRole("CLIENT")}
            className={`px-4 py-2 rounded-lg font-medium ${role === 'CLIENT' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
          >
            CLIENTE
          </button>
          <button
            onClick={() => setRole("WORKER")}
            className={`px-4 py-2 rounded-lg font-medium ${role === 'WORKER' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
          >
            TRABAJADOR
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {["name", "surname", "username", "email", "password", "phone"].map((field) => (
            <div key={field}>
              <input
                type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={
                  field === "name" ? "Nombre" :
                  field === "surname" ? "Apellido" :
                  field === "username" ? "Nombre de usuario" :
                  field === "email" ? "Correo electrónico" :
                  field === "password" ? "Contraseña" :
                  "Teléfono"
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-400"
              />
              {checkValidation[field] && (
                <p className="text-sm text-red-600 font-semibold mt-1">{checkValidation[field]}</p>
              )}
            </div>
          ))}

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-400"
          >
            <option value="">Seleccione ubicación</option>
            {departamentos.map((dep, idx) => (
              <option key={idx} value={dep}>{dep}</option>
            ))}
          </select>

          {role === 'WORKER' && (
            <>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />

              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                placeholder="Años de experiencia"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </>
          )}

          <div className="space-y-2">
            <label className="block w-full">
              <span className="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</span>
              <input
                type="file"
                name="profileImage"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0 file:text-sm file:font-semibold
                file:bg-black file:text-white hover:file:opacity-90"
              />
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-32 h-32 rounded-full object-cover mx-auto border border-gray-300 mt-2"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={!disabledButton}
            className={`w-full px-4 py-3 rounded-lg font-medium text-white transition ${
              disabledButton ? 'bg-black hover:opacity-90 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Registrarme
          </button>
        </form>

        <p className="mt-6 text-center text-black">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
