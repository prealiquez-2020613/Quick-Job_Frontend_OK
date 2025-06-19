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
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-12">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-md px-10 py-10">
        <div className="flex justify-center mb-8">
          <img
            src="https://res.cloudinary.com/djedsgxyh/image/upload/v1750047799/Quick-Job_Black_qhmmmc.png"
            alt="Quick Job"
            className="h-20 object-contain"
          />
        </div>

        <h2 className="text-center text-xl font-bold mb-2 text-black">Log In</h2>
        <p className="text-center text-sm text-black mb-6">
          Ingresa tu username o correo para ingresar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="identifier"
              type="text"
              placeholder="Email or username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-400"
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
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-400"
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
            className={`w-full px-4 py-3 rounded-lg font-medium text-white transition ${
              disabledButton
                ? 'bg-black hover:opacity-90 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-black">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
};