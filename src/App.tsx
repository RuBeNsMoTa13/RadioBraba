import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { SchedulePage } from '@/pages/SchedulePage';
import { InstaPage } from '@/pages/InstaPage';
import { PrizesPage } from '@/pages/PrizesPage';
import { ContactPage } from '@/pages/ContactPage';
import AnnouncerPage from '@/pages/AnnouncerPage';
import { LoginPage } from '@/components/LoginPage/LoginPage'; // Importar LoginPage do novo caminho
import { RegisterPage } from '@/components/RegisterPage/RegisterPage'; // Importar RegisterPage do novo caminho
import { RadioPlayerProvider } from "@/context/RadioPlayerContext";
import  { ViewPage }  from '@/pages/ViewPage';

function App() {
  const [mounted, setMounted] = useState(false);
  
  // Ensure components are only rendered once the theme is available on the client
  useEffect(() => setMounted(true), []);
  
  // The app will only be rendered on the client, so add this check
  if (!mounted) return null;
  
  return (
    <RadioPlayerProvider>
      <ThemeProvider defaultTheme="light">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/programacao" element={<SchedulePage />} />
              <Route path="/galeria" element={<InstaPage />} />
              <Route path="/premios" element={<PrizesPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/locutores" element={<AnnouncerPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastro" element={<RegisterPage />} />
            </Route>
            <Route path="/exibicao" element={<ViewPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </RadioPlayerProvider>
  );
}

export default App;