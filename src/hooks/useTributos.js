import { useCallback } from 'react'
import { useTributosContext } from '../context/TributosContext'
import { calcularTributosTotais } from '../utils/tributosCalculos'

/**
 * Hook personalizado para operações relacionadas a tributos
 * Abstrai lógica de cálculo e manipulação de dados
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

  // Calcular tributos sem salvar
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

  // Obter estatísticas dos contratos
  const obterEstatisticas = useCallback(() => {
    if (!contratos.length) {
      return {
        totalContratos: 0,
        valorTotalBruto: 0,
        valorTotalLiquido: 0,
        totalTributos: 0,
      }
    }

    const estatisticas = contratos.reduce((acc, contrato) => {
      const { valorBruto = 0, valorLiquido = 0 } = contrato
      
      return {
        totalContratos: acc.totalContratos + 1,
        valorTotalBruto: acc.valorTotalBruto + valorBruto,
        valorTotalLiquido: acc.valorTotalLiquido + valorLiquido,
        totalTributos: acc.totalTributos + (valorBruto - valorLiquido),
      }
    }, {
      totalContratos: 0,
      valorTotalBruto: 0,
      valorTotalLiquido: 0,
      totalTributos: 0,
    })

    return estatisticas
  }, [contratos])

  // Filtrar contratos por critério
  const filtrarContratos = useCallback((filtro) => {
    if (!filtro) return contratos

    const { nome, cpf, dataInicio, dataFim } = filtro

    return contratos.filter(contrato => {
      let match = true

      if (nome) {
        match = match && contrato.nomeAutonomo?.toLowerCase().includes(nome.toLowerCase())
      }

      if (cpf) {
        match = match && contrato.cpf?.includes(cpf)
      }

      if (dataInicio) {
        match = match && new Date(contrato.dataCriacao) >= new Date(dataInicio)
      }

      if (dataFim) {
        match = match && new Date(contrato.dataCriacao) <= new Date(dataFim)
      }

      return match
    })
  }, [contratos])

  // Ordenar contratos
  const ordenarContratos = useCallback((campo, ordem = 'asc') => {
    return [...contratos].sort((a, b) => {
      const valorA = a[campo]
      const valorB = b[campo]

      if (typeof valorA === 'string') {
        return ordem === 'asc'
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA)
      }

      return ordem === 'asc'
        ? valorA - valorB
        : valorB - valorA
    })
  }, [contratos])

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

    // Cálculos
    calcular,
    calcularESalvar,
    limparHistorico,

    // Análises
    obterEstatisticas,
    filtrarContratos,
    ordenarContratos,

    // Utilidades
    limparErro,
  }
}

export default useTributos
