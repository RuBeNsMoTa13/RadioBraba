import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface Metric {
  name: string;
  value: number;
  id: string;
}

// Função para enviar métricas para analytics (opcional)
function sendToAnalytics(metric: Metric) {
  // Para desenvolvimento, apenas logamos no console
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance Metric - ${metric.name}:`, metric.value);
  }
  
  // Em produção, você pode enviar para Google Analytics, etc.
  // gtag('event', metric.name, {
  //   event_category: 'Web Vitals',
  //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //   event_label: metric.id,
  // });
}

// Monitorar Core Web Vitals
export function measureWebVitals() {
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onINP(sendToAnalytics);  // Interaction to Next Paint (substitui FID)
  onFCP(sendToAnalytics);  // First Contentful Paint
  onLCP(sendToAnalytics);  // Largest Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}

// Performance observer para recursos carregados
export function observeResourceTiming() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Navigation Timing:', {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            firstPaint: navEntry.fetchStart - navEntry.requestStart,
          });
        }
        
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.duration > 1000) { // Recursos que demoram mais de 1s
            console.warn('Slow resource:', resourceEntry.name, resourceEntry.duration + 'ms');
          }
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation', 'resource'] });
  }
}

// Hook React para monitorar performance de componentes
export function usePerformanceMonitor(componentName: string) {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    if (renderTime > 16) { // Mais de um frame (60fps)
      console.warn(`Slow component render: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
  };
}
