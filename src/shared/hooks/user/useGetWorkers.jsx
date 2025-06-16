import { useState } from 'react'
import { getWorkersRequest } from "../../../services/api.js"
import toast from 'react-hot-toast';

export const useGetWorkers = () => {

    const [workers, setWorkers] = useState(null)
    const getWorkers = async () => {
        const response = await getWorkersRequest();
        if(response.error){
            return toast.error(
                response?.err?.response?.data?.message || 'Error al obtener los trabajadores'
            )
        }
        setWorkers(response.data.users)
    }
  return {
    workers,
    isFetchingWorkers: !workers,
    getWorkers
  }
}