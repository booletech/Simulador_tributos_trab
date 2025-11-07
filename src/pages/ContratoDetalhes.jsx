import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import DetalhesContrato from '../components/DetalhesContrato/DetalhesContrato'
import useTributos from '../hooks/useTributos'
import { calcularTributosTotais } from '../utils/tributosCalculos'

/**
 * Página de detalhes do contrato
 * Utiliza useParams para obter ID da URL e exibir dados completos
 */
const ContratoDetalhes = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obterContrato, deletarContrato } = useTributos()

  const [contrato, setContrato] = useState(null)
  const [calculo, setCalculo] = useState(null)

  // Carregar contrato usando useEffect
  useEffect(() => {
    const contratoEncontrado = obterContrato(id)
    
    if (contratoEncontrado) {
      setContrato(contratoEncontrado)

      // Calcular tributos usando destructuring
      const { valorBruto, dependentes, aliquotaISS, incluirISS } = contratoEncontrado
      const calculoTributos = calcularTributosTotais({
        valorBruto,
        dependentes,
        aliquotaISS,
        incluirISS,
      })
      
      setCalculo(calculoTributos)
    }
  }, [id, obterContrato])

  // Handlers usando arrow functions
  const handleEditar = () => {
    navigate(`/contratos/editar/${id}`)
  }

  const handleDeletar = () => {
    if (window.confirm('Tem certeza que deseja deletar este contrato?')) {
      const { sucesso } = deletarContrato(id)
      
      if (sucesso) {
        navigate('/contratos')
      }
    }
  }

  const handleVoltar = () => {
    navigate('/contratos')
  }

  // Renderização condicional - contrato não encontrado
  if (!contrato) {
    return (
      <Box>
        <Alert severity="error">Contrato não encontrado</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
          sx={{ mt: 2 }}
        >
          Voltar
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
        >
          Voltar
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditar}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeletar}
          >
            Deletar
          </Button>
        </Box>
      </Box>

      <Typography variant="h4" gutterBottom fontWeight="bold">
        Detalhes do Contrato
      </Typography>

      <DetalhesContrato contrato={contrato} calculoTributos={calculo} />
    </Box>
  )
}

export default ContratoDetalhes
