# 📸 Guia: Como Adicionar Screenshots no README

## Passo 1: Organize suas imagens

Você já tem as imagens? Ótimo! Vamos organizá-las.

### Nomes sugeridos para suas imagens:

- `01-home.png` → Tela inicial/Dashboard
- `02-login.png` → Página de login
- `03-calcular.png` → Calculadora de tributos
- `04-resultado-calculo.png` → Tela com resultado do cálculo
- `05-contratos-lista.png` → Lista de contratos
- `06-novo-contrato.png` → Formulário de novo contrato
- `07-detalhes-contrato.png` → Detalhes de um contrato
- `08-admin.png` → Área administrativa (rota privada)

## Passo 2: Copie as imagens para a pasta

Execute no PowerShell:

```powershell
# Copiar suas imagens para a pasta screenshots
Copy-Item "caminho\para\suas\imagens\*.png" -Destination "docs\screenshots\"

# Ou copie manualmente arrastando as imagens para:
# C:\Users\jl-td\Simulador_tributos_trab\docs\screenshots\
```

## Passo 3: Verifique as imagens

```powershell
# Listar imagens adicionadas
ls docs\screenshots\*.png
```

## Passo 4: Commit e Push

```powershell
# Adicionar ao Git
git add docs/screenshots/
git add README.md

# Commit
git commit -m "docs: adiciona screenshots da aplicação"

# Push para GitHub
git push origin main
```

## Passo 5: Verificar no GitHub

1. Acesse: https://github.com/booletech/Simulador_tributos_trab
2. As imagens devem aparecer automaticamente no README

---

## 🎨 Dicas para bons screenshots:

### Resolução recomendada:
- **Desktop:** 1920x1080 ou 1366x768
- **Responsivo:** 375x812 (mobile) ou 768x1024 (tablet)

### Ferramentas para captura:
- **Windows:** `Win + Shift + S` (Ferramenta de Recorte)
- **Navegador:** F12 → Device Toolbar (testar responsivo)

### Otimização de imagens:
Para reduzir tamanho sem perder qualidade:

```powershell
# Usando TinyPNG ou similar (online)
# Ou instale imagemagick:
# magick convert input.png -quality 85 output.png
```

### Formatos aceitos:
- ✅ PNG (melhor para UI com texto)
- ✅ JPG (fotos, menor tamanho)
- ✅ GIF (animações)
- ✅ WebP (moderno, menor tamanho)

---

## 🔧 Alternativa: Usar GitHub Issues para Upload

Se preferir não commitar as imagens no repositório:

1. Acesse: https://github.com/booletech/Simulador_tributos_trab/issues
2. Clique em "New Issue"
3. Arraste suas imagens para o campo de comentário
4. GitHub gera URLs como:
   ```
   https://user-images.githubusercontent.com/12345/nome-hash.png
   ```
5. Copie essas URLs e use no README:

```markdown
![Home](https://user-images.githubusercontent.com/12345/home-hash.png)
```

**Vantagem:** Não aumenta o tamanho do repositório  
**Desvantagem:** Links podem quebrar se a issue for deletada

---

## ✅ Exemplo de como ficará no README:

```markdown
## 📸 Screenshots

### Tela Inicial (Dashboard)
![Home Dashboard](./docs/screenshots/01-home.png)

### Página de Login
![Login](./docs/screenshots/02-login.png)
```

---

## 🎯 Checklist Final

- [ ] Imagens salvas em `docs/screenshots/`
- [ ] Nomes descritivos (01-home.png, 02-login.png, etc.)
- [ ] Tamanho otimizado (< 1MB cada)
- [ ] README.md atualizado com referências
- [ ] Git add + commit + push
- [ ] Verificar no GitHub se aparecem corretamente

---

## 🆘 Problemas Comuns

### Imagem não aparece no GitHub:
- Verifique o caminho: `./docs/screenshots/01-home.png`
- Certifique-se que fez commit das imagens
- Aguarde alguns segundos para cache atualizar

### Imagem muito grande:
- Comprima usando TinyPNG.com
- Ou reduza resolução para 1920x1080

### Imagem borrada:
- Use PNG para UI (melhor qualidade)
- Evite redimensionar depois de capturar

---

**Data:** 09 de Novembro de 2025
