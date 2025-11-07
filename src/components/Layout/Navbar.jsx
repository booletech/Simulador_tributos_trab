import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home as HomeIcon,
  List as ListIcon,
  Calculate as CalculateIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'

/**
 * Componente de navegação principal
 * Utiliza React Router para navegação entre páginas
 */
const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Arrow function para verificar rota ativa
  const isActive = (path) => location.pathname === path

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Simulador de Tributos
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            Início
          </Button>

          <Button
            color="inherit"
            startIcon={<CalculateIcon />}
            onClick={() => navigate('/calcular')}
            sx={{
              backgroundColor: isActive('/calcular') ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            Calcular
          </Button>

          <Button
            color="inherit"
            startIcon={<ListIcon />}
            onClick={() => navigate('/contratos')}
            sx={{
              backgroundColor: isActive('/contratos') ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            Contratos
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
