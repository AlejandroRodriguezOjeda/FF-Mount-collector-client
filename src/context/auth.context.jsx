import { createContext, useEffect, useState } from "react";
import service from "../services/service.config";

const AuthContext = createContext()

function AuthWrapper(props) {

  // ...
  const [ isUserActive, setIsUserActive ] = useState(false)
  const [ activeUserId, setActiveUserId ] = useState(null)
  const [ isPageLoading, setIsPageLoading ] = useState(true)

  useEffect(() => {
    verifyToken()
  }, [])

  const verifyToken = async () => {

    // al inicio de esta funcion podemos mostrar el spinner mientras se valida el token
    setIsPageLoading(true)

    try {
      
      const response = await service.get("/auth/verify")
      console.log(response)

      setIsUserActive(true)
      setActiveUserId(response.data._id)
      setIsPageLoading(false)

    } catch (error) {
      console.log(error)
      setIsUserActive(false)
      setActiveUserId(null)
      setIsPageLoading(false)
    }

  }

  const passedContext = {
    verifyToken, 
    isUserActive, 
    activeUserId 
  }

  // clausula de guardia para toda la pagina
  if (isPageLoading === true) {
    return <h3>... Validando credenciales</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}