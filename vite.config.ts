import path from 'path';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy'; // Importamos o plugin legacy
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    legacy({ // Adicionamos a configuração do plugin legacy
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  server: {
    // ligar somente para testar na tv emulada
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
});