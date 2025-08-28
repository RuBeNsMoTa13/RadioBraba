import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/Layout';
import { RadioPlayerProvider } from "@/context/RadioPlayerContext";
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Lazy loading das páginas para code splitting
const HomePage = lazy(() => import('@/pages/HomePage').then(module => ({ default: module.HomePage })));
const SchedulePage = lazy(() => import('@/pages/SchedulePage').then(module => ({ default: module.SchedulePage })));
const InstaPage = lazy(() => import('@/pages/InstaPage').then(module => ({ default: module.InstaPage })));
const PrizesPage = lazy(() => import('@/pages/PrizesPage').then(module => ({ default: module.PrizesPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(module => ({ default: module.ContactPage })));
const AnnouncerPage = lazy(() => import('@/pages/AnnouncerPage'));
const LoginPage = lazy(() => import('@/components/LoginPage/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('@/components/RegisterPage/RegisterPage').then(module => ({ default: module.RegisterPage })));
const ViewPage = lazy(() => import('@/pages/ViewPage').then(module => ({ default: module.ViewPage })));

function App() {
  const [mounted, setMounted] = useState(false);
  
  // Ensure components are only rendered once the theme is available on the client
  useEffect(() => setMounted(true), []);
  
  // The app will only be rendered on the client, so add this check
  if (!mounted) return null;
  
  return (
    <ErrorBoundary>
      <RadioPlayerProvider>
        <ThemeProvider defaultTheme="light">
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <HomePage />
                  </Suspense>
                } />
                <Route path="/programacao" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <SchedulePage />
                  </Suspense>
                } />
                <Route path="/galeria" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <InstaPage />
                  </Suspense>
                } />
                <Route path="/premios" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <PrizesPage />
                  </Suspense>
                } />
                <Route path="/contato" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ContactPage />
                  </Suspense>
                } />
                <Route path="/locutores" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AnnouncerPage />
                  </Suspense>
                } />
                <Route path="/login" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <LoginPage />
                  </Suspense>
                } />
                <Route path="/cadastro" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <RegisterPage />
                  </Suspense>
                } />
              </Route>
              <Route path="/exibicao" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ViewPage />
                </Suspense>
              } />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </ThemeProvider>
      </RadioPlayerProvider>
    </ErrorBoundary>
  );
}

export default App;