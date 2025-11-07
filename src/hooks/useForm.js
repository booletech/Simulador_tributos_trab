import { useState, useCallback } from 'react'

/**
 * Hook personalizado para gerenciar formulários
 * Utiliza destructuring e arrow functions
 */
const useForm = (valoresIniciais = {}, validacoes = {}) => {
  const [valores, setValores] = useState(valoresIniciais)
  const [erros, setErros] = useState({})
  const [tocado, setTocado] = useState({})

  // Manipular mudança em campo usando destructuring
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    
    setValores(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Limpar erro ao digitar
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }, [erros])

  // Manipular blur para validação
  const handleBlur = useCallback((e) => {
    const { name } = e.target
    
    setTocado(prev => ({
      ...prev,
      [name]: true
    }))

    // Validar campo se houver validação definida
    if (validacoes[name]) {
      const erro = validacoes[name](valores[name])
      setErros(prev => ({
        ...prev,
        [name]: erro
      }))
    }
  }, [validacoes, valores])

  // Validar todos os campos
  const validarTodos = useCallback(() => {
    const novosErros = {}
    let formularioValido = true

    Object.keys(validacoes).forEach(campo => {
      const erro = validacoes[campo](valores[campo])
      if (erro) {
        novosErros[campo] = erro
        formularioValido = false
      }
    })

    setErros(novosErros)
    return formularioValido
  }, [validacoes, valores])

  // Resetar formulário
  const resetar = useCallback(() => {
    setValores(valoresIniciais)
    setErros({})
    setTocado({})
  }, [valoresIniciais])

  // Setar valores manualmente
  const setarValores = useCallback((novosValores) => {
    setValores(prev => ({ ...prev, ...novosValores }))
  }, [])

  return {
    valores,
    erros,
    tocado,
    handleChange,
    handleBlur,
    validarTodos,
    resetar,
    setarValores,
  }
}

export default useForm
