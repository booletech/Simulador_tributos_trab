# Simulador de Cálculo de Custos de Tributos Trabalhistas

Aplicação web moderna para simulação de cálculo de tributos trabalhistas em contratos de autônomos (contribuintes individuais), desenvolvida com React e seguindo as melhores práticas de desenvolvimento.

## 📋 Características

- ✅ Cálculo automático de **INSS**, **IRRF** e **ISS**
- ✅ CRUD completo de contratos de autônomos
- ✅ Interface moderna e responsiva com Material UI
- ✅ Gerenciamento de estado global com Context API
- ✅ Hooks personalizados para lógica reutilizável
- ✅ Navegação com React Router
- ✅ Persistência local com LocalStorage
- ✅ Validação de formulários
- ✅ Feedback visual com Snackbars e Alerts

## 🚀 Tecnologias Utilizadas

### Core
- **React 18.2** - Biblioteca para construção de interfaces
- **Vite 5.0** - Build tool e dev server
- **React Router 6.20** - Navegação entre páginas

### UI/UX
- **Material UI 5.14** - Componentes de interface
- **@mui/icons-material** - Ícones
- **@emotion/react & @emotion/styled** - Estilização

### HTTP & APIs
- **Axios 1.6** - Cliente HTTP para requisições

### JavaScript Moderno
- Arrow Functions
- Destructuring
- Spread/Rest Operators
- Template Literals
- Módulos ES6
- Async/Await
- Promises

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Passo a Passo

1. **Clone ou acesse o projeto**
```bash
cd "c:\Users\jl-td\Desktop\Arquivos do JULIO\Acadêmico\PÓS GRADUAÇÃO\Infnet - ENG.SOFT\3- Desenvolvimento de Aplicações Interativas com React\novo projeto\Projeto infnet"
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente (opcional)**
```bash
cp .env.example .env.local
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
Projeto infnet/
├── src/
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── FormularioContrato/
│   │   ├── ListaContratos/
│   │   ├── DetalhesContrato/
│   │   ├── TabelaCalculos/
│   │   └── Layout/
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Calcular.jsx
│   │   ├── Contratos.jsx
│   │   ├── ContratoForm.jsx
│   │   └── ContratoDetalhes.jsx
│   ├── context/            # Context API para estado global
│   │   └── TributosContext.jsx
│   ├── hooks/              # Hooks personalizados
│   │   ├── useForm.js
│   │   ├── useTributos.js
│   │   ├── useAsync.js
│   │   └── useDebounce.js
│   ├── services/           # Serviços de API
│   │   ├── api.js
│   │   └── contratosService.js
│   ├── utils/              # Utilitários e helpers
│   │   ├── tributosCalculos.js
│   │   └── helpers.js
│   ├── routes.jsx          # Configuração de rotas
│   ├── theme.js            # Tema Material UI
│   ├── App.jsx             # Componente raiz
│   └── main.jsx            # Ponto de entrada
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 💡 Funcionalidades Principais

### 1. Cálculo de Tributos
- Calcula INSS (20% sobre valor bruto, limitado ao teto)
- Calcula IRRF (tabela progressiva 2024 com deduções)
- Calcula ISS (alíquota configurável por município)
- Exibe valor líquido a receber

### 2. Gerenciamento de Contratos (CRUD)
- **Create**: Cadastrar novos contratos
- **Read**: Visualizar lista e detalhes
- **Update**: Editar contratos existentes
- **Delete**: Remover contratos com confirmação

### 3. Interface Interativa
- Dashboard com estatísticas
- Busca e filtros em tempo real
- Paginação de listas
- Validação de formulários
- Feedback visual de ações

## 🎯 Conceitos Aplicados

### I. JavaScript Moderno & React

**Arrow Functions**
```javascript
const handleSubmit = (e) => {
  e.preventDefault()
  // ...
}
```

**Destructuring**
```javascript
const { valorBruto, dependentes, aliquotaISS } = dadosContrato
```

**Spread/Rest Operators**
```javascript
const dadosCompletos = { ...dadosContrato, valorLiquido }
```

**Template Literals**
```javascript
const mensagem = `Contrato ${isEdicao ? 'atualizado' : 'criado'} com sucesso!`
```

**Módulos ES6**
```javascript
import { calcularTributosTotais } from '../utils/tributosCalculos'
export default FormularioContrato
```

### II. Gerenciamento de Estado & Reatividade

**useState para estado local**
```javascript
const [contratos, setContratos] = useState([])
```

**useEffect para efeitos colaterais**
```javascript
useEffect(() => {
  localStorage.setItem('contratos', JSON.stringify(contratos))
}, [contratos])
```

**Context API para estado global**
```javascript
const { contratos, criarContrato } = useTributosContext()
```

**Hooks Personalizados**
```javascript
const { valores, erros, handleChange } = useForm(valoresIniciais, validacoes)
```

**Renderização Condicional**
```javascript
{resultado && <TabelaCalculos calculo={resultado} />}
```

### III. APIs & Navegação

**Axios com Interceptors**
```javascript
api.interceptors.response.use(
  response => response,
  error => handleError(error)
)
```

**AbortController**
```javascript
const abortController = new AbortController()
await api.get('/contratos', { signal: abortController.signal })
```

**React Router**
```javascript
<Route path="contratos/:id" element={<ContratoDetalhes />} />
```

**Navegação Programática**
```javascript
const navigate = useNavigate()
navigate('/contratos')
```

## 📊 Cálculos de Tributos

### INSS - Contribuinte Individual
- **Alíquota**: 20%
- **Base de cálculo**: Limitada ao teto do INSS (R$ 7.786,02 em 2024)
- **Valor mínimo**: Sobre o salário mínimo (R$ 1.412,00 em 2024)

### IRRF - Tabela Progressiva 2024
| Base de Cálculo | Alíquota | Parcela a Deduzir |
|----------------|----------|-------------------|
| Até R$ 2.112,00 | Isento | - |
| R$ 2.112,01 a R$ 2.826,65 | 7,5% | R$ 158,40 |
| R$ 2.826,66 a R$ 3.751,05 | 15% | R$ 370,40 |
| R$ 3.751,06 a R$ 4.664,68 | 22,5% | R$ 651,73 |
| Acima de R$ 4.664,68 | 27,5% | R$ 884,96 |

**Deduções:**
- INSS pago
- R$ 189,59 por dependente

### ISS - Imposto Sobre Serviços
- **Alíquota**: Varia de 2% a 5% (configurável)
- **Base de cálculo**: Valor bruto do serviço

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## 🎨 Personalização

### Tema Material UI
Edite `src/theme.js` para personalizar cores, tipografia e componentes.

### Alíquotas
Ajuste as alíquotas em `src/utils/tributosCalculos.js`.

## 📝 Exemplos de Uso

### Criar um novo contrato
1. Acesse "Novo Contrato"
2. Preencha os dados do autônomo
3. Informe valor bruto e dependentes
4. Configure ISS (opcional)
5. Clique em "Salvar"

### Calcular tributos
1. Acesse "Calcular"
2. Preencha os dados
3. Visualize o resultado instantaneamente
4. Veja detalhamento de cada tributo

## 🔐 Segurança

- Validação de CPF
- Validação de e-mail
- Validação de valores numéricos
- Sanitização de inputs
- Proteção contra XSS

## 🌐 Navegação

- `/` - Página inicial com dashboard
- `/calcular` - Simulador de cálculo
- `/contratos` - Lista de contratos
- `/contratos/novo` - Novo contrato
- `/contratos/:id` - Detalhes do contrato
- `/contratos/editar/:id` - Editar contrato

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de Pós-Graduação em Engenharia de Software - Infnet.

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico para a disciplina "Desenvolvimento de Aplicações Interativas com React".

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório do projeto.

---

**Desenvolvido com ❤️ usando React + Vite + Material UI**
