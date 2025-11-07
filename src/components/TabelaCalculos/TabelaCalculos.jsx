import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Divider,
  Grid,
} from '@mui/material'
import { formatarMoeda, formatarPercentual } from '../../utils/tributosCalculos'

/**
 * Componente de tabela para exibir cálculos de tributos
 * Utiliza Material UI e formatação de valores
 */
const TabelaCalculos = ({ calculo }) => {
  // Destructuring do cálculo usando spread
  const {
    valorBruto,
    inss,
    irrf,
    iss,
    totalTributos,
    valorLiquido,
    percentualTotal,
  } = calculo || {}

  // Renderização condicional
  if (!calculo) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" align="center">
            Nenhum cálculo disponível
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Detalhamento dos Tributos
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Resumo */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Valor Bruto
                </Typography>
                <Typography variant="h5" color="primary">
                  {formatarMoeda(valorBruto)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Tributos
                </Typography>
                <Typography variant="h5" color="error">
                  {formatarMoeda(totalTributos)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({formatarPercentual(percentualTotal)})
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Valor Líquido
                </Typography>
                <Typography variant="h5" color="success.main">
                  {formatarMoeda(valorLiquido)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Tabela Detalhada */}
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Tributo</strong></TableCell>
                <TableCell align="right"><strong>Base de Cálculo</strong></TableCell>
                <TableCell align="right"><strong>Alíquota</strong></TableCell>
                <TableCell align="right"><strong>Valor</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* INSS */}
              <TableRow>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold">
                    INSS
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Instituto Nacional do Seguro Social
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {formatarMoeda(inss.baseCalculo)}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={formatarPercentual(inss.aliquota)}
                    size="small"
                    color="info"
                  />
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={formatarMoeda(inss.valorINSS)}
                    color="warning"
                  />
                </TableCell>
              </TableRow>

              {/* IRRF */}
              <TableRow>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold">
                    IRRF
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Imposto de Renda Retido na Fonte
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {formatarMoeda(irrf.baseCalculo)}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={formatarPercentual(irrf.aliquota)}
                    size="small"
                    color="info"
                  />
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={formatarMoeda(irrf.valorIRRF)}
                    color="warning"
                  />
                </TableCell>
              </TableRow>

              {/* ISS - Renderização condicional */}
              {iss && iss.valorISS > 0 && (
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold">
                      ISS
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Imposto Sobre Serviços
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {formatarMoeda(iss.baseCalculo)}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={formatarPercentual(iss.aliquota)}
                      size="small"
                      color="info"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={formatarMoeda(iss.valorISS)}
                      color="warning"
                    />
                  </TableCell>
                </TableRow>
              )}

              {/* Totais */}
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell colSpan={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Total de Tributos
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={formatarMoeda(totalTributos)}
                    color="error"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                <TableCell colSpan={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Valor Líquido a Receber
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={formatarMoeda(valorLiquido)}
                    color="success"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Deduções IRRF */}
        {irrf && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Deduções do IRRF
            </Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Dedução INSS</TableCell>
                    <TableCell align="right">
                      {formatarMoeda(irrf.deducaoINSS)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dedução Dependentes</TableCell>
                    <TableCell align="right">
                      {formatarMoeda(irrf.deducaoDependentes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Parcela a Deduzir da Tabela</TableCell>
                    <TableCell align="right">
                      {formatarMoeda(irrf.parcelaADeduzir)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default TabelaCalculos
