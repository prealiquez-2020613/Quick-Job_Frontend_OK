import axios from "axios";

const apiClient = axios.create(
  {
    baseURL: 'http://localhost:5400',
    timeout: 2000
  }
)

apiClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = token
        }
        return config
    }
    
)

//RUTA LOGIN
export const loginRequest = async (user) => {
  try {
    const res = await apiClient.post('/login', user)
    console.log(res);

    return { error: false, data: res.data }
  } catch (err) {
    return {
      error: true,
      status: err.response?.status,
      message: err.response?.data?.message || 'Error inesperado',
      err
    }
  }
}