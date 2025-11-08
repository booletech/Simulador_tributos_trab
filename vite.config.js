import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Otimizações de build para melhor performance
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    rollupOptions: {
      // Code splitting manual para bibliotecas grandes
      output: {
        manualChunks: {
          // Chunk separado para React e React-DOM
          'react-vendor': ['react', 'react-dom'],
          // Chunk separado para Material-UI
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          // Chunk separado para outras bibliotecas
          'vendor': ['axios', 'react-router-dom']
        },
        // Otimizar nomes dos arquivos
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Configurações para otimização de bundle
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Desabilita sourcemaps em produção
    reportCompressedSize: false // Acelera o build
  },
  optimizeDeps: {
    // Pre-bundling de dependências para desenvolvimento mais rápido
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      'axios'
    ]
  },
  // Cache configuration para builds mais rápidos
  cacheDir: 'node_modules/.vite',
  // Configuração para melhor tree-shaking
  define: {
    // Remove código de desenvolvimento em produção
    __DEV__: process.env.NODE_ENV !== 'production'
  }
})
