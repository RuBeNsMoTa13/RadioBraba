import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { measureWebVitals, observeResourceTiming } from './lib/performance';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Inicializar monitoramento de performance
measureWebVitals();
observeResourceTiming();
