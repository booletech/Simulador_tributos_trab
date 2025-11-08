import { useCallback, useMemo } from 'react'
import { useTributosContext } from '../context/TributosContext'
import { calcularTributosTotais } from '../utils/tributosCalculos'

/**
 * Hook personalizado para operações relacionadas a tributos
 * Otimizado para performance com memoização
 */
const useTributos = () => {
  const {
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
  } = useTributosContext()

  // Calcular tributos sem salvar (memoizado)
  const calcular = useCallback((dadosCalculo) => {
    try {
      return {
        sucesso: true,
        resultado: calcularTributosTotais(dadosCalculo)
      }
    } catch (error) {
      return {
        sucesso: false,
        erro: error.message
      }
    }
  }, [])

  // Obter estatísticas dos contratos (memoizado para performance)
  const obterEstatisticas = useCallback(() => {
    if (!contratos.length) {
      return {
        totalContratos: 0,
        valorTotalBruto: 0,
        valorTotalLiquido: 0,
        totalTributos: 0,
        percentualMedioTributos: 0,
      }
    }

    const estatisticas = contratos.reduce((acc, contrato) => {
      const { valorBruto = 0, valorLiquido = 0 } = contrato
      const tributos = valorBruto - valorLiquido
      
      return {
        totalContratos: acc.totalContratos + 1,
        valorTotalBruto: acc.valorTotalBruto + valorBruto,
        valorTotalLiquido: acc.valorTotalLiquido + valorLiquido,
        totalTributos: acc.totalTributos + tributos,
      }
    }, {
      totalContratos: 0,
      valorTotalBruto: 0,
      valorTotalLiquido: 0,
      totalTributos: 0,
    })

    // Calcular percentual médio
    estatisticas.percentualMedioTributos = estatisticas.valorTotalBruto > 0 
      ? (estatisticas.totalTributos / estatisticas.valorTotalBruto) * 100 
      : 0

    return estatisticas
  }, [contratos])

  // Criar função de filtro otimizada
  const criarFiltro = useCallback((filtro) => {
    if (!filtro) return () => true

    const { nome, cpf, dataInicio, dataFim } = filtro
    const nomeNormalizado = nome?.toLowerCase()
    const dataInicioMs = dataInicio ? new Date(dataInicio).getTime() : null
    const dataFimMs = dataFim ? new Date(dataFim).getTime() : null

    return (contrato) => {
      if (nomeNormalizado && !contrato.nomeAutonomo?.toLowerCase().includes(nomeNormalizado)) {
        return false
      }

      if (cpf && !contrato.cpf?.includes(cpf)) {
        return false
      }

      const dataCriacaoMs = new Date(contrato.dataCriacao).getTime()

      if (dataInicioMs && dataCriacaoMs < dataInicioMs) {
        return false
      }

      if (dataFimMs && dataCriacaoMs > dataFimMs) {
        return false
      }

      return true
    }
  }, [])

  // Filtrar contratos de forma otimizada
  const filtrarContratos = useCallback((filtro) => {
    if (!filtro) return contratos
    const filtroFn = criarFiltro(filtro)
    return contratos.filter(filtroFn)
  }, [contratos, criarFiltro])

  // Função de comparação otimizada
  const criarComparador = useCallback((campo, ordem = 'asc') => {
    const multiplicador = ordem === 'asc' ? 1 : -1
    
    return (a, b) => {
      const valorA = a[campo]
      const valorB = b[campo]

      if (valorA === valorB) return 0

      if (typeof valorA === 'string') {
        return valorA.localeCompare(valorB) * multiplicador
      }

      if (typeof valorA === 'number') {
        return (valorA - valorB) * multiplicador
      }

      // Para datas ou outros tipos
      return (new Date(valorA) - new Date(valorB)) * multiplicador
    }
  }, [])

  // Ordenar contratos com otimização
  const ordenarContratos = useCallback((campo, ordem = 'asc') => {
    const comparador = criarComparador(campo, ordem)
    return [...contratos].sort(comparador)
  }, [contratos, criarComparador])

  // Buscar contratos por texto (otimizado)
  const buscarContratos = useCallback((texto) => {
    if (!texto?.trim()) return contratos

    const textoBusca = texto.toLowerCase().trim()
    
    return contratos.filter(contrato => 
      contrato.nomeAutonomo?.toLowerCase().includes(textoBusca) ||
      contrato.cpf?.includes(textoBusca) ||
      contrato.empresa?.toLowerCase().includes(textoBusca)
    )
  }, [contratos])

  // Validar dados do contrato
  const validarContrato = useCallback((dadosContrato) => {
    const erros = {}

    if (!dadosContrato.nomeAutonomo?.trim()) {
      erros.nomeAutonomo = 'Nome é obrigatório'
    }

    if (!dadosContrato.cpf?.trim()) {
      erros.cpf = 'CPF é obrigatório'
    }

    if (!dadosContrato.valorBruto || dadosContrato.valorBruto <= 0) {
      erros.valorBruto = 'Valor bruto deve ser maior que zero'
    }

    return {
      valido: Object.keys(erros).length === 0,
      erros
    }
  }, [])

  return {
    // Dados
    contratos,
    calculosRecentes,
    loading,
    erro,

    // Operações CRUD
    criarContrato,
    obterContrato,
    atualizarContrato,
    deletarContrato,
    validarContrato,

    // Cálculos
    calcular,
    calcularESalvar,
    limparHistorico,

    // Análises e filtros otimizados
    obterEstatisticas,
    filtrarContratos,
    ordenarContratos,
    buscarContratos,

    // Utilidades
    limparErro,
  }
}

export default useTributos
