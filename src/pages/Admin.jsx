import { Container, Box, Typography, Paper, Button, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AdminPanelSettings, Logout } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

/**
 * Página Administrativa (exemplo de rota privada)
 * Somente usuários autenticados podem acessar
 */
const Admin = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AdminPanelSettings sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h3" component="h1">
            Área Administrativa
          </Typography>
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Autenticado com sucesso!</strong> Esta é uma rota privada protegida por autenticação.
          </Typography>
        </Alert>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Informações do Usuário
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Nome:</strong> {user?.nome}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Role:</strong> {user?.role}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>ID:</strong> {user?.id}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Sobre Rotas Privadas
          </Typography>
          <Typography variant="body1" paragraph>
            Esta página demonstra o funcionamento de rotas privadas no projeto:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ ml: 2 }}>
            <li>Usuários não autenticados são redirecionados para <code>/login</code></li>
            <li>Token e dados do usuário são armazenados no localStorage</li>
            <li>AuthContext gerencia o estado global de autenticação</li>
            <li>PrivateRoute protege rotas que requerem login</li>
            <li>Sincronização entre múltiplas abas do navegador</li>
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
          >
            Ir para Home
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Fazer Logout
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Admin
