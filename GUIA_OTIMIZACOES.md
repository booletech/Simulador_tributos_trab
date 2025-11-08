# Guia de Uso das Otimizações

Este guia mostra como aproveitar as otimizações implementadas no projeto.

## 🎯 Para Desenvolvedores

### 1. Usando Hooks Otimizados

#### useForm com Validação
```javascript
import useForm from '../hooks/useForm'

const MeuComponente = () => {
  const { 
    valores, 
    erros, 
    isValid, 
    isDirty,
    handleChange, 
    handleBlur 
  } = useForm(
    { nome: '', email: '' }, // valores iniciais
    { 
      nome: (v) => !v ? 'Nome obrigatório' : null,
      email: (v) => !v?.includes('@') ? 'Email inválido' : null
    }
  )

  return (
    <form>
      <input
        name="nome"
        value={valores.nome}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {erros.nome && <span>{erros.nome}</span>}
      
      <button disabled={!isValid}>Salvar</button>
    </form>
  )
}
```

#### useTributos com Estatísticas
```javascript
import useTributos from '../hooks/useTributos'

const Dashboard = () => {
  const { 
    contratos, 
    estatisticas, 
    buscarContratos,
    ordenarContratos 
  } = useTributos()

  // Estatísticas são calculadas automaticamente e memoizadas
  const { 
    totalContratos, 
    valorTotalBruto, 
    percentualMedioTributos 
  } = estatisticas

  // Buscar contratos de forma otimizada
  const resultadoBusca = buscarContratos('João')

  // Ordenar contratos de forma otimizada
  const contratosOrdenados = ordenarContratos('valorBruto', 'desc')

  return (
    <div>
      <h2>Total de Contratos: {totalContratos}</h2>
      <h3>Valor Total: {valorTotalBruto}</h3>
      <h3>Tributos Médios: {percentualMedioTributos}%</h3>
    </div>
  )
}
```

#### useDebounce para Buscas
```javascript
import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'

const BuscaOtimizada = () => {
  const [termoBusca, setTermoBusca] = useState('')
  
  // Valor debounced - só atualiza após 500ms sem digitação
  const termoBuscaDebounced = useDebounce(termoBusca, 500)

  // Use termoBuscaDebounced para fazer a busca
  // Evita buscar a cada tecla pressionada
  useEffect(() => {
    if (termoBuscaDebounced) {
      // Fazer busca...
    }
  }, [termoBuscaDebounced])

  return (
    <input
      value={termoBusca}
      onChange={(e) => setTermoBusca(e.target.value)}
      placeholder="Buscar..."
    />
  )
}
```

#### useDebounceCallback para Ações
```javascript
import { useDebounceCallback } from '../hooks/useDebounce'

const AutoSave = () => {
  // Callback debounced - só executa após 1s sem chamadas
  const salvarDebounced = useDebounceCallback((dados) => {
    console.log('Salvando...', dados)
    // Lógica de salvamento
  }, 1000)

  return (
    <input
      onChange={(e) => salvarDebounced({ campo: e.target.value })}
    />
  )
}
```

### 2. Trabalhando com Cache de Cálculos

```javascript
import { 
  calcularTributosTotais, 
  limparCacheCalculos,
  obterEstatisticasCache 
} from '../utils/tributosCalculos'

// Cálculos são automaticamente cacheados
const resultado1 = calcularTributosTotais({
  valorBruto: 5000,
  dependentes: 2,
  aliquotaISS: 5
})

// Segunda chamada com mesmos parâmetros usa cache
const resultado2 = calcularTributosTotais({
  valorBruto: 5000,
  dependentes: 2,
  aliquotaISS: 5
}) // ⚡ Retorno instantâneo do cache!

// Ver estatísticas do cache
console.log(obterEstatisticasCache())
// { tamanho: 1, chaves: ['5000:2:5:true'] }

// Limpar cache quando necessário (ex: ao trocar de ano fiscal)
limparCacheCalculos()
```

### 3. Criando Componentes Otimizados

#### Com React.memo
```javascript
import { memo } from 'react'

// Componente só re-renderiza se props mudarem
const ItemContrato = memo(({ contrato, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{contrato.nomeAutonomo}</h3>
      <p>Valor: {contrato.valorBruto}</p>
      <button onClick={() => onEdit(contrato.id)}>Editar</button>
      <button onClick={() => onDelete(contrato.id)}>Excluir</button>
    </div>
  )
})

ItemContrato.displayName = 'ItemContrato'

export default ItemContrato
```

#### Com useMemo para Cálculos
```javascript
import { useMemo } from 'react'

const ListaComFiltros = ({ contratos, filtro }) => {
  // Cálculo pesado só executa quando contratos ou filtro mudam
  const contratosFiltrados = useMemo(() => {
    return contratos.filter(c => 
      c.nomeAutonomo.toLowerCase().includes(filtro.toLowerCase())
    ).sort((a, b) => b.valorBruto - a.valorBruto)
  }, [contratos, filtro])

  return (
    <ul>
      {contratosFiltrados.map(c => (
        <li key={c.id}>{c.nomeAutonomo}</li>
      ))}
    </ul>
  )
}
```

#### Com useCallback para Funções
```javascript
import { useCallback, useState } from 'react'

const FormularioOtimizado = () => {
  const [dados, setDados] = useState({})

  // Função estável que não muda a cada render
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    console.log('Enviando...', dados)
  }, [dados])

  // Pode ser passada para componentes memo sem causar re-render
  return <Botao onClick={handleSubmit}>Enviar</Botao>
}
```

### 4. Lazy Loading de Componentes

```javascript
import { lazy, Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

// Carregar componente sob demanda
const RelatorioComplexo = lazy(() => import('./RelatorioComplexo'))

const Dashboard = () => {
  const [mostrarRelatorio, setMostrarRelatorio] = useState(false)

  return (
    <div>
      <button onClick={() => setMostrarRelatorio(true)}>
        Ver Relatório Completo
      </button>

      {mostrarRelatorio && (
        <Suspense fallback={<CircularProgress />}>
          <RelatorioComplexo />
        </Suspense>
      )}
    </div>
  )
}
```

## 📊 Monitorando Performance

### 1. React DevTools Profiler

```javascript
import { Profiler } from 'react'

const MeuComponente = () => {
  const onRender = (id, phase, actualDuration) => {
    console.log(`${id} (${phase}) levou ${actualDuration}ms`)
  }

  return (
    <Profiler id="MeuComponente" onRender={onRender}>
      {/* Componentes aqui */}
    </Profiler>
  )
}
```

### 2. Performance API

```javascript
// Medir tempo de cálculo
const inicio = performance.now()
const resultado = calcularTributosTotais({ valorBruto: 5000 })
const fim = performance.now()
console.log(`Cálculo levou ${fim - inicio}ms`)
```

### 3. Chrome DevTools

1. Abra DevTools (F12)
2. Aba "Performance"
3. Clique em "Record"
4. Realize ações na aplicação
5. Pare a gravação
6. Analise o flamegraph

## ⚠️ Armadilhas Comuns

### 1. Evite Criar Objetos em Cada Render
```javascript
// ❌ MAU - Cria novo objeto a cada render
const MeuComponente = () => {
  return <OutroComponente config={{ nome: 'teste' }} />
}

// ✅ BOM - Objeto estável
const config = { nome: 'teste' }
const MeuComponente = () => {
  return <OutroComponente config={config} />
}

// ✅ BOM - Memoizado
const MeuComponente = () => {
  const config = useMemo(() => ({ nome: 'teste' }), [])
  return <OutroComponente config={config} />
}
```

### 2. useCallback sem Dependências Certas
```javascript
// ❌ MAU - Missing dependency
const handleClick = useCallback(() => {
  console.log(dados) // dados não está nas dependências!
}, [])

// ✅ BOM
const handleClick = useCallback(() => {
  console.log(dados)
}, [dados])
```

### 3. Memo em Componentes Simples
```javascript
// ❌ Desnecessário - componente muito simples
const Titulo = memo(({ texto }) => <h1>{texto}</h1>)

// ✅ Deixe simples
const Titulo = ({ texto }) => <h1>{texto}</h1>
```

## 🎓 Boas Práticas

### 1. Use Memo Apenas Quando Necessário
- Componentes que renderizam listas grandes
- Componentes com cálculos pesados
- Componentes que re-renderizam com frequência

### 2. Meça Antes de Otimizar
- Use Profiler para identificar gargalos
- Não otimize prematuramente
- Foque nos componentes lentos

### 3. Mantenha Callbacks Estáveis
- Use useCallback para funções passadas como props
- Use useRef para valores que não causam re-render

### 4. Abuse do Lazy Loading
- Carregue componentes grandes sob demanda
- Divida a aplicação em chunks
- Melhore o tempo de carregamento inicial

## 🔍 Debugging

### Ver o que está causando re-renders

```javascript
import { useEffect, useRef } from 'react'

const useWhyDidYouUpdate = (name, props) => {
  const previousProps = useRef()

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      const changedProps = {}
      
      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current[key],
            to: props[key]
          }
        }
      })

      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps)
      }
    }

    previousProps.current = props
  })
}

// Uso
const MeuComponente = (props) => {
  useWhyDidYouUpdate('MeuComponente', props)
  return <div>...</div>
}
```

---

**Última atualização:** 2025-11-08
