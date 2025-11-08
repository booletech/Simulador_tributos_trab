import { useState, useEffect, useRef } from 'react'

/**
 * Hook para debounce de valores otimizado
 * Útil para otimizar buscas e validações com melhor performance
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Limpar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Configurar novo timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup na desmontagem do componente
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delay])

  // Cleanup na desmontagem
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedValue
}

/**
 * Hook para debounce de callbacks (alternativa mais eficiente em alguns casos)
 * Útil quando você quer debouncer uma função em vez de um valor
 */
export const useDebounceCallback = (callback, delay = 500) => {
  const timeoutRef = useRef(null)
  const callbackRef = useRef(callback)

  // Manter referência atualizada do callback
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const debouncedCallback = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }

  // Cleanup na desmontagem
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}

export default useDebounce
