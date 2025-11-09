import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'

const AuthContext = createContext()

/**
 * Hook para acessar o contexto de autenticação
 * @throws {Error} Se usado fora do AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

/**
 * Provider de autenticação global
 * Gerencia estado de login/logout e persistência no localStorage
 */
export const AuthProvider = ({ children }) => {
  // Inicializar estado a partir do localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return Boolean(localStorage.getItem('token'))
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error)
      return false
    }
  })

  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem('user')
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
      return null
    }
  })

  /**
   * Realiza login do usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<{sucesso: boolean, erro?: string}>}
   */
  const login = useCallback(async (email, password) => {
    try {
      // Simulação de chamada de API
      // Em produção, substituir por chamada real à API
      
      // Validação básica
      if (!email || !password) {
        return {
          sucesso: false,
          erro: 'Email e senha são obrigatórios',
        }
      }

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500))

      // Validar credenciais fixas
      const USUARIOS_VALIDOS = {
        'admin@sistema.com': { senha: 'admin123', nome: 'Administrador', role: 'admin' },
        'usuario@sistema.com': { senha: 'user123', nome: 'Usuário', role: 'user' },
      }

      const usuario = USUARIOS_VALIDOS[email]

      if (!usuario || usuario.senha !== password) {
        return {
          sucesso: false,
          erro: 'Email ou senha inválidos',
        }
      }

      const mockToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const mockUser = {
        id: Date.now().toString(),
        nome: usuario.nome,
        email,
        role: usuario.role,
      }

      // Salvar no localStorage
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))

      // Atualizar estado
      setIsAuthenticated(true)
      setUser(mockUser)

      return { sucesso: true }
    } catch (error) {
      return {
        sucesso: false,
        erro: error.message || 'Erro ao fazer login',
      }
    }
  }, [])

  /**
   * Realiza logout do usuário
   */
  const logout = useCallback(() => {
    // Limpar localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Atualizar estado
    setIsAuthenticated(false)
    setUser(null)
  }, [])

  /**
   * Verifica se o usuário tem uma role específica
   * @param {string} role - Role a verificar
   * @returns {boolean}
   */
  const hasRole = useCallback((role) => {
    return user?.role === role
  }, [user])

  // Sincronizar com mudanças no localStorage (para múltiplas abas)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        setIsAuthenticated(Boolean(e.newValue))
      }
      if (e.key === 'user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Memoizar o value para evitar re-renders desnecessários
  const value = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    logout,
    hasRole,
  }), [isAuthenticated, user, login, logout, hasRole])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
