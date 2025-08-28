import path from 'path';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      
      targets: ['defaults', 'IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Configuração de build otimizada para code splitting
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Chunk do React e dependências core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Chunk das UI libraries
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-icons', 
            '@radix-ui/react-label',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            'lucide-react'
          ],
          
          // Chunk das libraries de carousel e animação
          'carousel-vendor': [
            'embla-carousel',
            'embla-carousel-autoplay', 
            'embla-carousel-react'
          ],
          
          // Chunk das libraries de forma e validação
          'form-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          
          // Chunk do Supabase e axios
          'api-vendor': ['@supabase/supabase-js', 'axios'],
          
          // Chunk das utility libraries
          'utils-vendor': [
            'class-variance-authority',
            'clsx', 
            'tailwind-merge'
          ]
        }
      }
    },
    // Configurações de otimização
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    // Configurar thresholds para warnings de tamanho
    chunkSizeWarningLimit: 1000
  },
});