import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { loginRequest } from "../../../services/api.js";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (identifier, password) => {
    setIsLoading(true);

    const user = { identifier, password };
    const response = await loginRequest(user);

    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return { success: false };
    }

    const { loggedUser, message, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(loggedUser));

    toast.success(message);

    return { success: true };
  };

  return {
    login,
    isLoading
  };
};