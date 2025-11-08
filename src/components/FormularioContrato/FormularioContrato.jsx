import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Alert,
  Box,
  Divider,
} from '@mui/material'
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material'
import useForm from '../../hooks/useForm'
import {
  validarValorBruto,
  validarValorLiquido,
  validarDependentes,
  validarAliquotaISS,
  calcularBrutoAPartirDoLiquido,
} from '../../utils/tributosCalculos'
import { validarCPF, validarEmail } from '../../utils/helpers'
import { useState } from 'react'

/**
 * Componente de formulário para contratos de autônomos
 * Suporta cálculo a partir do bruto ou do líquido
 */
const FormularioContrato = ({ contratoInicial = null, onSalvar, onCancelar, modoCalculo = 'bruto' }) => {
  const [avisoCalculoLiquido, setAvisoCalculoLiquido] = useState(null)

  // Validações do formulário usando destructuring
  const validacoes = {
    nomeAutonomo: (valor) => {
      if (!valor || valor.trim() === '') return 'Nome é obrigatório'
      if (valor.length < 3) return 'Nome deve ter pelo menos 3 caracteres'
      return null
    },
    cpf: (valor) => {
      if (!valor) return 'CPF é obrigatório'
      if (!validarCPF(valor)) return 'CPF inválido'
      return null
    },
    email: (valor) => {
      if (!valor) return 'E-mail é obrigatório'
      if (!validarEmail(valor)) return 'E-mail inválido'
      return null
    },
    valorBruto: (valor) => {
      if (modoCalculo === 'bruto') {
        const { valido, mensagem } = validarValorBruto(valor)
        return valido ? null : mensagem
      }
      return null
    },
    valorLiquido: (valor) => {
      if (modoCalculo === 'liquido') {
        const { valido, mensagem } = validarValorLiquido(valor)
        return valido ? null : mensagem
      }
      return null
    },
    dependentes: (valor) => {
      const { valido, mensagem } = validarDependentes(valor)
      return valido ? null : mensagem
    },
    aliquotaISS: (valor) => {
      const { valido, mensagem } = validarAliquotaISS(valor)
      return valido ? null : mensagem
    },
  }

  // Valores iniciais usando spread operator
  const valoresIniciais = {
    nomeAutonomo: contratoInicial?.nomeAutonomo || '',
    cpf: contratoInicial?.cpf || '',
    email: contratoInicial?.email || '',
    telefone: contratoInicial?.telefone || '',
    endereco: contratoInicial?.endereco || '',
    valorBruto: contratoInicial?.valorBruto || '',
    valorLiquido: contratoInicial?.valorLiquido || '',
    dependentes: contratoInicial?.dependentes || 0,
    aliquotaISS: contratoInicial?.aliquotaISS || 5,
    incluirISS: contratoInicial?.incluirISS !== undefined ? contratoInicial.incluirISS : true,
    descricaoServico: contratoInicial?.descricaoServico || '',
    observacoes: contratoInicial?.observacoes || '',
  }

  // Hook personalizado useForm com destructuring
  const {
    valores,
    erros,
    tocado,
    handleChange,
    handleBlur,
    validarTodos,
    resetar,
  } = useForm(valoresIniciais, validacoes)

  // Handler de submit usando arrow function
  const handleSubmit = (e) => {
    e.preventDefault()
    setAvisoCalculoLiquido(null)

    if (!validarTodos()) {
      return
    }

    // Se modo é líquido, calcular o bruto necessário
    if (modoCalculo === 'liquido') {
      try {
        const resultado = calcularBrutoAPartirDoLiquido({
          valorLiquido: parseFloat(valores.valorLiquido),
          dependentes: parseInt(valores.dependentes),
          aliquotaISS: parseFloat(valores.aliquotaISS),
          incluirISS: valores.incluirISS
        })

        if (!resultado.sucesso) {
          setAvisoCalculoLiquido(resultado.aviso)
        }

        // Preparar dados com o valor bruto calculado
        const dadosContrato = {
          ...valores,
          valorBruto: resultado.valorBrutoNecessario,
          valorLiquido: parseFloat(valores.valorLiquido),
          dependentes: parseInt(valores.dependentes),
          aliquotaISS: parseFloat(valores.aliquotaISS),
          calculadoAPartirDoLiquido: true,
          iteracoes: resultado.iteracoes
        }

        // Passar o resultado completo
        onSalvar(dadosContrato, resultado.resultado)
      } catch (error) {
        setAvisoCalculoLiquido(`Erro ao calcular: ${error.message}`)
        return
      }
    } else {
      // Modo bruto normal
      const dadosContrato = {
        ...valores,
        valorBruto: parseFloat(valores.valorBruto),
        dependentes: parseInt(valores.dependentes),
        aliquotaISS: parseFloat(valores.aliquotaISS),
      }

      onSalvar(dadosContrato)
    }
  }

  // Handler de cancelamento usando arrow function
  const handleCancelar = () => {
    resetar()
    onCancelar?.()
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {contratoInicial ? 'Editar Contrato' : 'Novo Contrato'}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Dados do Autônomo */}
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>
                Dados do Autônomo
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Nome Completo"
                name="nomeAutonomo"
                value={valores.nomeAutonomo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={tocado.nomeAutonomo && Boolean(erros.nomeAutonomo)}
                helperText={tocado.nomeAutonomo && erros.nomeAutonomo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="CPF"
                name="cpf"
                value={valores.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                error={tocado.cpf && Boolean(erros.cpf)}
                helperText={tocado.cpf && erros.cpf}
                placeholder="000.000.000-00"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="email"
                label="E-mail"
                name="email"
                value={valores.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={tocado.email && Boolean(erros.email)}
                helperText={tocado.email && erros.email}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={valores.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Endereço"
                name="endereco"
                value={valores.endereco}
                onChange={handleChange}
              />
            </Grid>

            {/* Dados do Contrato */}
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                Dados do Contrato
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Descrição do Serviço"
                name="descricaoServico"
                value={valores.descricaoServico}
                onChange={handleChange}
              />
            </Grid>

            {/* Cálculos Tributários */}
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                Cálculos Tributários
              </Typography>
            </Grid>

            {avisoCalculoLiquido && (
              <Grid item xs={12}>
                <Alert severity="warning">{avisoCalculoLiquido}</Alert>
              </Grid>
            )}

            {/* Campo de valor - Bruto ou Líquido dependendo do modo */}
            <Grid item xs={12} md={4}>
              {modoCalculo === 'bruto' ? (
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Valor Bruto (R$)"
                  name="valorBruto"
                  value={valores.valorBruto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={tocado.valorBruto && Boolean(erros.valorBruto)}
                  helperText={tocado.valorBruto && erros.valorBruto}
                  inputProps={{ step: '0.01', min: '0' }}
                />
              ) : (
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Valor Líquido Desejado (R$)"
                  name="valorLiquido"
                  value={valores.valorLiquido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={tocado.valorLiquido && Boolean(erros.valorLiquido)}
                  helperText={tocado.valorLiquido && erros.valorLiquido || 'O sistema calculará o valor bruto necessário'}
                  inputProps={{ step: '0.01', min: '0' }}
                />
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Número de Dependentes"
                name="dependentes"
                value={valores.dependentes}
                onChange={handleChange}
                onBlur={handleBlur}
                error={tocado.dependentes && Boolean(erros.dependentes)}
                helperText={tocado.dependentes && erros.dependentes}
                inputProps={{ min: '0', max: '10' }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Alíquota ISS (%)"
                name="aliquotaISS"
                value={valores.aliquotaISS}
                onChange={handleChange}
                onBlur={handleBlur}
                error={tocado.aliquotaISS && Boolean(erros.aliquotaISS)}
                helperText={tocado.aliquotaISS && erros.aliquotaISS}
                disabled={!valores.incluirISS}
                inputProps={{ step: '0.01', min: '0', max: '100' }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={valores.incluirISS}
                    onChange={handleChange}
                    name="incluirISS"
                    color="primary"
                  />
                }
                label="Incluir ISS no cálculo"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observações"
                name="observacoes"
                value={valores.observacoes}
                onChange={handleChange}
              />
            </Grid>

            {/* Botões de ação */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelar}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  Salvar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormularioContrato
