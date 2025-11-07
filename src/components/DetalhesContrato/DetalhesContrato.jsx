import {
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material'
import { formatarMoeda, formatarPercentual } from '../../utils/tributosCalculos'
import { formatarCPF, formatarData } from '../../utils/helpers'

/**
 * Componente para exibir detalhes de um contrato
 * Utiliza destructuring e renderização condicional
 */
const DetalhesContrato = ({ contrato, calculoTributos }) => {
  // Destructuring dos dados do contrato
  const {
    nomeAutonomo,
    cpf,
    email,
    telefone,
    endereco,
    valorBruto,
    dependentes,
    aliquotaISS,
    incluirISS,
    descricaoServico,
    observacoes,
    dataCriacao,
    dataAtualizacao,
  } = contrato || {}

  // Destructuring dos cálculos de tributos
  const {
    inss,
    irrf,
    iss,
    totalTributos,
    valorLiquido,
    percentualTotal,
  } = calculoTributos || {}

  // Renderização condicional - se não houver contrato
  if (!contrato) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" align="center">
            Nenhum contrato selecionado
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Grid container spacing={3}>
      {/* Dados Pessoais */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5">Dados Pessoais</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Nome Completo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {nomeAutonomo}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  CPF
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatarCPF(cpf)}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      E-mail
                    </Typography>
                    <Typography variant="body1">{email}</Typography>
                  </Box>
                </Box>
              </Grid>

              {telefone && (
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Telefone
                      </Typography>
                      <Typography variant="body1">{telefone}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}

              {endereco && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon fontSize="small" color="action" />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Endereço
                      </Typography>
                      <Typography variant="body1">{endereco}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Dados do Contrato */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MoneyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5">Dados do Contrato</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {descricaoServico && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Descrição do Serviço
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {descricaoServico}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Valor Bruto
                </Typography>
                <Chip
                  label={formatarMoeda(valorBruto)}
                  color="primary"
                  sx={{ mt: 1, fontWeight: 'bold' }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Dependentes
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  {dependentes}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  ISS
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  {incluirISS ? `${aliquotaISS}%` : 'Não incluso'}
                </Typography>
              </Grid>

              {observacoes && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Observações
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {observacoes}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon fontSize="small" color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Data de Criação
                    </Typography>
                    <Typography variant="body1">{formatarData(dataCriacao)}</Typography>
                  </Box>
                </Box>
              </Grid>

              {dataAtualizacao && dataAtualizacao !== dataCriacao && (
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Última Atualização
                      </Typography>
                      <Typography variant="body1">{formatarData(dataAtualizacao)}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Cálculo de Tributos - Renderização condicional */}
      {calculoTributos && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Cálculo de Tributos
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>INSS</strong></TableCell>
                      <TableCell align="right">
                        {formatarPercentual(inss.aliquota)}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={formatarMoeda(inss.valorINSS)}
                          color="warning"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><strong>IRRF</strong></TableCell>
                      <TableCell align="right">
                        {formatarPercentual(irrf.aliquota)}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={formatarMoeda(irrf.valorIRRF)}
                          color="warning"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>

                    {incluirISS && (
                      <TableRow>
                        <TableCell><strong>ISS</strong></TableCell>
                        <TableCell align="right">
                          {formatarPercentual(iss.aliquota)}
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={formatarMoeda(iss.valorISS)}
                            color="warning"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell colSpan={3}><Divider /></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><strong>Total de Tributos</strong></TableCell>
                      <TableCell align="right">
                        <strong>{formatarPercentual(percentualTotal)}</strong>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={formatarMoeda(totalTributos)}
                          color="error"
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={2}><strong>Valor Líquido</strong></TableCell>
                      <TableCell align="right">
                        <Chip
                          label={formatarMoeda(valorLiquido)}
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default DetalhesContrato
