# Simulador de Cálculo de Custos de Tributos Trabalhistas

Aplicação web para simulação de cálculos de tributos trabalhistas em contratos de autônomos (contribuintes individuais). Desenvolvida com React 18, Vite, Material-UI e Context API.

## 🚀 Início Rápido

### 1. Clone o repositório

```powershell
git clone https://github.com/booletech/Simulador_tributos_trab.git
cd Simulador_tributos_trab
```

### 2. Instale as dependências

```powershell
npm install
```

### 3. Execute em modo de desenvolvimento

```powershell
npm run dev
```

Abra http://localhost:3000 no navegador.

### 4. Credenciais de Acesso

Para acessar áreas protegidas (ex: `/admin`):

| Perfil | Email | Senha |
|--------|-------|-------|
| **Administrador** | admin@sistema.com | admin123 |
| **Usuário** | usuario@sistema.com | user123 |

📖 Consulte `AUTENTICACAO.md` para mais detalhes sobre autenticação e como adicionar usuários.

### 5. Variáveis de Ambiente (Opcional)

Se necessário, crie `.env.local` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001/api
```

## 📸 Screenshots

### Tela Inicial (Dashboard)
![Home Dashboard](./docs/screenshots/01-home.png)

### Tela Inicial Vazia
![Home Vazia](./docs/screenshots/01-homevazia.png)

### Página de Login
![Login](./docs/screenshots/02-login.png)

### Resultado do Cálculo
![Resultado](./docs/screenshots/04-resultado-calculo.png)

### Lista de Contratos
![Contratos](./docs/screenshots/05-contratos-lista.png)

### Novo Contrato
![Novo Contrato](./docs/screenshots/06-novo-contrato.png)

### Detalhes do Contrato
![Detalhes](./docs/screenshots/07-detalhes-contrato.png)

### Área Administrativa (Rota Privada)
![Admin](./docs/screenshots/08-admin.png)

## 🛠️ Comandos Disponíveis

```powershell
npm run dev       # Inicia servidor de desenvolvimento
npm run build     # Gera build de produção
npm run preview   # Visualiza build de produção
npm run lint      # Executa linter
```

## ✨ Funcionalidades

### Sistema de Autenticação
- Login com credenciais fixas
- Rotas privadas protegidas
- Context API para gerenciamento de sessão
- Persistência no localStorage
- Sincronização entre múltiplas abas

### Cálculos de Tributos
- **INSS:** 20% sobre valor bruto (limitado ao teto)
- **IRRF:** Tabela progressiva com deduções
- **ISS:** Alíquota configurável (varia por município)
- Regras de negócio em `src/utils/tributosCalculos.js`
- Cache LRU para otimização de performance

### CRUD de Contratos
- Criar, editar, visualizar e deletar contratos
- Persistência em `localStorage`
- Validação de formulários em tempo real
- Busca e filtros
- Paginação de resultados

### Hooks Personalizados
- `useForm` - Gerenciamento de formulários com validação
- `useDebounce` - Debouncing para otimização
- `useTributos` - Operações relacionadas a tributos
- `useAuth` - Gerenciamento de autenticação
- `useAsync` - Gerenciamento de requisições assíncronas

### Estado Global
- `TributosContext` - Gerencia contratos e cálculos
- `AuthContext` - Gerencia autenticação e sessão
- Otimizado com `useMemo` e `useCallback`

### Interface
- Material-UI com tema personalizado
- Design responsivo
- Feedback visual consistente
- Navegação intuitiva com React Router v6

## 📚 Documentação

### Guias de Uso
- `AUTENTICACAO.md` - Guia completo de autenticação e configuração
- `GUIA_RAPIDO.md` - Guia rápido de uso da aplicação
- `COMO_ADICIONAR_SCREENSHOTS.md` - Como adicionar prints no README

### Documentação Técnica
- `PERFORMANCE.md` - Guia de otimizações e performance
- `CONTRIBUTING.md` - Guia de desenvolvimento e contribuição
- `docs/COMPLIANCE_REPORT.md` - Relatório de conformidade acadêmica (100%)
- `.github/copilot-instructions.md` - Guia de desenvolvimento do projeto

### Relatórios Acadêmicos
- `docs/ACADEMIC_REPORT.md` - Relatório acadêmico completo
- `docs/PROJECT_OVERVIEW.md` - Visão geral do projeto
- `docs/REQUIREMENTS_CHECK.md` - Verificação de requisitos

## 📁 Estrutura do Projeto

```
Simulador_tributos_trab/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── FormularioContrato/
│   │   ├── ListaContratos/
│   │   ├── DetalhesContrato/
│   │   ├── TabelaCalculos/
│   │   ├── Layout/
│   │   └── PrivateRoute/
│   ├── pages/               # Páginas/Rotas
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Admin.jsx
│   │   ├── Calcular.jsx
│   │   ├── Contratos.jsx
│   │   ├── ContratoForm.jsx
│   │   └── ContratoDetalhes.jsx
│   ├── context/             # Context API
│   │   ├── TributosContext.jsx
│   │   └── AuthContext.jsx
│   ├── hooks/               # Hooks personalizados
│   │   ├── useForm.js
│   │   ├── useDebounce.js
│   │   ├── useTributos.js
│   │   ├── useAuth.js
│   │   └── useAsync.js
│   ├── services/            # Camada de API
│   │   ├── api.js
│   │   └── contratosService.js
│   ├── utils/               # Utilitários e lógica de negócio
│   │   ├── tributosCalculos.js
│   │   └── helpers.js
│   ├── theme.js             # Tema Material-UI
│   ├── routes.jsx           # Configuração de rotas
│   ├── App.jsx              # Componente raiz
│   └── main.jsx             # Entry point
├── docs/                    # Documentação e relatórios
├── .github/                 # Configurações do GitHub
└── vite.config.js           # Configuração do Vite
```

## 🔧 Tecnologias Utilizadas

- **React 18.2** - Biblioteca UI
- **Vite 5.0** - Build tool e dev server
- **Material-UI 5.14** - Biblioteca de componentes
- **React Router 6.20** - Roteamento
- **Axios 1.6** - Cliente HTTP
- **Context API** - Gerenciamento de estado
- **localStorage** - Persistência de dados

## ⚙️ Configurações Importantes

### Modo Atual
A aplicação roda com dados mock no `localStorage`. Para integrar com uma API real:

1. Configure `VITE_API_URL` no arquivo `.env.local`
2. O serviço `contratosService.js` já está preparado
3. Veja `src/services/api.js` para configurações de interceptors

### Cache de Cálculos
Os cálculos são otimizados com cache LRU (max 100 entradas) em `src/utils/tributosCalculos.js`.

### Build de Produção
O build é otimizado com:
- Code splitting (3 chunks de vendors)
- Remoção de console.log
- Minificação e compressão

## 🎯 Características Técnicas

### Performance
- Memoização com `useMemo` e `useCallback`
- Cache LRU para cálculos
- Debouncing para inputs
- Code splitting por vendor
- Lazy initialization de estado

### Padrões de Código
- Arrow functions em todas as funções
- Destructuring de props e objetos
- Spread/rest operators para imutabilidade
- Template literals para strings
- Módulos ES6 com imports/exports

### Validações
- Formulários com validação em tempo real
- Validação no blur e no submit
- Mensagens de erro personalizadas
- CPF e email com validação específica

### Autenticação
- Login com credenciais fixas
- Rotas privadas com `PrivateRoute`
- Token JWT simulado
- Persistência de sessão
- Logout funcional

## 📝 Notas Importantes

- ⚠️ A aplicação está em modo de desenvolvimento com credenciais fixas
- ⚠️ Para produção, implemente autenticação com backend real
- ⚠️ Os dados são armazenados apenas no `localStorage` do navegador
- ⚠️ Não há backend conectado - é uma aplicação frontend standalone

## 🤝 Contribuindo

Consulte `CONTRIBUTING.md` para diretrizes de desenvolvimento e padrões do projeto.

## 📄 Licença

Este é um projeto acadêmico desenvolvido para o curso de Desenvolvimento de Aplicações Interativas com React do Instituto Infnet.

---

**Desenvolvido com ❤️ usando React + Vite + Material-UI**

**Última atualização:** 09 de Novembro de 2025
