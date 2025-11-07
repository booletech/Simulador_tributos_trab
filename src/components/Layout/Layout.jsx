import { Container, Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

/**
 * Componente de layout principal
 * Envolve todas as páginas com navbar e container
 */
const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default Layout
