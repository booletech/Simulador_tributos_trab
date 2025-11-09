import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
} from '@mui/material'
import {
  Calculate as CalculateIcon,
  List as ListIcon,
  TrendingUp as TrendingUpIcon,
  AddCircle as AddCircleIcon,
} from '@mui/icons-material'
import useTributos from '../hooks/useTributos'
import { formatarMoeda } from '../utils/tributosCalculos'

/**
 * Página inicial com dashboard e cards de ação
 * Utiliza hooks personalizados e navegação
 */
const Home = () => {
  const navigate = useNavigate()
  const { obterEstatisticas } = useTributos()

  // Obter estatísticas usando hook personalizado
  const estatisticas = obterEstatisticas()

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Simulador de Tributos Trabalhistas
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Calcule os custos de tributos para contratos de autônomos
        </Typography>
      </Box>

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {estatisticas.totalContratos}
            </Typography>
            <Typography variant="body1">Contratos</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {formatarMoeda(estatisticas.valorTotalBruto)}
            </Typography>
            <Typography variant="body1">Valor Bruto Total</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {formatarMoeda(estatisticas.totalTributos)}
            </Typography>
            <Typography variant="body1">Total de Tributos</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {formatarMoeda(estatisticas.valorTotalLiquido)}
            </Typography>
            <Typography variant="body1">Valor Líquido Total</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Cards de Ação */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalculateIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  Calcular Tributos
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Simule o cálculo de INSS, IRRF e ISS para contratos de autônomos de forma
                rápida e precisa.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => navigate('/calcular')}
              >
                Calcular Agora
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AddCircleIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  Novo Contrato
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Cadastre um novo contrato de autônomo com todos os dados necessários para
                o cálculo de tributos.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="success"
                size="large"
                onClick={() => navigate('/contratos/novo')}
              >
                Criar Contrato
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ListIcon color="info" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  Listar Contratos
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Visualize, edite e gerencie todos os contratos cadastrados no sistema com
                facilidade.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="info"
                size="large"
                onClick={() => navigate('/contratos')}
              >
                Ver Contratos
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Informações */}
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Sobre o Simulador
            </Typography>
            <Typography variant="body1" paragraph>
              Este simulador foi desenvolvido para auxiliar no cálculo de tributos trabalhistas
              para contratos de autônomos (contribuintes individuais). Os cálculos incluem:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  <strong>INSS:</strong> Calculado com alíquota de 20% sobre o valor bruto,
                  limitado ao teto do INSS
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>IRRF:</strong> Calculado com base na tabela progressiva, considerando
                  deduções de INSS e dependentes
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>ISS:</strong> Imposto sobre serviços com alíquota configurável
                  (varia por município)
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default Home
