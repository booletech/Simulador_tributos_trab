import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
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

// Função utilitária para carregar dados do localStorage com memoização
const carregarDoLocalStorage = (chave, valorPadrao = []) => {
  try {
    const dados = localStorage.getItem(chave)
    return dados ? JSON.parse(dados) : valorPadrao
  } catch (error) {
    console.warn(`Erro ao carregar ${chave} do localStorage:`, error)
    return valorPadrao
  }
}

// Função utilitária para salvar no localStorage de forma debounced
let timeoutIds = {}
const salvarNoLocalStorage = (chave, dados) => {
  clearTimeout(timeoutIds[chave])
  timeoutIds[chave] = setTimeout(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(dados))
    } catch (error) {
      console.warn(`Erro ao salvar ${chave} no localStorage:`, error)
    }
  }, 500) // Debounce de 500ms
}

export const TributosProvider = ({ children }) => {
  // Estado para contratos de autônomos - inicialização otimizada
  const [contratos, setContratos] = useState(() => 
    carregarDoLocalStorage('contratos')
  )

  // Estado para cálculos recentes - inicialização otimizada
  const [calculosRecentes, setCalculosRecentes] = useState(() => 
    carregarDoLocalStorage('calculosRecentes')
  )

  // Estado de loading e erro
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  // Salvar contratos no localStorage com debounce
  useEffect(() => {
    salvarNoLocalStorage('contratos', contratos)
  }, [contratos])

  // Salvar cálculos recentes no localStorage com debounce
  useEffect(() => {
    salvarNoLocalStorage('calculosRecentes', calculosRecentes)
  }, [calculosRecentes])

  // CRUD - Criar contrato (otimizado)
  const criarContrato = useCallback((dadosContrato) => {
    try {
      setLoading(true)
      setErro(null)

      const agora = new Date().toISOString()
      const novoContrato = {
        id: gerarId(),
        ...dadosContrato,
        dataCriacao: agora,
        dataAtualizacao: agora,
      }

      setContratos(prev => [...prev, novoContrato])
      setLoading(false)
      
      return { sucesso: true, contrato: novoContrato }
    } catch (error) {
      const mensagemErro = error.message
      setErro(mensagemErro)
      setLoading(false)
      return { sucesso: false, erro: mensagemErro }
    }
  }, [])

  // CRUD - Ler contrato por ID
  const obterContrato = useCallback((id) => {
    return contratos.find(contrato => contrato.id === id)
  }, [contratos])

  // CRUD - Atualizar contrato (otimizado)
  const atualizarContrato = useCallback((id, dadosAtualizados) => {
    try {
      setLoading(true)
      setErro(null)

      const dataAtualizacao = new Date().toISOString()
      
      setContratos(prev => prev.map(contrato => 
        contrato.id === id 
          ? { 
              ...contrato, 
              ...dadosAtualizados, 
              dataAtualizacao 
            }
          : contrato
      ))

      setLoading(false)
      return { sucesso: true }
    } catch (error) {
      const mensagemErro = error.message
      setErro(mensagemErro)
      setLoading(false)
      return { sucesso: false, erro: mensagemErro }
    }
  }, [])

  // CRUD - Deletar contrato (otimizado)
  const deletarContrato = useCallback((id) => {
    try {
      setLoading(true)
      setErro(null)

      setContratos(prev => prev.filter(contrato => contrato.id !== id))
      
      setLoading(false)
      return { sucesso: true }
    } catch (error) {
      const mensagemErro = error.message
      setErro(mensagemErro)
      setLoading(false)
      return { sucesso: false, erro: mensagemErro }
    }
  }, [])

  // Calcular tributos e salvar no histórico (otimizado)
  const calcularESalvar = useCallback((dadosCalculo) => {
    try {
      const resultado = calcularTributosTotais(dadosCalculo)
      
      const novoCalculo = {
        id: gerarId(),
        ...dadosCalculo,
        resultado,
        dataCalculo: new Date().toISOString(),
      }

      // Manter apenas os últimos 20 cálculos para economizar memória
      setCalculosRecentes(prev => [novoCalculo, ...prev].slice(0, 20))
      
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

  // Memoizar o value do contexto para evitar re-renders desnecessários
  const value = useMemo(() => ({
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
  }), [
    contratos,
    calculosRecentes,
    loading,
    erro,
    criarContrato,
    obterContrato,
    atualizarContrato,
    deletarContrato,
    calcularESalvar,
    limparHistorico,
    limparErro,
  ])

  return (
    <TributosContext.Provider value={value}>
      {children}
    </TributosContext.Provider>
  )
}

export default TributosContext
