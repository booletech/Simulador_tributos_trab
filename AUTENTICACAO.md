# 🔐 Guia de Autenticação

## 📖 Modo Atual (Credenciais Fixas - Implementado)

O sistema está configurado com **validação de credenciais fixas** para autenticação segura.

### Como fazer login:

1. Acesse: http://localhost:3000/login
2. Use uma das credenciais válidas abaixo
3. Clique em "Entrar"

### ✅ Credenciais Válidas:

**Administrador:**
- Email: `admin@sistema.com`
- Senha: `admin123`
- Role: `admin`

**Usuário Padrão:**
- Email: `usuario@sistema.com`
- Senha: `user123`
- Role: `user`

⚠️ **Outras credenciais serão rejeitadas com erro "Email ou senha inválidos"**

### Usuário criado após login bem-sucedido:

```json
{
  "id": "1699876543210",
  "nome": "Administrador" ou "Usuário",
  "email": "email-usado@no-login.com",
  "role": "admin" ou "user"
}
```

---

## 🔧 Como Adicionar Mais Usuários

### Editando as credenciais fixas:

**Arquivo:** `src/context/AuthContext.jsx` (linha 60-63)

Adicione novas entradas no objeto `USUARIOS_VALIDOS`:

```javascript
// Localização: src/context/AuthContext.jsx (linha 60)
const USUARIOS_VALIDOS = {
  'admin@sistema.com': { senha: 'admin123', nome: 'Administrador', role: 'admin' },
  'usuario@sistema.com': { senha: 'user123', nome: 'Usuário', role: 'user' },
  
  // Adicionar novos usuários aqui:
  'maria@empresa.com': { senha: 'senha456', nome: 'Maria Silva', role: 'user' },
  'joao@empresa.com': { senha: 'senha789', nome: 'João Santos', role: 'admin' },
}
```

Salve o arquivo e o sistema automaticamente reconhecerá os novos usuários.

---

## 🔧 Como Integrar com API Real (Produção)

**Arquivo:** `src/context/AuthContext.jsx` (linha 49-87)

Substitua todo o bloco por chamada de API:

```javascript
const login = useCallback(async (email, password) => {
  try {
    // Validação básica
    if (!email || !password) {
      return {
        sucesso: false,
        erro: 'Email e senha são obrigatórios',
      }
    }

    // Chamar API de autenticação
    const response = await api.post('/auth/login', {
      email,
      password,
    })

    const { token, user } = response.data

    // Salvar no localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    // Atualizar estado
    setIsAuthenticated(true)
    setUser(user)

    return { sucesso: true }
  } catch (error) {
    return {
      sucesso: false,
      erro: error.response?.data?.message || 'Erro ao fazer login',
    }
  }
}, [])
```

**Backend esperado:**

```
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}

// Resposta de sucesso (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "nome": "João Silva",
    "email": "usuario@email.com",
    "role": "admin"
  }
}

// Resposta de erro (401):
{
  "message": "Email ou senha inválidos"
}
```

---

## 🎯 Testando Rotas Privadas

### Fluxo de autenticação:

1. **Acesse área protegida:** http://localhost:3000/admin
2. **Redirecionamento:** Sistema redireciona para `/login`
3. **Login:** Digite credenciais e faça login
4. **Acesso concedido:** Redireciona para `/admin`
5. **Logout:** Clique em "Fazer Logout" para sair

### Verificar se está autenticado:

Abra o Console do navegador (F12) e digite:

```javascript
// Ver token
localStorage.getItem('token')

// Ver dados do usuário
JSON.parse(localStorage.getItem('user'))

// Fazer logout manualmente
localStorage.removeItem('token')
localStorage.removeItem('user')
location.reload()
```

---

## 🔒 Segurança

### Boas práticas implementadas:

✅ Token armazenado no localStorage  
✅ Verificação de autenticação em rotas privadas  
✅ Redirecionamento automático para login  
✅ Sincronização entre múltiplas abas  
✅ Interceptor Axios envia token automaticamente  
✅ Logout limpa todos os dados de autenticação  

### Para produção, considere:

⚠️ Usar **JWT** (JSON Web Token)  
⚠️ Implementar **refresh tokens**  
⚠️ Usar **HTTPS** sempre  
⚠️ Adicionar **rate limiting** no backend  
⚠️ Implementar **2FA** (autenticação de dois fatores)  
⚠️ Hash de senhas com **bcrypt** no backend  
⚠️ Validação de força de senha  
⚠️ Proteção contra **CSRF** e **XSS**  

---

## 🛠️ Configuração de Ambiente

### Variável de ambiente (opcional):

Crie `.env.local` na raiz do projeto:

```env
# URL da API de autenticação
VITE_API_URL=http://localhost:3001/api

# URL de login (se externa)
VITE_AUTH_URL=http://localhost:3001/auth
```

---

## 📚 Documentação Relacionada

- **API Service:** `src/services/api.js` (interceptors com token)
- **AuthContext:** `src/context/AuthContext.jsx` (lógica de autenticação)
- **PrivateRoute:** `src/components/PrivateRoute/PrivateRoute.jsx` (proteção de rotas)
- **Login Page:** `src/pages/Login.jsx` (interface de login)
- **Admin Page:** `src/pages/Admin.jsx` (exemplo de rota protegida)

---

## ❓ FAQ

**P: Como adicionar mais usuários?**  
R: Edite o objeto `USUARIOS_VALIDOS` em `src/context/AuthContext.jsx` (linha 60) e adicione novas entradas.

**P: Como desabilitar autenticação temporariamente?**  
R: Comente a linha `<PrivateRoute>` em `src/routes.jsx` e use `<Admin />` diretamente.

**P: O que acontece se usar credenciais erradas?**  
R: O sistema retorna erro "Email ou senha inválidos" e não permite acesso.

**P: Posso voltar ao modo demonstração (aceitar qualquer senha)?**  
R: Sim, veja o histórico do Git ou consulte o commit anterior. Mas isso não é recomendado para produção.

**P: O token expira?**  
R: No modo atual não. Para expiração, implemente verificação de tempo no AuthContext.

**P: Como proteger mais rotas?**  
R: Envolva qualquer rota com `<PrivateRoute><SuaRota /></PrivateRoute>` em `routes.jsx`.

---

**Data:** 09 de Novembro de 2025  
**Versão:** 2.0.0 - Credenciais Fixas Implementadas
