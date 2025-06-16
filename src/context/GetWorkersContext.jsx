import { useGetWorkers } from "../shared/hooks/user/useGetWorkers.jsx"
import { createContext, useEffect } from "react"

export const GetWorkersContext = createContext();

export const GetWorkersProvider = ({children}) => {

  const {workers, isFetchingWorkers, getWorkers} = useGetWorkers();
  useEffect(() => {
    getWorkers();
  }, [])

  return (
    <GetWorkersContext.Provider value={{ workers, isFetchingWorkers }}>
      {children}
    </GetWorkersContext.Provider>
  )
}