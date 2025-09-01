import { useEffect } from 'react';

type PreloadFunction = () => Promise<unknown>;

export function usePreloadRoute(preloadFunction: PreloadFunction, shouldPreload = true) {
  useEffect(() => {
    if (shouldPreload) {
      // Preload após um pequeno delay para não interferir no carregamento inicial
      const timer = setTimeout(() => {
        preloadFunction().catch(console.error);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [preloadFunction, shouldPreload]);
}

// Funções de preload para cada rota
export const preloadRoutes = {
  home: () => import('@/pages/HomePage'),
  schedule: () => import('@/pages/SchedulePage'),
  gallery: () => import('@/pages/InstaPage'),
  prizes: () => import('@/pages/PrizesPage'),
  contact: () => import('@/pages/ContactPage'),
  announcers: () => import('@/pages/AnnouncerPage'),
  login: () => import('@/components/LoginPage/LoginPage'),
  register: () => import('@/components/RegisterPage/RegisterPage'),
  view: () => import('@/pages/ViewPage'),
};

// Hook para preload baseado na rota atual
export function useRoutePreload(currentRoute: string) {
  useEffect(() => {
    // Preload de rotas baseado na rota atual
    const preloadMap: Record<string, (() => Promise<unknown>)[]> = {
      '/': [preloadRoutes.schedule, preloadRoutes.prizes], // Na home, preload páginas relacionadas
      '/programacao': [preloadRoutes.announcers, preloadRoutes.home],
      '/locutores': [preloadRoutes.schedule, preloadRoutes.contact],
      '/galeria': [preloadRoutes.home, preloadRoutes.prizes],
      // Adicione mais conforme necessário
    };

    const routesToPreload = preloadMap[currentRoute];
    if (routesToPreload) {
      const timer = setTimeout(() => {
        routesToPreload.forEach(preload => {
          preload().catch(console.error);
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [currentRoute]);
}
