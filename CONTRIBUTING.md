# Contributing Guide

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Git for version control

### Initial Setup

1. **Clone the repository**
```bash
git clone https://github.com/booletech/Simulador_tributos_trab.git
cd Simulador_tributos_trab
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Access the application**
```
http://localhost:3000
```

---

## Available Commands

### Development
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Maintenance
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check versions
node --version
npm --version
```

---

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── FormularioContrato/
│   ├── ListaContratos/
│   ├── DetalhesContrato/
│   ├── TabelaCalculos/
│   └── Layout/
├── pages/              # Page-level components
│   ├── Home.jsx
│   ├── Calcular.jsx
│   ├── Contratos.jsx
│   ├── ContratoForm.jsx
│   └── ContratoDetalhes.jsx
├── context/            # Context API providers
│   └── TributosContext.jsx
├── hooks/              # Custom React hooks
│   ├── useForm.js
│   ├── useTributos.js
│   ├── useAsync.js
│   └── useDebounce.js
├── services/           # API services
│   ├── api.js
│   └── contratosService.js
├── utils/              # Utility functions
│   ├── tributosCalculos.js
│   └── helpers.js
├── data/               # Mock data
│   └── mockData.js
├── routes.jsx          # Route configuration
├── theme.js            # Material-UI theme
├── App.jsx             # Root component
└── main.jsx            # Entry point
```

---

## Development Guidelines

### Code Style

#### Naming Conventions
- **Components**: PascalCase folders with matching `.jsx` file
  ```
  FormularioContrato/FormularioContrato.jsx
  ```
- **Utilities**: camelCase `.js` files
  ```
  tributosCalculos.js
  ```
- **Pages**: PascalCase `.jsx` files
  ```
  Calcular.jsx, ContratoForm.jsx
  ```

#### File Organization
- One component per file
- Keep components small and focused
- Extract reusable logic into custom hooks

### React Patterns

#### Custom Hooks
Always use custom hooks for reusable logic:

```javascript
// ✅ GOOD
const { valores, erros, handleChange } = useForm(inicial, validacoes)

// ❌ BAD - Inline logic
const [valores, setValores] = useState({})
const [erros, setErros] = useState({})
// ... repeated validation logic
```

#### Context Consumer
Always use the custom hook provided:

```javascript
// ✅ GOOD
const { contratos, criarContrato } = useTributosContext()

// ❌ BAD - Direct context access
const context = useContext(TributosContext)
```

#### Form Validation
Use validators from `tributosCalculos.js`:

```javascript
// ✅ GOOD
import { validarValorBruto } from '../utils/tributosCalculos'
const { valido, mensagem } = validarValorBruto(valor)

// ❌ BAD - Inline validation
if (valor <= 0) { /* ... */ }
```

### Performance Guidelines

#### Mandatory Optimizations
1. **Context Value**: Always wrap in `useMemo`
2. **Event Handlers**: Use `useCallback` for props
3. **List Keys**: Use IDs, never array indices
4. **Heavy Calculations**: Check cache first

#### When to Use Memoization
```javascript
// ✅ Use useMemo for expensive calculations
const estatisticas = useMemo(() => {
  return calcularEstatisticas(contratos)
}, [contratos])

// ✅ Use useCallback for event handlers passed as props
const handleDelete = useCallback((id) => {
  deletarContrato(id)
}, [deletarContrato])

// ❌ Don't memoize simple values
const nome = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])
// Just use: const nome = `${firstName} ${lastName}`
```

### Tax Calculation Rules

#### Critical Business Logic
1. **INSS**: 20% on gross value, capped at R$ 7,786.02
2. **IRRF**: Progressive table with INSS + dependents deduction
3. **ISS**: Configurable 0-100% (typically 2-5%)

**Always calculate in sequence:** INSS → IRRF → ISS

#### IRRF Base Calculation
```javascript
// ✅ CORRECT - Subtract INSS first
const baseIRRF = valorBruto - inss - (dependentes * 189.59)

// ❌ WRONG - Don't apply IRRF directly to gross
const baseIRRF = valorBruto - (dependentes * 189.59)
```

---

## Testing

### Manual Testing Checklist

#### Tax Calculations
- [ ] Gross R$ 10,000 → INSS capped at R$ 1,557.20
- [ ] 0 dependents → Higher IRRF (no deductions)
- [ ] ISS 5% → R$ 500 on R$ 10,000 gross

#### CRUD Operations
- [ ] Create contract with all fields
- [ ] Update contract preserves data
- [ ] Delete shows confirmation dialog
- [ ] Search filters list correctly

#### Edge Cases
- [ ] Empty contract list displays message
- [ ] Invalid CPF shows error
- [ ] Form blocks submit when invalid
- [ ] Page refresh preserves data (localStorage)

---

## Common Issues

### "npm not recognized"
**Solution:** Install Node.js from https://nodejs.org

### Port 3000 already in use
**Solution:** Vite will automatically try port 3001

### Dependencies installation fails
**Solution:** Try with legacy peer deps:
```bash
npm install --legacy-peer-deps
```

### Hot reload not working
**Solution:** 
1. Stop the dev server
2. Delete `node_modules/.vite`
3. Restart: `npm run dev`

---

## Git Workflow

### Branching Strategy
```bash
main          # Production-ready code
├── feature/  # New features
├── fix/      # Bug fixes
└── docs/     # Documentation updates
```

### Commit Messages
Follow conventional commits:

```bash
feat: add tax calculation cache
fix: correct IRRF base calculation
docs: update performance guide
refactor: optimize form validation
style: format code with prettier
```

### Before Committing
1. **Run linter**: `npm run lint`
2. **Test manually**: Key user flows
3. **Check console**: No errors or warnings
4. **Review changes**: Git diff

---

## Adding New Features

### 1. Creating a New Page

```javascript
// src/pages/NovaPage.jsx
import { Container, Typography } from '@mui/material'

const NovaPage = () => {
  return (
    <Container>
      <Typography variant="h4">Nova Página</Typography>
    </Container>
  )
}

export default NovaPage
```

Add route in `routes.jsx`:
```javascript
import NovaPage from './pages/NovaPage'

// Inside Routes component
<Route path="nova" element={<NovaPage />} />
```

### 2. Creating a Custom Hook

```javascript
// src/hooks/useNovoHook.js
import { useState, useCallback } from 'react'

const useNovoHook = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  
  const handleChange = useCallback((newValue) => {
    setValue(newValue)
  }, [])
  
  return { value, handleChange }
}

export default useNovoHook
```

Export in `src/hooks/index.js`:
```javascript
export { default as useNovoHook } from './useNovoHook'
```

### 3. Adding a New Component

```javascript
// src/components/NovoComponente/NovoComponente.jsx
import { memo } from 'react'
import { Card, CardContent } from '@mui/material'

const NovoComponente = memo(({ data }) => {
  return (
    <Card>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  )
})

NovoComponente.displayName = 'NovoComponente'

export default NovoComponente
```

Export in `src/components/index.js`:
```javascript
export { default as NovoComponente } from './NovoComponente/NovoComponente'
```

---

## API Integration (Future)

### Current Status
- Mock data mode - uses localStorage
- `contratosService.js` ready but not connected
- Backend endpoints expected at `http://localhost:3001/api`

### Environment Variables
Create `.env.local` for custom API URL:
```
VITE_API_URL=http://localhost:3001/api
```

### Expected Endpoints
```
GET    /contratos           # List all
GET    /contratos/:id       # Get one
POST   /contratos           # Create
PUT    /contratos/:id       # Update
DELETE /contratos/:id       # Delete
GET    /contratos/buscar    # Search
```

---

## Resources

### Documentation
- [React Documentation](https://react.dev)
- [Material-UI Components](https://mui.com/components/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

### Project Docs
- `README.md` - Project overview and setup
- `PERFORMANCE.md` - Performance optimizations
- `.github/copilot-instructions.md` - Development guide
- `docs/` - Academic reports and requirements

---

## Getting Help

### Before Asking
1. Check this guide
2. Review existing code for patterns
3. Check browser console for errors
4. Search issues in the repository

### Reporting Issues
Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser/OS information

---

**Happy Coding!** 🚀
