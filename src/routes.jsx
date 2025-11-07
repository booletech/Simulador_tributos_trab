import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Calcular from './pages/Calcular'
import Contratos from './pages/Contratos'
import ContratoForm from './pages/ContratoForm'
import ContratoDetalhes from './pages/ContratoDetalhes'

/**
 * Configuração de rotas da aplicação
 * Utiliza React Router v6 com rotas aninhadas
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas com Layout */}
      <Route path="/" element={<Layout />}>
        {/* Rota inicial */}
        <Route index element={<Home />} />

        {/* Rota de cálculo */}
        <Route path="calcular" element={<Calcular />} />

        {/* Rotas de contratos */}
        <Route path="contratos">
          <Route index element={<Contratos />} />
          <Route path="novo" element={<ContratoForm />} />
          <Route path="editar/:id" element={<ContratoForm />} />
          <Route path=":id" element={<ContratoDetalhes />} />
        </Route>

        {/* Rota 404 - Redirecionar para home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
