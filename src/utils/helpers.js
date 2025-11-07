// Utilitário para gerar IDs únicos
export const gerarId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Utilitário para formatar data
export const formatarData = (data) => {
  if (!data) return ''
  
  const dataObj = new Date(data)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dataObj)
}

// Utilitário para formatar data e hora
export const formatarDataHora = (data) => {
  if (!data) return ''
  
  const dataObj = new Date(data)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dataObj)
}

// Debounce para otimizar performance em inputs
export const debounce = (func, delay) => {
  let timeoutId
  
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Deep clone de objetos
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// Ordenação de arrays
export const ordenarPor = (array, campo, ordem = 'asc') => {
  return [...array].sort((a, b) => {
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
}

// Filtrar array de objetos
export const filtrarPor = (array, campo, valor) => {
  if (!valor) return array
  
  return array.filter(item => {
    const valorItem = item[campo]?.toString().toLowerCase() || ''
    const valorBusca = valor.toString().toLowerCase()
    
    return valorItem.includes(valorBusca)
  })
}

// Paginar array
export const paginar = (array, pagina, itensPorPagina) => {
  const inicio = (pagina - 1) * itensPorPagina
  const fim = inicio + itensPorPagina
  
  return {
    dados: array.slice(inicio, fim),
    totalPaginas: Math.ceil(array.length / itensPorPagina),
    totalItens: array.length,
    paginaAtual: pagina
  }
}

// Validação de CPF
export const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, '')
  
  if (cpf.length !== 11) return false
  
  if (/^(\d)\1{10}$/.test(cpf)) return false
  
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let digito = 11 - (soma % 11)
  if (digito > 9) digito = 0
  if (digito !== parseInt(cpf.charAt(9))) return false
  
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  digito = 11 - (soma % 11)
  if (digito > 9) digito = 0
  if (digito !== parseInt(cpf.charAt(10))) return false
  
  return true
}

// Formatação de CPF
export const formatarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, '')
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Validação de email
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Capitalizar primeira letra
export const capitalizarPrimeiraLetra = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Capitalizar cada palavra
export const capitalizarPalavras = (str) => {
  if (!str) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map(palavra => capitalizarPrimeiraLetra(palavra))
    .join(' ')
}
