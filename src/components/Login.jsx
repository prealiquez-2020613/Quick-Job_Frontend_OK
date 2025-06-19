import { useState } from 'react';
import { useLogin } from '../shared/hooks/login/useLogin.jsx';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();
  const navigate = useNavigate();

  const [checkValidation, setCheckValidation] = useState({
    identifier: undefined,
    password: undefined,
  });

  const disabledButton = checkValidation.identifier === '' && checkValidation.password === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(identifier, password);
    if (result?.success) {
      navigate('/home');
    }
  };

  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    setCheckValidation({
      ...checkValidation,
      identifier: value.length > 0 ? '' : 'El campo no puede estar vacío',
    });
    setIdentifier(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setCheckValidation({
      ...checkValidation,
      password: value.length > 0 ? '' : 'El campo no puede estar vacío',
    });
    setPassword(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 px-4 py-12">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg px-10 py-10">
        <div className="flex justify-center mb-8">
          <img
            src="https://res.cloudinary.com/djedsgxyh/image/upload/v1750047799/Quick-Job_Black_qhmmmc.png"
            alt="Quick Job"
            className="h-20 object-contain"
          />
        </div>

        <h2 className="text-center text-2xl font-bold mb-2 text-blue-800">Iniciar Sesión</h2>
        <p className="text-center text-sm text-blue-700 mb-6">
          Ingresa tu nombre de usuario o correo electrónico
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="identifier"
              type="text"
              placeholder="Email o nombre de usuario"
              className="w-full px-4 py-3 rounded-lg border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={identifier}
              onChange={handleIdentifierChange}
              autoComplete="identifier"
            />
            {checkValidation.identifier && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.identifier}</p>
            )}
          </div>

          <div>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-lg border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            {checkValidation.password && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.password}</p>
            )}
          </div>

          <button
            disabled={!disabledButton}
            className={`w-full px-4 py-3 rounded-lg font-semibold text-white transition duration-200 ${
              disabledButton
                ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
            type="submit"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-6 text-center text-blue-800">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-900 font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
