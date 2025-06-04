import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { SchedulePage } from '@/pages/SchedulePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { PrizesPage } from '@/pages/PrizesPage';
import { ContactPage } from '@/pages/ContactPage';
import { News } from '@/components/News/News.tsx';  

function App() {
  const [mounted, setMounted] = useState(false);
  
  // Ensure components are only rendered once the theme is available on the client
  useEffect(() => setMounted(true), []);
  
  // The app will only be rendered on the client, so add this check
  if (!mounted) return null;
  
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/programacao" element={<SchedulePage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/premios" element={<PrizesPage />} />
            <Route path="/contato" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;