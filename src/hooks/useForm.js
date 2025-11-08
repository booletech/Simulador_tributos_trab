import { useState, useCallback, useMemo } from 'react'

/**
 * Hook personalizado para gerenciar formulários
 * Otimizado para performance com memoização
 */
const useForm = (valoresIniciais = {}, validacoes = {}) => {
  const [valores, setValores] = useState(valoresIniciais)
  const [erros, setErros] = useState({})
  const [tocado, setTocado] = useState({})

  // Manipular mudança em campo com otimização
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    const novoValor = type === 'checkbox' ? checked : value
    
    setValores(prev => {
      // Evitar re-render se valor não mudou
      if (prev[name] === novoValor) return prev
      return { ...prev, [name]: novoValor }
    })

    // Limpar erro ao digitar de forma otimizada
    setErros(prev => {
      if (!prev[name]) return prev
      const { [name]: removedError, ...rest } = prev
      return rest
    })
  }, [])

  // Manipular blur com validação otimizada
  const handleBlur = useCallback((e) => {
    const { name } = e.target
    
    setTocado(prev => {
      if (prev[name]) return prev
      return { ...prev, [name]: true }
    })

    // Validar apenas se há validação definida e não há erro atual
    if (validacoes[name] && !erros[name]) {
      const erro = validacoes[name](valores[name])
      if (erro) {
        setErros(prev => ({ ...prev, [name]: erro }))
      }
    }
  }, [validacoes, valores, erros])

  // Validar todos os campos com otimização
  const validarTodos = useCallback(() => {
    const novosErros = {}
    let formularioValido = true

    // Usar Object.entries para melhor performance
    Object.entries(validacoes).forEach(([campo, validacao]) => {
      const erro = validacao(valores[campo])
      if (erro) {
        novosErros[campo] = erro
        formularioValido = false
      }
    })

    setErros(novosErros)
    return formularioValido
  }, [validacoes, valores])

  // Resetar formulário de forma otimizada
  const resetar = useCallback(() => {
    setValores(valoresIniciais)
    setErros({})
    setTocado({})
  }, [valoresIniciais])

  // Setar valores com verificação de mudança
  const setarValores = useCallback((novosValores) => {
    setValores(prev => {
      const merged = { ...prev, ...novosValores }
      // Verificar se houve mudança real
      const hasChange = Object.keys(novosValores).some(key => prev[key] !== novosValores[key])
      return hasChange ? merged : prev
    })
  }, [])

  // Verificar se formulário é válido (memoizado)
  const isValid = useMemo(() => {
    return Object.keys(erros).length === 0 && Object.keys(tocado).length > 0
  }, [erros, tocado])

  // Verificar se há campos modificados (memoizado)
  const isDirty = useMemo(() => {
    return Object.keys(valores).some(key => valores[key] !== valoresIniciais[key])
  }, [valores, valoresIniciais])

  return {
    valores,
    erros,
    tocado,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    validarTodos,
    resetar,
    setarValores,
  }
}

export default useForm
