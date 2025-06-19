import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { getCategoriesRequest, editProfileRequest } from "../../../services/api";
import axios from 'axios';

export const useEditProfile = (userId) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    category: '',
    description: '',
    experienceYears: ''
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Función para actualizar los datos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Obtener categorías desde la API (como en el registro)
  const fetchCategories = async () => {
    const res = await getCategoriesRequest();
    if (!res.error) {
      setCategories(res.data);
    } else {
      toast.error("Error al obtener categorías");
    }
  };

  // Obtener datos del usuario logueado para editar
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('No se encontró un token de sesión');
        return;
      }

      try {
        const userResponse = await axios.get(`http://localhost:5400/v1/user/findUser`, {
          headers: { Authorization: token }
        });

        if (userResponse.data.success) {
          const user = userResponse.data.user;
          setFormData({
            ...user,
            category: user.category?._id || '', // Asignar la categoría si es un trabajador
          });
        } else {
          setError('Error al obtener datos del usuario');
        }

        fetchCategories();
      } catch (err) {
        setError('Error al obtener los datos del usuario');
      }
    };

    fetchUser();
  }, [userId]);

  // Función para enviar los cambios de datos del usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSend = new FormData();
    for (const key in formData) {
      if (key === 'password') continue; // evitar enviarlo
      if ((key === 'category' || key === 'experienceYears') && formData.role !== 'WORKER') continue;
      dataToSend.append(key, formData[key]);
    }
    if (image) dataToSend.append('image', image);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No se encontró un token de sesión');
      setIsLoading(false);
      return;
    }

    try {
      const response = await editProfileRequest(dataToSend, token); // Enviar el token con la solicitud
      if (response.error) throw new Error(response.message);
      toast.success('Perfil actualizado correctamente');
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Error al actualizar el perfil');
      toast.error(err.message || 'Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    categories,
    setImage,
    isLoading,
    error
  };
};
