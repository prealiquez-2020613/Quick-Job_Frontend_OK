import { useContext } from 'react'
import { GetWorkersContext } from '../../../context/GetWorkersContext.jsx'
import toast from 'react-hot-toast'

export const useGetWorkersContext = () => {
    
    const context = useContext(GetWorkersContext);
    if(!context){
        toast.error('Error al obtener información');
        return console.error('No existe el provedor del contexto');
    }
  return context;
}