import { useState, useEffect, useCallback } from 'react'

/**
 * Hook personalizado para gerenciar requisições assíncronas
 * Inclui AbortController para cancelar requisições
 */
const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // Função para executar a operação assíncrona
  const execute = useCallback((...params) => {
    setStatus('loading')
    setData(null)
    setError(null)

    // Criar AbortController para cancelar requisição
    const abortController = new AbortController()
    const signal = abortController.signal

    return asyncFunction(...params, { signal })
      .then(response => {
        if (!signal.aborted) {
          setData(response)
          setStatus('success')
        }
        return response
      })
      .catch(error => {
        if (!signal.aborted) {
          setError(error)
          setStatus('error')
        }
        throw error
      })
  }, [asyncFunction])

  // Executar imediatamente se solicitado
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    isIdle: status === 'idle',
  }
}

export default useAsync
