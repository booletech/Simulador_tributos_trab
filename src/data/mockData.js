/**
 * Dados mockados para testes
 * Use este arquivo para popular a aplicação com dados de exemplo
 */

export const contratosMock = [
  {
    id: '1',
    nomeAutonomo: 'João Silva Santos',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Flores, 123 - São Paulo/SP',
    valorBruto: 5000.00,
    dependentes: 2,
    aliquotaISS: 5,
    incluirISS: true,
    descricaoServico: 'Desenvolvimento de aplicação web personalizada',
    observacoes: 'Projeto de médio porte com prazo de 3 meses',
    dataCriacao: '2024-01-15T10:30:00.000Z',
    dataAtualizacao: '2024-01-15T10:30:00.000Z',
    valorLiquido: 3891.27,
    totalTributos: 1108.73,
    percentualTributos: 22.17,
  },
  {
    id: '2',
    nomeAutonomo: 'Maria Oliveira Costa',
    cpf: '987.654.321-00',
    email: 'maria.oliveira@email.com',
    telefone: '(21) 97654-3210',
    endereco: 'Av. Atlântica, 456 - Rio de Janeiro/RJ',
    valorBruto: 8000.00,
    dependentes: 1,
    aliquotaISS: 3,
    incluirISS: true,
    descricaoServico: 'Consultoria em estratégia digital',
    observacoes: 'Contrato de consultoria mensal',
    dataCriacao: '2024-02-01T14:20:00.000Z',
    dataAtualizacao: '2024-02-01T14:20:00.000Z',
    valorLiquido: 5913.35,
    totalTributos: 2086.65,
    percentualTributos: 26.08,
  },
  {
    id: '3',
    nomeAutonomo: 'Pedro Henrique Alves',
    cpf: '456.789.123-00',
    email: 'pedro.alves@email.com',
    telefone: '(31) 96543-2109',
    endereco: 'Rua da Bahia, 789 - Belo Horizonte/MG',
    valorBruto: 3500.00,
    dependentes: 0,
    aliquotaISS: 5,
    incluirISS: true,
    descricaoServico: 'Design gráfico e identidade visual',
    observacoes: 'Projeto pontual de branding',
    dataCriacao: '2024-02-10T09:15:00.000Z',
    dataAtualizacao: '2024-02-10T09:15:00.000Z',
    valorLiquido: 2752.75,
    totalTributos: 747.25,
    percentualTributos: 21.35,
  },
  {
    id: '4',
    nomeAutonomo: 'Ana Paula Rodrigues',
    cpf: '321.654.987-00',
    email: 'ana.rodrigues@email.com',
    telefone: '(41) 95432-1098',
    endereco: 'Rua XV de Novembro, 321 - Curitiba/PR',
    valorBruto: 12000.00,
    dependentes: 3,
    aliquotaISS: 4,
    incluirISS: true,
    descricaoServico: 'Arquitetura de software e mentoria técnica',
    observacoes: 'Contrato de 6 meses com possibilidade de renovação',
    dataCriacao: '2024-03-05T16:45:00.000Z',
    dataAtualizacao: '2024-03-05T16:45:00.000Z',
    valorLiquido: 8668.27,
    totalTributos: 3331.73,
    percentualTributos: 27.76,
  },
  {
    id: '5',
    nomeAutonomo: 'Carlos Eduardo Ferreira',
    cpf: '159.753.486-00',
    email: 'carlos.ferreira@email.com',
    telefone: '(51) 94321-0987',
    endereco: 'Av. Ipiranga, 654 - Porto Alegre/RS',
    valorBruto: 2500.00,
    dependentes: 0,
    aliquotaISS: 2,
    incluirISS: false,
    descricaoServico: 'Redação publicitária e copywriting',
    observacoes: 'Trabalho freelance recorrente',
    dataCriacao: '2024-03-20T11:00:00.000Z',
    dataAtualizacao: '2024-03-20T11:00:00.000Z',
    valorLiquido: 2000.00,
    totalTributos: 500.00,
    percentualTributos: 20.00,
  },
]

/**
 * Função para popular localStorage com dados mockados
 */
export const popularDadosMock = () => {
  localStorage.setItem('contratos', JSON.stringify(contratosMock))
  console.log('Dados mockados populados com sucesso!')
}

/**
 * Função para limpar dados do localStorage
 */
export const limparDados = () => {
  localStorage.removeItem('contratos')
  localStorage.removeItem('calculosRecentes')
  console.log('Dados limpos com sucesso!')
}

export default contratosMock
