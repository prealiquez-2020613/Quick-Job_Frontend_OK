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

// REGISTER
export const registerRequest = async (userData) => {
  try {
    const res = await apiClient.post('/register', userData)
    return { error: false, data: res.data, message: res.data.message }
  } catch (err) {
    return {
      error: true,
      status: err.response?.status,
      message: err.response?.data?.message || 'Error en el registro',
      err
    }
  }
}

// CATEGORÍAS
export const getCategoriesRequest = async () => {
  try {
    const res = await apiClient.get('/v1/category/allcategories')
    return { error: false, data: res.data.categories }
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || 'Error al obtener categorías'
    }
  }
}


//====================================================
//==            RUTAS PARA USUARIOS                 ==
//====================================================

//OBTENER TRABAJADORES
export const getWorkersRequest = async()=> {
  try {
    return await apiClient.get('v1/user/workers')
  } catch (err) {
    return {error : true, err}
  }
}

//====================================================
//==          RUTAS PARA JOBREQUEST                 ==
//====================================================

//CREAR JOBREQUEST
export const createJobRequest = async (jobRequest) => {
  try {
    return await apiClient.post('/v1/jobrequest/jobrequests', jobRequest);
  } catch (err) {
    return { error: true, err };
  }
};

export const getClientJobRequests = async () => {
  try {
    return await apiClient.get('/v1/jobrequest/jobrequests/client');
  } catch (err) {
    return { error: true, err };
  }
};

export const getWorkerJobRequests = async () => {
  try {
    return await apiClient.get('/v1/jobrequest/jobrequests/worker');
  } catch (err) {
    return { error: true, err };
  }
};

export const updateJobRequestStatus = async (id, data) => {
  try {
    return await apiClient.put(`/v1/jobrequest/jobrequests/${id}`, data);
  } catch (err) {
    return { error: true, err };
  }
};

export const deleteJobRequest = async (id) => {
  try {
    return await apiClient.delete(`/v1/jobrequest/deletejobrequests/${id}`);
  } catch (err) {
    return { error: true, err };
  }
};

// OBTENER TODOS LOS CHATS DEL USUARIO
export const getUserChatsRequest = async () => {
  try {
    const res = await apiClient.get('/v1/chat/allchat')
    return { error: false, data: res.data.chats }
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || 'Error al obtener los chats',
      err
    }
  }
}

// CREAR O REUTILIZAR UN CHAT ENTRE DOS USUARIOS
export const createOrGetChatRequest = async (participantId) => {
  try {
    const res = await apiClient.post('/v1/chat/createchat', { participantId })
    return { error: false, data: res.data.chat }
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || 'Error al crear o obtener el chat',
      err
    }
  }
}

// ENVIAR UN MENSAJE A UN CHAT
export const sendMessageRequest = async (chatId, text) => {
  try {
    const res = await apiClient.post('/v1/chat/message', { chatId, text })
    return { error: false, data: res.data.chat }
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || 'Error al enviar el mensaje',
      err
    }
  }
}