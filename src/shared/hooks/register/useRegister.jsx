import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { registerRequest, getCategoriesRequest } from "../../../services/api";

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

    const { error, message } = await registerRequest(finalData);
    if (error) return toast.error(message);

    toast.success(message);
    navigate('/');
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    categories
  };
};
