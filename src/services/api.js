import axios from 'axios'

// Configuração base do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erros globais
    if (error.response) {
      // Erro com resposta do servidor
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Não autorizado - redirecionar para login
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          // Proibido
          console.error('Acesso proibido')
          break
        case 404:
          // Não encontrado
          console.error('Recurso não encontrado')
          break
        case 500:
          // Erro do servidor
          console.error('Erro interno do servidor')
          break
        default:
          console.error(`Erro ${status}: ${data.message || 'Erro desconhecido'}`)
      }
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error('Sem resposta do servidor')
    } else {
      // Erro na configuração da requisição
      console.error('Erro na requisição:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api
