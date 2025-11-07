# 📊 RELATÓRIO DO PROJETO

## Simulador de Cálculo de Custos de Tributos Trabalhistas

---

## 📌 Título do Projeto

**Simulador de Cálculo de Custos de Tributos Trabalhistas para Contratos de Autônomos**

Sistema web interativo desenvolvido com React para cálculo automatizado de tributos trabalhistas (INSS, IRRF e ISS) em contratos de prestação de serviços autônomos, com funcionalidades completas de CRUD para gerenciamento de contratos.

---

## 🎯 Objetivo do Projeto

### Problema Identificado
Profissionais autônomos e empresas que contratam prestadores de serviços frequentemente enfrentam dificuldades para:
- Calcular corretamente os tributos incidentes sobre contratos de trabalho autônomo
- Compreender o impacto tributário no valor líquido a receber
- Gerenciar múltiplos contratos e seus respectivos cálculos
- Manter histórico organizado de simulações e contratos

### Solução Proposta
Aplicação web completa que:
- ✅ **Calcula automaticamente** INSS, IRRF e ISS com base nas tabelas oficiais de 2024
- ✅ **Gerencia contratos** com CRUD completo e persistência de dados
- ✅ **Fornece visibilidade** clara do valor bruto vs. líquido
- ✅ **Detalha cada tributo** com alíquotas e bases de cálculo
- ✅ **Permite simulações** rápidas sem necessidade de salvar
- ✅ **Organiza informações** em dashboard com estatísticas consolidadas

### Público-Alvo
- Profissionais autônomos (contribuintes individuais)
- Departamentos de RH e contabilidade
- Escritórios de contabilidade
- Consultores tributários
- Estudantes de administração e contabilidade

---

## 🚀 Features Implementadas

### Feature 1: Calculadora de Tributos Instantânea
**Descrição:** Sistema de cálculo em tempo real de tributos trabalhistas.

**Funcionalidades:**
- Cálculo de INSS (20% sobre valor bruto, limitado ao teto de R$ 7.786,02)
- Cálculo de IRRF baseado na tabela progressiva 2024
- Cálculo de ISS com alíquota configurável (varia por município)
- Consideração de dependentes para dedução no IRRF
- Exibição detalhada de cada tributo com base de cálculo e alíquota
- Visualização do valor líquido a receber
- Percentual total de tributação sobre o valor bruto

**Tecnologias:** React Hooks (useState), JavaScript ES6+, Material UI

---

### Feature 2: CRUD Completo de Contratos
**Descrição:** Sistema de gerenciamento de contratos de autônomos.

**Funcionalidades:**

#### CREATE (Criar)
- Formulário completo com validação de dados
- Validação de CPF em tempo real
- Validação de e-mail
- Cálculo automático de tributos ao salvar
- Feedback visual de sucesso/erro

#### READ (Listar/Visualizar)
- Listagem paginada de contratos (5, 10, 25 ou 50 por página)
- Busca em tempo real por nome, CPF ou e-mail
- Visualização detalhada de cada contrato
- Exibição de cálculos tributários completos

#### UPDATE (Editar)
- Edição de contratos existentes
- Recálculo automático de tributos
- Manutenção do histórico de datas

#### DELETE (Deletar)
- Exclusão com confirmação
- Dialog modal para evitar exclusões acidentais
- Feedback visual da operação

**Tecnologias:** React Context API, Hooks personalizados (useForm, useTributos), LocalStorage, Material UI

---

### Feature 3: Dashboard e Estatísticas
**Descrição:** Painel principal com visão consolidada dos dados.

**Funcionalidades:**
- Total de contratos cadastrados
- Soma de valores brutos de todos os contratos
- Soma de valores líquidos
- Total de tributos pagos
- Cards interativos com ações rápidas
- Gradientes visuais para cada métrica

**Tecnologias:** React Hooks (useMemo, useCallback), Material UI, JavaScript

---

### Feature 4: Sistema de Navegação
**Descrição:** Navegação fluida entre páginas da aplicação.

**Funcionalidades:**
- Roteamento com React Router v6
- 6 rotas configuradas (Home, Calcular, Contratos, Novo, Editar, Detalhes)
- Navegação programática
- Parâmetros dinâmicos na URL
- Navbar responsivo com indicação de rota ativa
- Redirecionamento automático para página inicial em rotas inválidas

**Tecnologias:** React Router DOM v6, React Navigation Hooks

---

### Feature 5: Gerenciamento de Estado Global
**Descrição:** Context API para compartilhar estado entre componentes.

**Funcionalidades:**
- TributosContext com estado global de contratos
- Operações CRUD centralizadas
- Persistência automática no LocalStorage
- Histórico de cálculos recentes (últimos 20)
- Estado de loading e erro
- Custom hook (useTributosContext) para acesso ao contexto

**Tecnologias:** React Context API, LocalStorage API, Custom Hooks

---

### Feature 6: Hooks Personalizados
**Descrição:** 4 hooks customizados para reutilização de lógica.

#### useForm
- Gerenciamento de estado de formulários
- Validação em tempo real
- Controle de campos tocados
- Reset e atualização de valores

#### useTributos
- Abstração da lógica de negócio
- Cálculos de tributos
- Filtros e ordenação de contratos
- Estatísticas consolidadas

#### useAsync
- Gerenciamento de operações assíncronas
- Estados de loading, success, error
- AbortController integrado
- Cancelamento automático de requisições

#### useDebounce
- Otimização de performance em buscas
- Delay configurável (padrão 500ms)
- Redução de re-renderizações

**Tecnologias:** React Hooks API, JavaScript ES6+

---

### Feature 7: Validações e Feedback
**Descrição:** Sistema robusto de validação e feedback ao usuário.

**Funcionalidades:**
- Validação de CPF com algoritmo verificador
- Validação de e-mail com regex
- Validação de valores numéricos (ranges)
- Feedback visual com cores (erro/sucesso/warning)
- Snackbars para notificações temporárias
- Mensagens de erro contextualizadas
- Helper text em campos de formulário

**Tecnologias:** Material UI (TextField, Snackbar, Alert), JavaScript

---

### Feature 8: Integração com API (Preparada)
**Descrição:** Camada de serviços pronta para integração com backend.

**Funcionalidades:**
- Axios configurado com instância customizada
- Interceptors de request (adiciona token de autenticação)
- Interceptors de response (tratamento global de erros)
- Métodos CRUD completos (GET, POST, PUT, DELETE)
- AbortController para cancelamento de requisições
- Promise.race para timeout customizado
- Tratamento de race conditions
- Fallback para LocalStorage quando API não disponível

**Tecnologias:** Axios, AbortController, Promises, async/await

---

### Feature 9: UI/UX Moderna e Responsiva
**Descrição:** Interface intuitiva com Material Design.

**Funcionalidades:**
- Tema customizado do Material UI
- Paleta de cores profissional
- Componentes responsivos (mobile-first)
- Ícones Material para ações
- Cards com elevação e sombras
- Gradientes em elementos de destaque
- Tabelas com hover effects
- Paginação integrada
- Loading states visuais
- Animações suaves

**Tecnologias:** Material UI v5, @emotion/react, CSS-in-JS

---

### Feature 10: Persistência de Dados
**Descrição:** Armazenamento local dos dados do usuário.

**Funcionalidades:**
- Salvamento automático no LocalStorage
- Carregamento na inicialização
- Sincronização bidirecional
- Dados persistem após fechar navegador
- Histórico de cálculos (últimos 20)
- Funções de limpeza de dados

**Tecnologias:** LocalStorage API, React useEffect

---

## 💻 Tecnologias Utilizadas

### Core Technologies
| Tecnologia | Versão | Finalidade |
|-----------|--------|------------|
| **React** | 18.2.0 | Biblioteca principal para construção da UI |
| **Vite** | 5.0.8 | Build tool e dev server (mais rápido que CRA) |
| **React Router** | 6.20.0 | Navegação e roteamento SPA |
| **Axios** | 1.6.2 | Cliente HTTP para requisições |

### UI/UX Libraries
| Tecnologia | Versão | Finalidade |
|-----------|--------|------------|
| **Material UI** | 5.14.19 | Biblioteca de componentes UI |
| **@mui/icons-material** | 5.14.19 | Ícones Material Design |
| **@emotion/react** | 11.11.1 | CSS-in-JS (required by MUI) |
| **@emotion/styled** | 11.11.0 | Styled components |

### JavaScript Moderno (ES6+)
- **Arrow Functions** - Sintaxe concisa em todas as funções
- **Destructuring** - Extração de propriedades de objetos/arrays
- **Spread/Rest Operators** - Manipulação imutável de dados
- **Template Literals** - Strings dinâmicas
- **Módulos ES6** - Import/export de componentes
- **Async/Await** - Operações assíncronas
- **Promises** - Tratamento de operações assíncronas
- **Optional Chaining** - Acesso seguro a propriedades aninhadas

### React Features Utilizadas
- **Hooks:**
  - useState (estado local)
  - useEffect (efeitos colaterais)
  - useContext (acesso ao contexto)
  - useCallback (memoização de funções)
  - useMemo (memoização de valores)
  - useParams (parâmetros de URL)
  - useNavigate (navegação programática)
  - useLocation (localização atual)

- **Patterns:**
  - Context API (estado global)
  - Custom Hooks (lógica reutilizável)
  - Controlled Components (formulários)
  - Conditional Rendering (renderização condicional)
  - Composition (composição de componentes)

### Ferramentas de Desenvolvimento
| Ferramenta | Finalidade |
|-----------|------------|
| **ESLint** | Linting de código JavaScript |
| **Vite** | Hot Module Replacement (HMR) |
| **npm** | Gerenciador de pacotes |

### Browser APIs
- **LocalStorage** - Persistência de dados
- **AbortController** - Cancelamento de requisições
- **Intl.NumberFormat** - Formatação de moeda
- **Intl.DateTimeFormat** - Formatação de datas

---

## 📦 Instruções de Execução

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 16.x ou superior ([Download](https://nodejs.org))
- **npm** versão 7.x ou superior (vem com Node.js)
- **Git** (opcional, para clonar repositório)

Para verificar se está instalado:
```powershell
node --version
npm --version
```

---

### Passo 1: Obter o Código

#### Opção A: Clonar do GitHub (quando disponível)
```powershell
git clone https://github.com/[seu-usuario]/simulador-tributos-trabalhistas.git
cd simulador-tributos-trabalhistas
```

#### Opção B: Usar pasta existente
```powershell
cd "c:\Users\jl-td\Desktop\Arquivos do JULIO\Acadêmico\PÓS GRADUAÇÃO\Infnet - ENG.SOFT\3- Desenvolvimento de Aplicações Interativas com React\novo projeto\Projeto infnet"
```

---

### Passo 2: Instalar Dependências

Execute o comando para instalar todas as dependências do projeto:

```powershell
npm install
```

**Tempo estimado:** 2-3 minutos (dependendo da conexão)

**O que será instalado:**
- React e React DOM
- React Router DOM
- Material UI e dependências
- Axios
- Vite e plugins
- ESLint e configurações

---

### Passo 3: Configurar Variáveis de Ambiente (Opcional)

Se desejar usar uma API backend:

1. Copie o arquivo de exemplo:
```powershell
Copy-Item .env.example .env.local
```

2. Edite `.env.local` e configure a URL da API:
```
VITE_API_URL=http://localhost:3001/api
```

**Nota:** Por padrão, a aplicação usa LocalStorage e não requer backend.

---

### Passo 4: Executar a Aplicação

Inicie o servidor de desenvolvimento:

```powershell
npm run dev
```

**Saída esperada:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

---

### Passo 5: Acessar no Navegador

Abra seu navegador e acesse:
```
http://localhost:3000
```

A aplicação abrirá automaticamente (se configurado).

---

### Comandos Adicionais

#### Build para Produção
Gera versão otimizada para deploy:
```powershell
npm run build
```
Os arquivos serão gerados na pasta `dist/`

#### Preview do Build
Visualiza o build de produção localmente:
```powershell
npm run preview
```

#### Executar Linting
Verifica erros de código:
```powershell
npm run lint
```

#### Limpar Cache (se houver problemas)
```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

---

### Estrutura de Pastas

Após instalação, você terá:

```
Projeto infnet/
├── node_modules/           # Dependências (não commitar)
├── public/                 # Arquivos públicos
├── src/                    # Código fonte
│   ├── components/         # Componentes React
│   ├── pages/             # Páginas
│   ├── context/           # Context API
│   ├── hooks/             # Hooks personalizados
│   ├── services/          # Serviços de API
│   ├── utils/             # Utilitários
│   ├── data/              # Dados mockados
│   ├── App.jsx            # Componente raiz
│   ├── main.jsx           # Entry point
│   ├── routes.jsx         # Configuração de rotas
│   └── theme.js           # Tema MUI
├── .env.example           # Exemplo de variáveis
├── package.json           # Dependências
├── vite.config.js         # Configuração Vite
└── README.md              # Documentação
```

---

### Solução de Problemas Comuns

#### Erro: "npm não é reconhecido"
**Solução:** Instale o Node.js de https://nodejs.org

#### Erro: Porta 3000 ocupada
**Solução:** Vite tentará usar porta 3001 automaticamente, ou encerre o processo que usa a porta 3000

#### Erro ao instalar dependências
**Solução:** Execute como administrador ou use:
```powershell
npm install --legacy-peer-deps
```

#### Página em branco
**Solução:** 
1. Limpe cache do navegador (Ctrl + Shift + Del)
2. Verifique console do navegador (F12)
3. Recarregue com Ctrl + F5

#### Dados não salvam
**Solução:** Verifique se LocalStorage está habilitado no navegador

---

### Populando com Dados de Teste

Para facilitar testes, você pode popular a aplicação com dados de exemplo:

1. Abra o Console do navegador (F12)
2. Execute no console:
```javascript
// Popular com dados de teste
localStorage.setItem('contratos', JSON.stringify([
  {
    id: '1',
    nomeAutonomo: 'João Silva Santos',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    valorBruto: 5000,
    dependentes: 2,
    aliquotaISS: 5,
    incluirISS: true,
    dataCriacao: new Date().toISOString()
  }
]));
```
3. Recarregue a página (F5)

---

## 🔗 Link do Repositório GitHub

### Repositório Principal
**URL:** `[A ser disponibilizado após push]`

```
https://github.com/[seu-usuario]/simulador-tributos-trabalhistas
```

### Estrutura do Repositório

- **Branch:** `main` (produção)
- **Branch:** `develop` (desenvolvimento)
- **Commits:** Seguindo padrão Conventional Commits

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📸 Screenshots ou Demonstração

### 1. Página Inicial (Dashboard)
**Descrição:** Dashboard com estatísticas consolidadas e cards de ação rápida.

**Elementos principais:**
- ✅ 4 cards com métricas (Total de Contratos, Valor Bruto, Tributos, Valor Líquido)
- ✅ Gradientes coloridos para cada métrica
- ✅ 3 cards de ação (Calcular, Novo Contrato, Listar)
- ✅ Card informativo sobre tributos

**Tecnologias demonstradas:** Material UI Cards, Grid System, Typography

---

### 2. Calculadora de Tributos
**Descrição:** Interface de cálculo em tempo real.

**Elementos principais:**
- ✅ Formulário completo à esquerda
- ✅ Resultado detalhado à direita
- ✅ Validação em tempo real
- ✅ Tabela com breakdown de cada tributo

**Tecnologias demonstradas:** React Hooks, Material UI Forms, Real-time Calculations

---

### 3. Lista de Contratos
**Descrição:** Listagem paginada com busca e ações.

**Elementos principais:**
- ✅ Campo de busca com ícone
- ✅ Tabela responsiva
- ✅ Chips coloridos para valores
- ✅ Botões de ação (Ver, Editar, Deletar)
- ✅ Paginação configurável

**Tecnologias demonstradas:** Material UI Table, Pagination, Search, Debounce

---

### 4. Formulário de Contrato
**Descrição:** Criação/edição de contratos.

**Elementos principais:**
- ✅ Seções organizadas (Dados Pessoais, Contrato, Tributos)
- ✅ Validação inline com mensagens de erro
- ✅ Switch para incluir/excluir ISS
- ✅ Campos condicionalmente habilitados

**Tecnologias demonstradas:** Custom Hook (useForm), Controlled Components, Validation

---

### 5. Detalhes do Contrato
**Descrição:** Visualização completa com cálculos.

**Elementos principais:**
- ✅ Cards separados para cada seção
- ✅ Ícones contextuais
- ✅ Tabela de tributos detalhada
- ✅ Botões de ação (Editar, Deletar)

**Tecnologias demonstradas:** React Router Params, Material UI Cards, Data Formatting

---

### 6. Navegação
**Descrição:** Sistema de navegação fluido.

**Elementos principais:**
- ✅ AppBar com logo e menu
- ✅ Indicação visual de rota ativa
- ✅ Navegação responsiva

**Tecnologias demonstradas:** React Router, Material UI AppBar, Navigation Hooks

---

### 7. Feedback Visual
**Descrição:** Notificações e confirmações.

**Elementos principais:**
- ✅ Snackbars para operações (sucesso/erro)
- ✅ Dialogs de confirmação
- ✅ Loading states

**Tecnologias demonstradas:** Material UI Snackbar, Dialog, Conditional Rendering

---

### 📹 Demonstração em Vídeo

**[Link para vídeo demonstrativo - A ser adicionado]**

**Conteúdo do vídeo:**
1. Tour pela aplicação (0:00 - 1:00)
2. Criando um contrato (1:00 - 2:30)
3. Calculando tributos (2:30 - 3:30)
4. Editando e deletando (3:30 - 4:30)
5. Busca e filtros (4:30 - 5:00)

---

## 💭 Considerações Finais

### Reflexões sobre o Processo de Desenvolvimento

#### Planejamento e Arquitetura
O projeto começou com um planejamento detalhado da estrutura de componentes e fluxo de dados. A decisão de usar **Context API** ao invés de Redux mostrou-se acertada, pois simplificou significativamente o código sem perder funcionalidade. A separação clara entre **lógica de negócio** (hooks, context) e **apresentação** (components) facilitou muito a manutenção.

#### Escolha de Tecnologias
A adoção do **Vite** em vez do Create React App foi um diferencial importante. O tempo de build e hot reload é notavelmente mais rápido, melhorando a experiência de desenvolvimento. O **Material UI** acelerou o desenvolvimento da interface, fornecendo componentes prontos e consistentes.

#### Boas Práticas Implementadas
- **Single Responsibility:** Cada componente tem uma responsabilidade clara
- **DRY (Don't Repeat Yourself):** Hooks personalizados eliminaram código duplicado
- **Separation of Concerns:** Lógica separada da apresentação
- **Immutability:** Uso consistente de spread operators
- **Performance:** useMemo e useCallback onde apropriado

---

### Desafios Enfrentados

#### 1. Validação de Formulários
**Desafio:** Criar um sistema de validação robusto que funcionasse em tempo real sem comprometer performance.

**Solução:** Desenvolvimento do hook `useForm` que gerencia estado, validação e feedback de forma centralizada. Uso de `useCallback` para evitar re-renderizações desnecessárias.

**Aprendizado:** A importância de abstrair lógica repetitiva em hooks personalizados. Economizou centenas de linhas de código.

---

#### 2. Cálculo de Tributos com Múltiplas Regras
**Desafio:** Implementar corretamente as regras tributárias (teto do INSS, tabela progressiva do IRRF, deduções).

**Solução:** Separação da lógica de cálculo em funções puras no `tributosCalculos.js`. Cada tributo tem sua função dedicada, facilitando testes e manutenção.

**Aprendizado:** Funções puras são mais fáceis de testar e debugar. A separação de concerns facilita muito a manutenção.

---

#### 3. Gerenciamento de Estado Global
**Desafio:** Compartilhar dados entre múltiplos componentes sem prop drilling.

**Solução:** Implementação do `TributosContext` com Context API. Criação do hook `useTributosContext` para acesso tipado e com validação.

**Aprendizado:** Context API é suficiente para a maioria dos casos. Redux seria overkill para este projeto.

---

#### 4. Persistência de Dados
**Desafio:** Salvar dados localmente de forma confiável e sincronizada.

**Solução:** Uso de `useEffect` com dependências corretas para sincronizar estado com LocalStorage. Tratamento de erros ao ler dados corrompidos.

**Aprendizado:** LocalStorage é síncrono e pode causar problemas de performance em dados grandes. Para escala, seria necessário IndexedDB ou backend.

---

#### 5. Responsividade e UX
**Desafio:** Criar interface que funcione bem em mobile e desktop.

**Solução:** Uso consistente do Grid System do Material UI com breakpoints. Mobile-first approach.

**Aprendizado:** Material UI facilita muito a criação de interfaces responsivas. O sistema de Grid é muito poderoso.

---

#### 6. Otimização de Performance
**Desafio:** Evitar re-renderizações desnecessárias em listas grandes.

**Solução:** Uso de `useMemo` para memoizar listas filtradas e paginadas. `useCallback` para handlers de eventos. `useDebounce` para busca.

**Aprendizado:** Medição é fundamental. Usar React DevTools Profiler para identificar gargalos antes de otimizar.

---

#### 7. Preparação para Integração com API
**Desafio:** Criar arquitetura que funcione tanto com LocalStorage quanto com API.

**Solução:** Camada de serviços (`services/`) que abstrai a fonte de dados. Interceptors do Axios para tratamento global de erros.

**Aprendizado:** Separação de concerns permite trocar implementação sem afetar componentes. Duck typing facilita mocks.

---

### Aprendizados Adquiridos

#### Técnicos

1. **React Hooks são poderosos**
   - Custom hooks permitem reutilização impressionante de lógica
   - useCallback e useMemo devem ser usados com critério
   - useEffect requer atenção especial com arrays de dependências

2. **Context API vs Redux**
   - Context é mais simples e suficiente para apps médios
   - Performance pode ser problema em apps muito grandes
   - Combinação de múltiplos contexts é válida

3. **TypeScript seria benéfico**
   - Proposta de migração futura
   - Evitaria erros de tipos em runtime
   - Melhoraria IntelliSense e DX

4. **Testes automatizados são essenciais**
   - Proposta para próxima iteração
   - Jest + React Testing Library
   - Cobertura mínima de 80%

#### Arquiteturais

1. **Separação de responsabilidades**
   - Components = apresentação
   - Hooks = lógica reutilizável
   - Context = estado global
   - Services = comunicação externa
   - Utils = funções puras

2. **Modularização**
   - Barrel exports facilitam imports
   - Cada módulo deve ser independente
   - Evitar dependências circulares

3. **Performance desde o início**
   - Memoização onde faz sentido
   - Code splitting seria próximo passo
   - Lazy loading de rotas

#### Soft Skills

1. **Documentação é fundamental**
   - README detalhado economiza tempo
   - Comentários em código complexo
   - JSDoc para funções utilitárias

2. **Planejamento evita retrabalho**
   - Esboçar arquitetura antes de codar
   - Prototipar UI antes de implementar
   - Validar regras de negócio cedo

3. **Iteração incremental**
   - Implementar features uma a uma
   - Testar continuamente
   - Refatorar quando necessário

---

### Melhorias Futuras Propostas

#### Curto Prazo
- [ ] Implementar testes unitários (Jest)
- [ ] Adicionar testes de integração (React Testing Library)
- [ ] Melhorar acessibilidade (ARIA labels)
- [ ] Adicionar theme toggle (dark mode)
- [ ] Exportar relatórios em PDF

#### Médio Prazo
- [ ] Migrar para TypeScript
- [ ] Implementar backend com Node.js/Express
- [ ] Adicionar autenticação (JWT)
- [ ] Criar dashboard com gráficos (Chart.js)
- [ ] PWA com service workers

#### Longo Prazo
- [ ] Multi-tenancy (múltiplas empresas)
- [ ] Integração com sistemas de folha de pagamento
- [ ] App mobile com React Native
- [ ] IA para sugestões de otimização tributária
- [ ] Relatórios personalizáveis

---

### Impacto no Aprendizado

Este projeto consolidou conhecimentos em:

✅ **React Moderno** - Hooks, Context, Patterns  
✅ **JavaScript ES6+** - Arrow functions, destructuring, spread/rest  
✅ **Arquitetura de Software** - Separation of concerns, modularização  
✅ **UI/UX** - Material Design, responsividade, feedback visual  
✅ **State Management** - Local state, global state, persistência  
✅ **API Integration** - Axios, interceptors, error handling  
✅ **Routing** - React Router, navegação programática  
✅ **Performance** - Memoization, debouncing, code organization  

---

## 👥 Créditos

### Desenvolvimento
**Júlio** - Desenvolvimento Full Stack  
Estudante de Pós-Graduação em Engenharia de Software - Infnet

### Orientação Acadêmica
**Instituto Infnet** - Disciplina: Desenvolvimento de Aplicações Interativas com React  
**Professor(a):** [Nome do professor]

### Bibliotecas e Frameworks
Agradecimentos especiais aos criadores e mantenedores de:

- **React Team** - Pela biblioteca React
- **Material UI Team** - Pelos componentes UI de alta qualidade
- **Vite Team** - Pela ferramenta de build ultrarrápida
- **Axios Team** - Pelo excelente cliente HTTP
- **React Router Team** - Pela solução de roteamento

### Referências Técnicas

#### Documentação Oficial
- [React Documentation](https://react.dev) - Guia oficial do React
- [Material UI Docs](https://mui.com) - Documentação do Material UI
- [Vite Guide](https://vitejs.dev) - Guia do Vite
- [React Router Docs](https://reactrouter.com) - Documentação do React Router

#### Tabelas Tributárias
- **Receita Federal** - Tabelas de INSS e IRRF 2024
- **Legislação Tributária Brasileira** - Regras de tributação para autônomos

#### Artigos e Tutoriais
- [React Hooks Best Practices](https://react.dev/learn) - Melhores práticas de Hooks
- [Context API Guide](https://react.dev/learn/passing-data-deeply-with-context) - Guia de Context API
- [Material UI Customization](https://mui.com/material-ui/customization/theming/) - Customização de temas

#### Comunidade
- **Stack Overflow** - Resolução de problemas técnicos
- **GitHub Discussions** - Debates sobre arquitetura
- **React Brasil** - Comunidade brasileira de React

### Ferramentas Utilizadas

- **Visual Studio Code** - Editor de código
- **Git** - Controle de versão
- **npm** - Gerenciador de pacotes
- **Chrome DevTools** - Debug e performance
- **React DevTools** - Debug de componentes React
- **Postman** - Testes de API (preparação)

### Inspirações de Design
- **Material Design Guidelines** - Princípios de design do Google
- **Dribbble** - Inspiração de UI/UX
- **Behance** - Referências visuais

---

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de **Pós-Graduação em Engenharia de Software do Instituto Infnet**.

**Uso Acadêmico:** Permitido  
**Uso Comercial:** Requer autorização  
**Modificação:** Permitida para fins de aprendizado  
**Distribuição:** Com atribuição ao autor original  

---

## 📞 Contato

Para dúvidas, sugestões ou colaborações:

**E-mail:** [seu-email]@email.com  
**LinkedIn:** [Seu LinkedIn]  
**GitHub:** [Seu GitHub]  

---

## 🎓 Contexto Acadêmico

**Instituição:** Instituto Infnet  
**Curso:** Pós-Graduação em Engenharia de Software  
**Disciplina:** Desenvolvimento de Aplicações Interativas com React  
**Período:** 2024/2025  
**Objetivo:** Assessment de JavaScript moderno, React e integrações  

---

## ⭐ Agradecimentos

Agradeço ao **Instituto Infnet** pela oportunidade de aprendizado e aos colegas de turma pelas discussões enriquecedoras durante o desenvolvimento deste projeto.

Este trabalho representa não apenas a aplicação de conhecimentos técnicos, mas também o desenvolvimento de habilidades de planejamento, arquitetura e resolução de problemas que são essenciais para um Engenheiro de Software.

---

**Última atualização:** Novembro de 2024  
**Versão:** 1.0.0  
**Status:** ✅ Completo e Funcional

---

*Desenvolvido com ❤️ e muito ☕ por Júlio - Infnet 2024*
