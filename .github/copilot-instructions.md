# Simulador de Tributos Trabalhistas - Development Guide

## Project Overview
React 18 + Vite application for Brazilian labor tax calculations (INSS, IRRF, ISS) on freelance contracts. Uses Material-UI, Context API for state, and localStorage for persistence. Academic project emphasizing modern JavaScript patterns and performance optimization.

## Architecture & Data Flow

### State Management Pattern
- **Global State**: `TributosContext.jsx` manages contracts CRUD and calculation history
- **Local State**: Custom `useForm` hook for form validation and dirty tracking
- **Persistence**: Auto-save to localStorage with 500ms debounce (see `TributosContext.jsx` line 16-26)
- **Cache Layer**: LRU cache in `tributosCalculos.js` (max 100 entries) for tax calculations

### Component Organization
- `pages/` - Route-level components (Home, Calcular, Contratos, etc.)
- `components/` - Reusable UI (FormularioContrato, ListaContratos, TabelaCalculos)
- `Layout/` - Navigation wrapper with Material-UI AppBar

### Critical Business Logic
**Tax Calculation Flow** (`utils/tributosCalculos.js`):
1. INSS: 20% on gross value, capped at R$ 7,786.02 teto
2. IRRF: Progressive table (7.5%-27.5%) with INSS + dependents deductions
3. ISS: Configurable 0-100% (typically 2-5%)
4. Always calculate in sequence: INSS → IRRF (uses INSS deduction) → ISS

**Cache Key Pattern**: `${valorBruto}:${dependentes}:${aliquotaISS}:${incluirISS}`

## Development Workflows

### Running the App
```bash
npm run dev          # Starts on http://localhost:3000
npm run build        # Production build with code splitting
npm run preview      # Preview production build
```

### Build Optimizations (vite.config.js)
- **Code Splitting**: 3 vendor chunks (react-vendor, mui-vendor, vendor)
- **Console Removal**: All console.log stripped in production
- **Pre-bundling**: React, MUI, axios cached in `.vite/` directory

## Project-Specific Conventions

### Validation Pattern
Use validation functions from `tributosCalculos.js` (lines 222-273):
```javascript
const { valido, mensagem } = validarValorBruto(valor)
```
Never validate inline - always use exported validators for consistent error messages.

### Form Hook Usage
`useForm` returns `isDirty` and `isValid` memoized flags. Always check `isDirty` before enabling submit buttons:
```javascript
const { valores, erros, isDirty, validarTodos } = useForm(inicial, validacoes)
disabled={!isDirty || loading}
```

### Currency Formatting
Use pre-instantiated `Intl.NumberFormat` from `tributosCalculos.js` line 183:
```javascript
formatarMoeda(valor)  // NOT new Intl.NumberFormat() directly
```

### ID Generation
Use `gerarId()` from `helpers.js` (timestamp + random) instead of Date.now() or Math.random() alone.

### Context Consumer Pattern
Always use the custom hook:
```javascript
const { contratos, criarContrato } = useTributosContext()
```
Direct `useContext(TributosContext)` throws error if used outside provider.

## Navigation & Routing

Routes defined in `routes.jsx`:
- `/` - Home dashboard
- `/calcular` - Tax calculator (no persistence)
- `/contratos` - List view with search/pagination
- `/contratos/novo` - Create form
- `/contratos/editar/:id` - Edit form (same component as novo)
- `/contratos/:id` - Details view

**Navigation Pattern**: Use `navigate()` from `react-router-dom`, not `<Link>` for programmatic navigation after form submissions.

## Integration & API Setup

### Axios Configuration (`services/api.js`)
- Base URL from `VITE_API_URL` env var (defaults to localhost:3001)
- Auto-attaches `Bearer` token from localStorage
- 401 responses clear token and redirect to `/login`
- 10s timeout on all requests

**Current Mode**: Mock data mode - `contratosService.js` not yet connected to api.js. Backend endpoints expected but not implemented.

## Material-UI Theme Customization

Theme in `theme.js` with custom defaults:
- Primary color: 0x1976d2 (blue)
- Border radius: 8px buttons, 12px cards
- **Important**: Text transform disabled (`textTransform: 'none'`) - don't override

## Performance Patterns

### Mandatory Optimizations
1. **Context Value**: Always wrap in `useMemo` with full dependency array (see `TributosContext.jsx` line 116)
2. **Callbacks**: Use `useCallback` for all event handlers passed as props
3. **List Keys**: Use contract IDs, never array indices
4. **Memoize Calculations**: Check cache before calling `calcularTributosTotais()`

### Lazy Initialization
State with expensive initial values must use function form:
```javascript
const [contratos, setContratos] = useState(() => carregarDoLocalStorage('contratos'))
```

## Common Pitfalls

1. **IRRF Base**: Subtract INSS + dependents BEFORE calculating IRRF - this is Brazilian law requirement
2. **Teto INSS**: Cap base calculation at R$ 7,786.02, not the final INSS value
3. **LocalStorage Debounce**: Never write directly - uses 500ms debounce to prevent performance issues
4. **Cache Invalidation**: Cache grows to 100 entries before LRU eviction kicks in
5. **Date Serialization**: All dates stored as ISO strings, not Date objects (localStorage limitation)

## Testing Tax Calculations

Use these test values to verify correctness:
- **Gross R$ 10,000**: INSS = R$ 1,557.20 (capped), IRRF depends on dependents
- **0 dependents**: Higher IRRF due to no R$ 189.59 deductions
- **ISS 5%**: R$ 500 on R$ 10,000 gross (always calculated on full gross, never on net)

## File Naming
- Components: PascalCase folders with matching `.jsx` file (FormularioContrato/FormularioContrato.jsx)
- Utilities: camelCase `.js` files (tributosCalculos.js)
- Pages: PascalCase `.jsx` (Calcular.jsx, ContratoForm.jsx)

## Where to Find Things

- **Tax Rates**: `tributosCalculos.js` CONSTANTS object (line 2)
- **IRRF Table**: FAIXAS_IRRF array (line 7)
- **Form Validations**: Bottom of `tributosCalculos.js` (line 222+)
- **CRUD Operations**: `TributosContext.jsx` methods (line 40-110)
- **Mock Data**: `data/mockData.js` (not currently in use)
