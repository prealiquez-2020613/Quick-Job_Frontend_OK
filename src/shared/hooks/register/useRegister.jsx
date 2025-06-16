import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { registerRequest, getCategoriesRequest } from "../../../services/api";
import axios from 'axios';

export const useRegister = (role) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    category: '',
    description: '',
    experienceYears: ''
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchCategories = async () => {
    const res = await getCategoriesRequest();
    if (!res.error) {
      setCategories(res.data);
    } else {
      toast.error("Error al obtener categorías");
    }
  };

  useEffect(() => {
    if (role === 'WORKER') {
      fetchCategories();
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseData = {
      name: formData.name,
      surname: formData.surname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      location: formData.location,
      role: role
    };

    const workerExtras = role === 'WORKER' ? {
      category: formData.category,
      description: formData.description,
      experienceYears: parseInt(formData.experienceYears) || 0
    } : {};

    const finalData = { ...baseData, ...workerExtras };

    const formDataToSend = new FormData();
    formDataToSend.append('name', finalData.name);
    formDataToSend.append('surname', finalData.surname);
    formDataToSend.append('username', finalData.username);
    formDataToSend.append('email', finalData.email);
    formDataToSend.append('password', finalData.password);
    formDataToSend.append('phone', finalData.phone);
    formDataToSend.append('location', finalData.location);
    formDataToSend.append('role', finalData.role);

    if (role === 'WORKER') {
      formDataToSend.append('category', finalData.category);
      formDataToSend.append('description', finalData.description);
      formDataToSend.append('experienceYears', finalData.experienceYears);
    }

    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const { error, message } = await registerRequest(formDataToSend);
      if (error) return toast.error(message);

      toast.success(message);
      navigate('/');
    } catch (err) {
      toast.error("Error en el registro");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    categories,
    setImage
  };
};
