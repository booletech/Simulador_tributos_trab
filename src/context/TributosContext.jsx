import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { gerarId } from '../utils/helpers'
import { calcularTributosTotais } from '../utils/tributosCalculos'

const TributosContext = createContext()

export const useTributosContext = () => {
  const context = useContext(TributosContext)
  if (!context) {
    throw new Error('useTributosContext deve ser usado dentro de TributosProvider')
  }
  return context
}

export const TributosProvider = ({ children }) => {
  // Estado para contratos de autônomos
  const [contratos, setContratos] = useState(() => {
    const contratosSalvos = localStorage.getItem('contratos')
    return contratosSalvos ? JSON.parse(contratosSalvos) : []
  })

  // Estado para cálculos recentes
  const [calculosRecentes, setCalculosRecentes] = useState(() => {
    const calculosSalvos = localStorage.getItem('calculosRecentes')
    return calculosSalvos ? JSON.parse(calculosSalvos) : []
  })

  // Estado de loading e erro
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  // Salvar contratos no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('contratos', JSON.stringify(contratos))
  }, [contratos])

  // Salvar cálculos recentes no localStorage
  useEffect(() => {
    localStorage.setItem('calculosRecentes', JSON.stringify(calculosRecentes))
  }, [calculosRecentes])

  // CRUD - Criar contrato
  const criarContrato = useCallback((dadosContrato) => {
    try {
      setLoading(true)
      setErro(null)

      const novoContrato = {
        id: gerarId(),
        ...dadosContrato,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
      }

      setContratos(prev => [...prev, novoContrato])
      setLoading(false)
      
      return { sucesso: true, contrato: novoContrato }
    } catch (error) {
      setErro(error.message)
      setLoading(false)
      return { sucesso: false, erro: error.message }
    }
  }, [])

  // CRUD - Ler contrato por ID
  const obterContrato = useCallback((id) => {
    return contratos.find(contrato => contrato.id === id)
  }, [contratos])

  // CRUD - Atualizar contrato
  const atualizarContrato = useCallback((id, dadosAtualizados) => {
    try {
      setLoading(true)
      setErro(null)

      setContratos(prev => prev.map(contrato => 
        contrato.id === id 
          ? { 
              ...contrato, 
              ...dadosAtualizados, 
              dataAtualizacao: new Date().toISOString() 
            }
          : contrato
      ))

      setLoading(false)
      return { sucesso: true }
    } catch (error) {
      setErro(error.message)
      setLoading(false)
      return { sucesso: false, erro: error.message }
    }
  }, [])

  // CRUD - Deletar contrato
  const deletarContrato = useCallback((id) => {
    try {
      setLoading(true)
      setErro(null)

      setContratos(prev => prev.filter(contrato => contrato.id !== id))
      
      setLoading(false)
      return { sucesso: true }
    } catch (error) {
      setErro(error.message)
      setLoading(false)
      return { sucesso: false, erro: error.message }
    }
  }, [])

  // Calcular tributos e salvar no histórico
  const calcularESalvar = useCallback((dadosCalculo) => {
    try {
      const resultado = calcularTributosTotais(dadosCalculo)
      
      const novoCalculo = {
        id: gerarId(),
        ...dadosCalculo,
        resultado,
        dataCalculo: new Date().toISOString(),
      }

      setCalculosRecentes(prev => [novoCalculo, ...prev].slice(0, 20)) // Manter últimos 20
      
      return { sucesso: true, calculo: novoCalculo }
    } catch (error) {
      return { sucesso: false, erro: error.message }
    }
  }, [])

  // Limpar histórico de cálculos
  const limparHistorico = useCallback(() => {
    setCalculosRecentes([])
    localStorage.removeItem('calculosRecentes')
  }, [])

  // Limpar erro
  const limparErro = useCallback(() => {
    setErro(null)
  }, [])

  const value = {
    // Estado
    contratos,
    calculosRecentes,
    loading,
    erro,
    
    // Ações CRUD
    criarContrato,
    obterContrato,
    atualizarContrato,
    deletarContrato,
    
    // Cálculos
    calcularESalvar,
    limparHistorico,
    
    // Utilidades
    limparErro,
  }

  return (
    <TributosContext.Provider value={value}>
      {children}
    </TributosContext.Provider>
  )
}

export default TributosContext
