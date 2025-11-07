import { useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  TextField,
  Box,
  Chip,
  Tooltip,
  Paper,
  InputAdornment,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { formatarMoeda } from '../../utils/tributosCalculos'
import { formatarData } from '../../utils/helpers'
import useDebounce from '../../hooks/useDebounce'

/**
 * Componente de lista de contratos com tabela
 * Implementa paginação, busca e ações CRUD
 */
const ListaContratos = ({ contratos = [], onEditar, onDeletar, onVisualizar }) => {
  // Estado para paginação usando hooks
  const [pagina, setPagina] = useState(0)
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [busca, setBusca] = useState('')

  // Debounce da busca para otimizar performance
  const buscaDebounced = useDebounce(busca, 300)

  // Filtrar contratos usando useMemo para otimização
  const contratosFiltrados = useMemo(() => {
    if (!buscaDebounced) return contratos

    const buscaLower = buscaDebounced.toLowerCase()

    return contratos.filter((contrato) => {
      const { nomeAutonomo, cpf, email } = contrato
      return (
        nomeAutonomo?.toLowerCase().includes(buscaLower) ||
        cpf?.includes(buscaLower) ||
        email?.toLowerCase().includes(buscaLower)
      )
    })
  }, [contratos, buscaDebounced])

  // Contratos paginados usando slice e arrow functions
  const contratosPaginados = useMemo(() => {
    const inicio = pagina * itensPorPagina
    const fim = inicio + itensPorPagina
    return contratosFiltrados.slice(inicio, fim)
  }, [contratosFiltrados, pagina, itensPorPagina])

  // Handlers usando arrow functions
  const handleChangePagina = (_, novaPagina) => {
    setPagina(novaPagina)
  }

  const handleChangeItensPorPagina = (event) => {
    setItensPorPagina(parseInt(event.target.value, 10))
    setPagina(0)
  }

  const handleBusca = (event) => {
    setBusca(event.target.value)
    setPagina(0)
  }

  // Renderização condicional usando ternário
  if (!contratos || contratos.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 4 }}>
            Nenhum contrato cadastrado
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar por nome, CPF ou e-mail..."
            value={busca}
            onChange={handleBusca}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>CPF</strong></TableCell>
                <TableCell><strong>E-mail</strong></TableCell>
                <TableCell align="right"><strong>Valor Bruto</strong></TableCell>
                <TableCell align="right"><strong>Valor Líquido</strong></TableCell>
                <TableCell><strong>Data</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Renderizar lista usando map e destructuring */}
              {contratosPaginados.map((contrato) => {
                const {
                  id,
                  nomeAutonomo,
                  cpf,
                  email,
                  valorBruto,
                  valorLiquido,
                  dataCriacao,
                } = contrato

                return (
                  <TableRow key={id} hover>
                    <TableCell>{nomeAutonomo}</TableCell>
                    <TableCell>{cpf}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={formatarMoeda(valorBruto || 0)}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={formatarMoeda(valorLiquido || 0)}
                        color="success"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatarData(dataCriacao)}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Visualizar">
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() => onVisualizar?.(id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onEditar?.(id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDeletar?.(id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={contratosFiltrados.length}
          page={pagina}
          onPageChange={handleChangePagina}
          rowsPerPage={itensPorPagina}
          onRowsPerPageChange={handleChangeItensPorPagina}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Itens por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </CardContent>
    </Card>
  )
}

export default ListaContratos
