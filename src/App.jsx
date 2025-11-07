import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { TributosProvider } from './context/TributosContext'
import theme from './theme'
import AppRoutes from './routes'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TributosProvider>
          <AppRoutes />
        </TributosProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
