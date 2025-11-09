import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Componente para proteger rotas que requerem autenticação
 * Redireciona para /login se o usuário não estiver autenticado
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente a ser renderizado se autenticado
 * @returns {React.ReactNode}
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
