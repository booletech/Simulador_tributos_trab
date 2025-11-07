import api from './api'

/**
 * Serviço para operações CRUD de contratos
 * Utiliza Axios com AbortController e tratamento de erros
 */

// GET - Listar todos os contratos
export const listarContratos = async ({ signal } = {}) => {
  try {
    const response = await api.get('/contratos', { signal })
    return response.data
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      console.log('Requisição cancelada')
      throw new Error('Requisição cancelada')
    }
    throw new Error(error.response?.data?.message || 'Erro ao listar contratos')
  }
}

// GET - Obter contrato por ID
export const obterContratoPorId = async (id, { signal } = {}) => {
  try {
    const response = await api.get(`/contratos/${id}`, { signal })
    return response.data
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      throw new Error('Requisição cancelada')
    }
    throw new Error(error.response?.data?.message || 'Erro ao obter contrato')
  }
}

// POST - Criar novo contrato
export const criarContratoAPI = async (dadosContrato, { signal } = {}) => {
  try {
    const response = await api.post('/contratos', dadosContrato, { signal })
    return response.data
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      throw new Error('Requisição cancelada')
    }
    throw new Error(error.response?.data?.message || 'Erro ao criar contrato')
  }
}

// PUT - Atualizar contrato
export const atualizarContratoAPI = async (id, dadosAtualizados, { signal } = {}) => {
  try {
    const response = await api.put(`/contratos/${id}`, dadosAtualizados, { signal })
    return response.data
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      throw new Error('Requisição cancelada')
    }
    throw new Error(error.response?.data?.message || 'Erro ao atualizar contrato')
  }
}

// DELETE - Deletar contrato
export const deletarContratoAPI = async (id, { signal } = {}) => {
  try {
    const response = await api.delete(`/contratos/${id}`, { signal })
    return response.data
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      throw new Error('Requisição cancelada')
    }
    throw new Error(error.response?.data?.message || 'Erro ao deletar contrato')
  }
}

// GET - Buscar contratos com filtros
export const buscarContratos = async (filtros, { signal } = {}) => {
  try {
    const params = new URLSearchParams(filtros).toString()
    const response = await api.get(`/contratos/buscar?${params}`, { signal })
    return response.data
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      throw new Error('Requisição cancelada')
    }
    throw new Error(error.response?.data?.message || 'Erro ao buscar contratos')
  }
}

// GET - Obter estatísticas
export const obterEstatisticasAPI = async ({ signal } = {}) => {
  try {
    const response = await api.get('/contratos/estatisticas', { signal })
    return response.data
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      throw new Error('Requisição cancelada')
    }
    throw new Error(error.response?.data?.message || 'Erro ao obter estatísticas')
  }
}

/**
 * Exemplo de uso com Promise.race para timeout customizado
 */
export const obterContratoComTimeout = async (id, timeout = 5000) => {
  const abortController = new AbortController()
  
  const requisicaoPromise = obterContratoPorId(id, { signal: abortController.signal })
  
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      abortController.abort()
      reject(new Error('Timeout: requisição demorou muito'))
    }, timeout)
  })
  
  try {
    return await Promise.race([requisicaoPromise, timeoutPromise])
  } catch (error) {
    throw error
  }
}

export default {
  listarContratos,
  obterContratoPorId,
  criarContratoAPI,
  atualizarContratoAPI,
  deletarContratoAPI,
  buscarContratos,
  obterEstatisticasAPI,
  obterContratoComTimeout,
}
