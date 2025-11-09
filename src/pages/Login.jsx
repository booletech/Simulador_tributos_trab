import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

/**
 * Página de Login
 * Permite autenticação de usuários para acessar rotas privadas
 */
const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const { sucesso, erro: erroLogin } = await login(email, password)

      if (sucesso) {
        // Redirecionar para página admin ou home
        navigate('/admin')
      } else {
        setErro(erroLogin || 'Erro ao fazer login')
      }
    } catch (error) {
      setErro('Erro inesperado ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 450 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
              <LoginIcon sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
              <Typography variant="h4" component="h1">
                Login
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Acesse a área administrativa do sistema
            </Typography>

            {/* Informação de demonstração */}
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Modo Demonstração:</strong> Use qualquer email e senha para entrar.
              </Typography>
            </Alert>

            {erro && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {erro}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                autoFocus
                autoComplete="email"
              />

              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="alternar visibilidade da senha"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
                startIcon={<LoginIcon />}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                Voltar para Home
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Login
