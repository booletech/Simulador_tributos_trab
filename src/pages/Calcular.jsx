import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Alert,
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material'
import FormularioContrato from '../components/FormularioContrato/FormularioContrato'
import TabelaCalculos from '../components/TabelaCalculos/TabelaCalculos'
import useTributos from '../hooks/useTributos'

/**
 * Página de cálculo de tributos
 * Suporta cálculo a partir do bruto ou do líquido
 */
const Calcular = () => {
  const { calcular } = useTributos()
  const [resultado, setResultado] = useState(null)
  const [modoCalculo, setModoCalculo] = useState('bruto') // 'bruto' ou 'liquido'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const handleModoChange = (event, novoModo) => {
    if (novoModo !== null) {
      setModoCalculo(novoModo)
      setResultado(null) // Limpar resultado ao trocar modo
    }
  }

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

      {/* Seletor de modo de cálculo */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Modo de Cálculo
        </Typography>
        <ToggleButtonGroup
          value={modoCalculo}
          exclusive
          onChange={handleModoChange}
          aria-label="modo de cálculo"
          fullWidth
          color="primary"
        >
          <ToggleButton value="bruto" aria-label="calcular do bruto">
            <TrendingUpIcon sx={{ mr: 1 }} />
            Calcular a partir do Salário Bruto
          </ToggleButton>
          <ToggleButton value="liquido" aria-label="calcular do líquido">
            <TrendingDownIcon sx={{ mr: 1 }} />
            Calcular a partir do Salário Líquido
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {modoCalculo === 'bruto' 
            ? 'Informe o valor bruto e descubra o valor líquido após os descontos' 
            : 'Informe o valor líquido desejado e descubra o valor bruto necessário'}
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <FormularioContrato
            onSalvar={handleCalcular}
            onCancelar={handleLimpar}
            modoCalculo={modoCalculo}
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
