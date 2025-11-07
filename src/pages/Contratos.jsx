import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import ListaContratos from '../components/ListaContratos/ListaContratos'
import useTributos from '../hooks/useTributos'

/**
 * Página de listagem de contratos
 * Implementa CRUD completo com confirmação de exclusão
 */
const Contratos = () => {
  const navigate = useNavigate()
  const { contratos, deletarContrato } = useTributos()

  // Estados para diálogo de confirmação
  const [dialogoAberto, setDialogoAberto] = useState(false)
  const [contratoParaDeletar, setContratoParaDeletar] = useState(null)
  
  // Estado para snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Handlers usando arrow functions
  const handleEditar = (id) => {
    navigate(`/contratos/editar/${id}`)
  }

  const handleVisualizar = (id) => {
    navigate(`/contratos/${id}`)
  }

  const handleAbrirDialogo = (id) => {
    setContratoParaDeletar(id)
    setDialogoAberto(true)
  }

  const handleFecharDialogo = () => {
    setDialogoAberto(false)
    setContratoParaDeletar(null)
  }

  const handleConfirmarDelecao = () => {
    const { sucesso, erro } = deletarContrato(contratoParaDeletar)

    if (sucesso) {
      setSnackbar({
        open: true,
        message: 'Contrato deletado com sucesso!',
        severity: 'success',
      })
    } else {
      setSnackbar({
        open: true,
        message: `Erro ao deletar: ${erro}`,
        severity: 'error',
      })
    }

    handleFecharDialogo()
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleNovo = () => {
    navigate('/contratos/novo')
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Contratos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie todos os contratos de autônomos cadastrados
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNovo}
          size="large"
        >
          Novo Contrato
        </Button>
      </Box>

      <ListaContratos
        contratos={contratos}
        onEditar={handleEditar}
        onDeletar={handleAbrirDialogo}
        onVisualizar={handleVisualizar}
      />

      {/* Diálogo de confirmação de exclusão */}
      <Dialog
        open={dialogoAberto}
        onClose={handleFecharDialogo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja deletar este contrato? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFecharDialogo} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleConfirmarDelecao} color="error" variant="contained" autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

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

export default Contratos
