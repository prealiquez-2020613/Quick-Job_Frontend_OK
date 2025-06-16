import { BrowserRouter, useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { routes } from "./routes.jsx"
import { Navbar } from './components/Navbar.jsx'
import './App.css'

function App() {
  const elements = useRoutes(routes)
  return (
    <>
      {elements}
      <Toaster position='bottom-right' reverserOrder={false}/>
    </>
  )
}

export default App