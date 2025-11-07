import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material'
import FormularioContrato from '../components/FormularioContrato/FormularioContrato'
import TabelaCalculos from '../components/TabelaCalculos/TabelaCalculos'
import useTributos from '../hooks/useTributos'

/**
 * Página de cálculo de tributos
 * Utiliza useState, componentes controlados e cálculos em tempo real
 */
const Calcular = () => {
  const { calcular } = useTributos()
  const [resultado, setResultado] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Handler usando arrow function e destructuring
  const handleCalcular = (dadosCalculo) => {
    const { sucesso, resultado: calc, erro } = calcular(dadosCalculo)

    if (sucesso) {
      setResultado(calc)
      setSnackbar({
        open: true,
        message: 'Cálculo realizado com sucesso!',
        severity: 'success',
      })
    } else {
      setSnackbar({
        open: true,
        message: `Erro ao calcular: ${erro}`,
        severity: 'error',
      })
    }
  }

  const handleLimpar = () => {
    setResultado(null)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Calcular Tributos
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Preencha os dados abaixo para calcular os tributos trabalhistas
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <FormularioContrato
            onSalvar={handleCalcular}
            onCancelar={handleLimpar}
          />
        </Grid>

        {/* Renderização condicional do resultado */}
        {resultado && (
          <Grid item xs={12} lg={6}>
            <TabelaCalculos calculo={resultado} />
          </Grid>
        )}
      </Grid>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Calcular
