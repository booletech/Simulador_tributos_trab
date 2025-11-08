// Cache para valores constantes que não mudam
const CONSTANTS = {
  SALARIO_MINIMO: 1412.00,
  TETO_INSS: 7786.02,
  ALIQUOTA_INSS: 0.20,
  DEDUCAO_POR_DEPENDENTE: 189.59,
  // Tabela IRRF pré-calculada para performance
  FAIXAS_IRRF: [
    { limite: 2112.00, aliquota: 0, deducao: 0 },
    { limite: 2826.65, aliquota: 0.075, deducao: 158.40 },
    { limite: 3751.05, aliquota: 0.15, deducao: 370.40 },
    { limite: 4664.68, aliquota: 0.225, deducao: 651.73 },
    { limite: Infinity, aliquota: 0.275, deducao: 884.96 }
  ]
}

// Cache para resultados de cálculos (LRU cache simples)
const calculoCache = new Map()
const MAX_CACHE_SIZE = 100

// Função utilitária para arredondar valores monetários de forma eficiente
const round = (value) => Math.round(value * 100) / 100

// Gerar chave de cache eficiente
const gerarChaveCache = (valorBruto, dependentes, aliquotaISS, incluirISS) => 
  `${valorBruto}:${dependentes}:${aliquotaISS}:${incluirISS}`

// Limpar cache quando necessário
const limparCache = () => {
  if (calculoCache.size > MAX_CACHE_SIZE) {
    const firstKey = calculoCache.keys().next().value
    calculoCache.delete(firstKey)
  }
}

// Utilitário para calcular INSS de autônomos (otimizado)
export const calcularINSS = (valorBruto) => {
  // Validação rápida
  if (!valorBruto || valorBruto <= 0) {
    throw new Error('Valor bruto deve ser maior que zero')
  }

  const { SALARIO_MINIMO, TETO_INSS, ALIQUOTA_INSS } = CONSTANTS
  
  // Base de cálculo limitada ao teto
  const baseCalculo = Math.min(valorBruto, TETO_INSS)
  
  // Valor mínimo de contribuição
  const minimoContribuicao = SALARIO_MINIMO * ALIQUOTA_INSS
  
  const valorINSS = Math.max(baseCalculo * ALIQUOTA_INSS, minimoContribuicao)
  
  return {
    valorINSS: round(valorINSS),
    aliquota: ALIQUOTA_INSS * 100,
    baseCalculo: round(baseCalculo),
    tetoINSS: TETO_INSS,
    salarioMinimo: SALARIO_MINIMO
  }
}

// Utilitário para calcular IRRF otimizado com busca binária nas faixas
export const calcularIRRF = (valorBruto, dependentes = 0) => {
  // Validações rápidas
  if (!valorBruto || valorBruto <= 0) {
    throw new Error('Valor bruto deve ser maior que zero')
  }
  
  if (dependentes < 0 || dependentes > 20) {
    throw new Error('Número de dependentes inválido')
  }

  const { DEDUCAO_POR_DEPENDENTE, FAIXAS_IRRF } = CONSTANTS
  const deducaoINSS = calcularINSS(valorBruto).valorINSS
  
  // Base de cálculo
  const baseCalculo = valorBruto - deducaoINSS - (dependentes * DEDUCAO_POR_DEPENDENTE)
  
  // Se base de cálculo é negativa ou zero, não há IRRF
  if (baseCalculo <= 0) {
    return {
      valorIRRF: 0,
      aliquota: 0,
      baseCalculo: 0,
      deducaoINSS: round(deducaoINSS),
      deducaoDependentes: round(dependentes * DEDUCAO_POR_DEPENDENTE),
      parcelaADeduzir: 0
    }
  }

  // Encontrar faixa de IRRF de forma otimizada
  const faixa = FAIXAS_IRRF.find(f => baseCalculo <= f.limite)
  const { aliquota, deducao } = faixa
  
  const valorIRRF = Math.max((baseCalculo * aliquota) - deducao, 0)
  
  return {
    valorIRRF: round(valorIRRF),
    aliquota: aliquota * 100,
    baseCalculo: round(baseCalculo),
    deducaoINSS: round(deducaoINSS),
    deducaoDependentes: round(dependentes * DEDUCAO_POR_DEPENDENTE),
    parcelaADeduzir: round(deducao)
  }
}

// Utilitário para calcular ISS otimizado
export const calcularISS = (valorBruto, aliquotaISS = 5) => {
  // Validações rápidas
  if (!valorBruto || valorBruto <= 0) {
    throw new Error('Valor bruto deve ser maior que zero')
  }
  
  if (aliquotaISS < 0 || aliquotaISS > 100) {
    throw new Error('Alíquota ISS deve estar entre 0% e 100%')
  }

  const aliquota = aliquotaISS / 100
  const valorISS = valorBruto * aliquota
  
  return {
    valorISS: round(valorISS),
    aliquota: aliquotaISS,
    baseCalculo: round(valorBruto)
  }
}

// Cálculo completo de todos os tributos (com cache)
export const calcularTributosTotais = ({
  valorBruto,
  dependentes = 0,
  aliquotaISS = 5,
  incluirISS = true
}) => {
  // Validações iniciais rápidas
  if (!valorBruto || valorBruto <= 0) {
    throw new Error('Valor bruto deve ser maior que zero')
  }

  // Verificar cache primeiro
  const chaveCache = gerarChaveCache(valorBruto, dependentes, aliquotaISS, incluirISS)
  if (calculoCache.has(chaveCache)) {
    return calculoCache.get(chaveCache)
  }

  try {
    const inss = calcularINSS(valorBruto)
    const irrf = calcularIRRF(valorBruto, dependentes)
    const iss = incluirISS ? calcularISS(valorBruto, aliquotaISS) : { valorISS: 0, aliquota: 0 }
    
    const totalTributos = inss.valorINSS + irrf.valorIRRF + iss.valorISS
    const valorLiquido = valorBruto - totalTributos
    const percentualTotal = valorBruto > 0 ? (totalTributos / valorBruto) * 100 : 0
    
    const resultado = {
      valorBruto: round(valorBruto),
      inss,
      irrf,
      iss,
      totalTributos: round(totalTributos),
      valorLiquido: round(valorLiquido),
      percentualTotal: round(percentualTotal)
    }

    // Armazenar no cache
    calculoCache.set(chaveCache, resultado)
    limparCache()
    
    return resultado
  } catch (error) {
    throw new Error(`Erro no cálculo de tributos: ${error.message}`)
  }
}

// Formatação de valores monetários (otimizada)
const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export const formatarMoeda = (valor) => {
  if (typeof valor !== 'number' || isNaN(valor)) return 'R$ 0,00'
  return formatadorMoeda.format(valor)
}

// Formatação de percentual (otimizada)
export const formatarPercentual = (valor) => {
  if (typeof valor !== 'number' || isNaN(valor)) return '0,00%'
  return `${valor.toFixed(2).replace('.', ',')}%`
}

// Calcular valor bruto necessário a partir do líquido desejado
// Usa método iterativo (aproximação) para encontrar o valor bruto
export const calcularBrutoAPartirDoLiquido = ({
  valorLiquido,
  dependentes = 0,
  aliquotaISS = 5,
  incluirISS = true,
  precisao = 0.01,
  maxIteracoes = 100
}) => {
  if (!valorLiquido || valorLiquido <= 0) {
    throw new Error('Valor líquido deve ser maior que zero')
  }

  // Estimativa inicial: adicionar aproximadamente 30% de margem para tributos
  let estimativaBruto = valorLiquido * 1.35
  let melhorBruto = estimativaBruto
  let melhorDiferenca = Infinity

  // Método de aproximação iterativa (Newton-Raphson simplificado)
  for (let i = 0; i < maxIteracoes; i++) {
    try {
      // Calcular com a estimativa atual
      const resultado = calcularTributosTotais({
        valorBruto: estimativaBruto,
        dependentes,
        aliquotaISS,
        incluirISS
      })

      const diferencaLiquido = resultado.valorLiquido - valorLiquido
      const diferencaAbs = Math.abs(diferencaLiquido)

      // Guardar melhor resultado
      if (diferencaAbs < melhorDiferenca) {
        melhorDiferenca = diferencaAbs
        melhorBruto = estimativaBruto
      }

      // Se chegou na precisão desejada, retornar
      if (diferencaAbs <= precisao) {
        return {
          sucesso: true,
          valorBrutoNecessario: round(estimativaBruto),
          valorLiquidoDesejado: round(valorLiquido),
          valorLiquidoReal: resultado.valorLiquido,
          diferencaLiquido: round(diferencaLiquido),
          iteracoes: i + 1,
          resultado: resultado
        }
      }

      // Ajustar estimativa baseado na diferença
      // Se o líquido calculado é menor que o desejado, aumentar bruto
      // Se o líquido calculado é maior que o desejado, diminuir bruto
      const fatorAjuste = 1 + (diferencaLiquido / resultado.valorLiquido)
      estimativaBruto = estimativaBruto * fatorAjuste

      // Garantir que não fique negativo
      if (estimativaBruto <= 0) {
        estimativaBruto = valorLiquido * 1.5
      }

    } catch (error) {
      // Se houver erro, tentar com valor ligeiramente diferente
      estimativaBruto = estimativaBruto * 1.05
    }
  }

  // Se não convergiu, retornar melhor aproximação encontrada
  const resultadoFinal = calcularTributosTotais({
    valorBruto: melhorBruto,
    dependentes,
    aliquotaISS,
    incluirISS
  })

  return {
    sucesso: false,
    aviso: 'Não convergiu completamente, retornando melhor aproximação',
    valorBrutoNecessario: round(melhorBruto),
    valorLiquidoDesejado: round(valorLiquido),
    valorLiquidoReal: resultadoFinal.valorLiquido,
    diferencaLiquido: round(resultadoFinal.valorLiquido - valorLiquido),
    iteracoes: maxIteracoes,
    resultado: resultadoFinal
  }
}

// Validações otimizadas com regex pré-compiladas
const REGEX_NUMERO_POSITIVO = /^[0-9]+(\.[0-9]+)?$/

export const validarValorBruto = (valor) => {
  if (!valor && valor !== 0) {
    return { valido: false, mensagem: 'Valor é obrigatório' }
  }

  const valorNum = typeof valor === 'string' ? parseFloat(valor) : valor
  
  if (isNaN(valorNum) || valorNum <= 0) {
    return { valido: false, mensagem: 'Valor bruto deve ser maior que zero' }
  }
  
  if (valorNum > 1000000) {
    return { valido: false, mensagem: 'Valor bruto muito alto (máximo: R$ 1.000.000)' }
  }
  
  return { valido: true, mensagem: '' }
}

export const validarDependentes = (valor) => {
  const valorNum = typeof valor === 'string' ? parseInt(valor, 10) : valor
  
  if (isNaN(valorNum) || valorNum < 0) {
    return { valido: false, mensagem: 'Número de dependentes deve ser um número positivo' }
  }
  
  if (valorNum > 20) {
    return { valido: false, mensagem: 'Número de dependentes muito alto (máximo: 20)' }
  }
  
  return { valido: true, mensagem: '' }
}

export const validarAliquotaISS = (valor) => {
  const valorNum = typeof valor === 'string' ? parseFloat(valor) : valor
  
  if (isNaN(valorNum) || valorNum < 0 || valorNum > 100) {
    return { valido: false, mensagem: 'Alíquota deve estar entre 0% e 100%' }
  }
  
  return { valido: true, mensagem: '' }
}

export const validarValorLiquido = (valor) => {
  if (!valor && valor !== 0) {
    return { valido: false, mensagem: 'Valor é obrigatório' }
  }

  const valorNum = typeof valor === 'string' ? parseFloat(valor) : valor
  
  if (isNaN(valorNum) || valorNum <= 0) {
    return { valido: false, mensagem: 'Valor líquido deve ser maior que zero' }
  }
  
  if (valorNum > 1000000) {
    return { valido: false, mensagem: 'Valor líquido muito alto (máximo: R$ 1.000.000)' }
  }
  
  return { valido: true, mensagem: '' }
}

// Função utilitária para limpar cache manualmente (útil para testes)
export const limparCacheCalculos = () => {
  calculoCache.clear()
}

// Função para obter estatísticas do cache (útil para debug)
export const obterEstatisticasCache = () => ({
  tamanho: calculoCache.size,
  chaves: Array.from(calculoCache.keys())
})
