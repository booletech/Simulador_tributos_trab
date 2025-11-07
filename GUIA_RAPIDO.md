# Guia Rápido de Uso

## 🚀 Início Rápido

### 1. Instalação
```bash
npm install
npm run dev
```

### 2. Popular com Dados de Teste (Opcional)

Abra o console do navegador (F12) e execute:
```javascript
import { popularDadosMock } from './src/data/mockData'
popularDadosMock()
```

Depois recarregue a página.

## 📖 Como Usar

### Calcular Tributos Rapidamente

1. Clique em **"Calcular"** na barra de navegação
2. Preencha:
   - Valor Bruto: R$ 5.000,00
   - Dependentes: 2
   - Alíquota ISS: 5%
3. Veja o resultado instantaneamente!

### Criar um Contrato Completo

1. Clique em **"Novo Contrato"**
2. Preencha os dados do autônomo:
   - Nome: João Silva
   - CPF: 123.456.789-00
   - E-mail: joao@email.com
3. Preencha os dados financeiros:
   - Valor Bruto: R$ 5.000,00
   - Dependentes: 2
4. Clique em **"Salvar"**

### Gerenciar Contratos

#### Visualizar
- Acesse **"Contratos"**
- Clique no ícone de olho 👁️

#### Editar
- Clique no ícone de lápis ✏️
- Modifique os dados
- Salve as alterações

#### Deletar
- Clique no ícone de lixeira 🗑️
- Confirme a exclusão

### Buscar Contratos

Na página de contratos, use a caixa de busca para filtrar por:
- Nome
- CPF
- E-mail

## 💡 Dicas

### Atalhos de Teclado
- `Enter` no formulário = Salvar
- `Esc` = Cancelar (em diálogos)

### Validações Automáticas
- ✅ CPF é validado automaticamente
- ✅ E-mail é verificado
- ✅ Valores são limitados a ranges válidos

### Persistência de Dados
- Todos os dados são salvos no localStorage
- Os dados permanecem mesmo após fechar o navegador
- Para limpar: Abra o console e execute `localStorage.clear()`

## 🎯 Exemplos de Cenários

### Cenário 1: Autônomo com baixa renda
```
Valor Bruto: R$ 2.000,00
Dependentes: 0
ISS: Não incluir
```
**Resultado**: Apenas INSS (20%) = R$ 400,00

### Cenário 2: Autônomo com renda média
```
Valor Bruto: R$ 5.000,00
Dependentes: 2
ISS: 5%
```
**Resultado**: INSS + IRRF + ISS ≈ R$ 1.108,73

### Cenário 3: Autônomo com alta renda
```
Valor Bruto: R$ 15.000,00
Dependentes: 1
ISS: 3%
```
**Resultado**: Tributos significativos devido ao teto do INSS e IRRF progressivo

## 🔧 Troubleshooting

### Problema: Página em branco
**Solução**: 
1. Verifique se executou `npm install`
2. Verifique se a porta 3000 está livre
3. Limpe o cache: `Ctrl + Shift + Del`

### Problema: Dados não salvam
**Solução**:
1. Verifique se o localStorage está habilitado
2. Verifique se há espaço disponível
3. Limpe dados antigos

### Problema: Cálculos incorretos
**Solução**:
1. Verifique se os valores estão corretos
2. Confirme que as alíquotas estão configuradas
3. Veja o console para erros (F12)

## 📚 Recursos Adicionais

- [Documentação React](https://react.dev)
- [Material UI](https://mui.com)
- [React Router](https://reactrouter.com)

## 🆘 Suporte

Para problemas ou dúvidas:
1. Verifique o console do navegador (F12)
2. Veja os erros no terminal
3. Consulte o README.md principal
