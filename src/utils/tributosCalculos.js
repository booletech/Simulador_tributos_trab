// Utilitário para calcular INSS de autônomos (contribuinte individual)
// Base: Tabela INSS 2024 - Contribuinte Individual

export const calcularINSS = (valorBruto) => {
  const salarioMinimo = 1412.00 // 2024
  const tetoINSS = 7786.02 // 2024
  
  // Alíquota para contribuinte individual: 20%
  const aliquota = 0.20
  
  // Base de cálculo limitada ao teto
  const baseCalculo = Math.min(valorBruto, tetoINSS)
  
  // Valor mínimo de contribuição
  const minimoContribuicao = salarioMinimo * aliquota
  
  const valorINSS = Math.max(baseCalculo * aliquota, minimoContribuicao)
  
  return {
    valorINSS: parseFloat(valorINSS.toFixed(2)),
    aliquota: aliquota * 100,
    baseCalculo: parseFloat(baseCalculo.toFixed(2)),
    tetoINSS,
    salarioMinimo
  }
}

// Utilitário para calcular IRRF (Imposto de Renda Retido na Fonte)
// Base: Tabela progressiva IRRF 2024

export const calcularIRRF = (valorBruto, dependentes = 0) => {
  const deducaoPorDependente = 189.59 // 2024
  const deducaoINSS = calcularINSS(valorBruto).valorINSS
  
  // Base de cálculo
  const baseCalculo = valorBruto - deducaoINSS - (dependentes * deducaoPorDependente)
  
  let aliquota = 0
  let parcelaADeduzir = 0
  
  // Tabela progressiva IRRF 2024
  if (baseCalculo <= 2112.00) {
    aliquota = 0
    parcelaADeduzir = 0
  } else if (baseCalculo <= 2826.65) {
    aliquota = 0.075
    parcelaADeduzir = 158.40
  } else if (baseCalculo <= 3751.05) {
    aliquota = 0.15
    parcelaADeduzir = 370.40
  } else if (baseCalculo <= 4664.68) {
    aliquota = 0.225
    parcelaADeduzir = 651.73
  } else {
    aliquota = 0.275
    parcelaADeduzir = 884.96
  }
  
  const valorIRRF = Math.max((baseCalculo * aliquota) - parcelaADeduzir, 0)
  
  return {
    valorIRRF: parseFloat(valorIRRF.toFixed(2)),
    aliquota: aliquota * 100,
    baseCalculo: parseFloat(baseCalculo.toFixed(2)),
    deducaoINSS: parseFloat(deducaoINSS.toFixed(2)),
    deducaoDependentes: parseFloat((dependentes * deducaoPorDependente).toFixed(2)),
    parcelaADeduzir: parseFloat(parcelaADeduzir.toFixed(2))
  }
}

// Utilitário para calcular ISS (Imposto Sobre Serviços)
// Alíquota varia por município, usando média de 5%

export const calcularISS = (valorBruto, aliquotaISS = 5) => {
  const aliquota = aliquotaISS / 100
  const valorISS = valorBruto * aliquota
  
  return {
    valorISS: parseFloat(valorISS.toFixed(2)),
    aliquota: aliquotaISS,
    baseCalculo: parseFloat(valorBruto.toFixed(2))
  }
}

// Cálculo completo de todos os tributos

export const calcularTributosTotais = ({
  valorBruto,
  dependentes = 0,
  aliquotaISS = 5,
  incluirISS = true
}) => {
  const inss = calcularINSS(valorBruto)
  const irrf = calcularIRRF(valorBruto, dependentes)
  const iss = incluirISS ? calcularISS(valorBruto, aliquotaISS) : { valorISS: 0, aliquota: 0 }
  
  const totalTributos = inss.valorINSS + irrf.valorIRRF + iss.valorISS
  const valorLiquido = valorBruto - totalTributos
  const percentualTotal = (totalTributos / valorBruto) * 100
  
  return {
    valorBruto: parseFloat(valorBruto.toFixed(2)),
    inss,
    irrf,
    iss,
    totalTributos: parseFloat(totalTributos.toFixed(2)),
    valorLiquido: parseFloat(valorLiquido.toFixed(2)),
    percentualTotal: parseFloat(percentualTotal.toFixed(2))
  }
}

// Formatação de valores monetários

export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

// Formatação de percentual

export const formatarPercentual = (valor) => {
  return `${valor.toFixed(2)}%`
}

// Validação de valores

export const validarValorBruto = (valor) => {
  const valorNum = parseFloat(valor)
  
  if (isNaN(valorNum) || valorNum <= 0) {
    return { valido: false, mensagem: 'Valor bruto deve ser maior que zero' }
  }
  
  if (valorNum > 1000000) {
    return { valido: false, mensagem: 'Valor bruto muito alto' }
  }
  
  return { valido: true, mensagem: '' }
}

export const validarDependentes = (valor) => {
  const valorNum = parseInt(valor)
  
  if (isNaN(valorNum) || valorNum < 0) {
    return { valido: false, mensagem: 'Número de dependentes inválido' }
  }
  
  if (valorNum > 10) {
    return { valido: false, mensagem: 'Número de dependentes muito alto' }
  }
  
  return { valido: true, mensagem: '' }
}

export const validarAliquotaISS = (valor) => {
  const valorNum = parseFloat(valor)
  
  if (isNaN(valorNum) || valorNum < 0 || valorNum > 100) {
    return { valido: false, mensagem: 'Alíquota deve estar entre 0% e 100%' }
  }
  
  return { valido: true, mensagem: '' }
}
