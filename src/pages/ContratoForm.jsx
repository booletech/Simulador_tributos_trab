import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import FormularioContrato from '../components/FormularioContrato/FormularioContrato'
import useTributos from '../hooks/useTributos'
import { calcularTributosTotais } from '../utils/tributosCalculos'

/**
 * Página para criar/editar contratos
 * Utiliza useParams, useEffect e navegação
 */
const ContratoForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obterContrato, criarContrato, atualizarContrato, loading } = useTributos()

  const [contrato, setContrato] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const isEdicao = Boolean(id)

  // Carregar contrato se for edição usando useEffect
  useEffect(() => {
    if (isEdicao) {
      const contratoExistente = obterContrato(id)
      if (contratoExistente) {
        setContrato(contratoExistente)
      } else {
        setSnackbar({
          open: true,
          message: 'Contrato não encontrado',
          severity: 'error',
        })
        setTimeout(() => navigate('/contratos'), 2000)
      }
    }
  }, [id, isEdicao, obterContrato, navigate])

  // Handler de salvamento usando arrow function
  const handleSalvar = (dadosContrato) => {
    // Calcular tributos usando destructuring
    const { valorBruto, dependentes, aliquotaISS, incluirISS } = dadosContrato
    const calculo = calcularTributosTotais({ valorBruto, dependentes, aliquotaISS, incluirISS })

    // Dados completos com cálculos usando spread operator
    const dadosCompletos = {
      ...dadosContrato,
      valorLiquido: calculo.valorLiquido,
      totalTributos: calculo.totalTributos,
      percentualTributos: calculo.percentualTotal,
    }

    let resultado

    if (isEdicao) {
      resultado = atualizarContrato(id, dadosCompletos)
    } else {
      resultado = criarContrato(dadosCompletos)
    }

    const { sucesso, erro } = resultado

    if (sucesso) {
      setSnackbar({
        open: true,
        message: `Contrato ${isEdicao ? 'atualizado' : 'criado'} com sucesso!`,
        severity: 'success',
      })
      setTimeout(() => navigate('/contratos'), 1500)
    } else {
      setSnackbar({
        open: true,
        message: `Erro ao ${isEdicao ? 'atualizar' : 'criar'}: ${erro}`,
        severity: 'error',
      })
    }
  }

  const handleCancelar = () => {
    navigate('/contratos')
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Renderização condicional - loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/contratos')}
        sx={{ mb: 2 }}
      >
        Voltar
      </Button>

      <Typography variant="h4" gutterBottom fontWeight="bold">
        {isEdicao ? 'Editar Contrato' : 'Novo Contrato'}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {isEdicao
          ? 'Atualize as informações do contrato'
          : 'Preencha os dados para criar um novo contrato'}
      </Typography>

      <FormularioContrato
        contratoInicial={contrato}
        onSalvar={handleSalvar}
        onCancelar={handleCancelar}
      />

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

export default ContratoForm
