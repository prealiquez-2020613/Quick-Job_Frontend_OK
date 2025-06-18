import { useState, useEffect } from 'react'
import { editProfileRequest } from "../../../services/api.js"
import toast from 'react-hot-toast'

export const useEditProfile = (role) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    description: '',
    category: ''
  })
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const fetchCategories = async () => {
    const response = await getCategoriesRequest()
    if (!response.error) setCategories(response.data)
  }

  useEffect(() => {
    if (role === 'WORKER') {
      fetchCategories()
    }
  }, [role])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const finalData = { ...formData, role }

    if (image) finalData.image = image

    try {
      const response = await editProfileRequest(finalData)
      if (response.error) throw new Error(response.message)
      toast.success("Perfil actualizado correctamente")
    } catch (err) {
      toast.error("Error al actualizar perfil")
    }
  }

  return { formData, handleChange, handleSubmit, categories, setImage }
}
