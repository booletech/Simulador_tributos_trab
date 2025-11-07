# 🚀 INSTRUÇÕES PARA PRIMEIRA EXECUÇÃO

## Passo 1: Instalar Dependências
Abra o PowerShell nesta pasta e execute:

```powershell
npm install
```

Aguarde a instalação (pode levar alguns minutos).

## Passo 2: Executar o Projeto
Após a instalação, execute:

```powershell
npm run dev
```

## Passo 3: Acessar no Navegador
O projeto abrirá automaticamente em:
```
http://localhost:3000
```

Se não abrir automaticamente, abra manualmente no navegador.

## ✅ Pronto!
Você verá a página inicial do Simulador de Tributos Trabalhistas.

## 📝 Próximos Passos

### Testar o Calculador
1. Clique em "Calcular Agora" ou "Calcular" no menu
2. Preencha os campos:
   - Nome: Teste Silva
   - CPF: 123.456.789-00
   - E-mail: teste@email.com
   - Valor Bruto: 5000
   - Dependentes: 2
3. Veja o cálculo instantâneo!

### Criar um Contrato
1. Clique em "Criar Contrato" ou "Novo Contrato"
2. Preencha todos os campos
3. Clique em "Salvar"
4. Veja o contrato na lista!

## 🔧 Comandos Úteis

```powershell
# Parar o servidor
Ctrl + C

# Reinstalar dependências (se houver problemas)
Remove-Item -Recurse -Force node_modules
npm install

# Limpar cache
npm cache clean --force

# Build para produção
npm run build
```

## ❓ Problemas Comuns

### "npm não é reconhecido"
- Instale o Node.js: https://nodejs.org

### Porta 3000 ocupada
- O Vite tentará usar a porta 3001 automaticamente

### Erro ao instalar
- Execute como Administrador
- Ou use: `npm install --legacy-peer-deps`

## 📚 Documentação
Consulte o README.md para documentação completa.

---
**Desenvolvido com React + Vite + Material UI**
