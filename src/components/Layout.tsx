import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useRoutePreload } from "@/hooks/use-preload";

export function Layout() {
  const location = useLocation();
  
  // Preload inteligente baseado na rota atual
  useRoutePreload(location.pathname);

  return (
    <div className="flex min-h-screen flex-col webkit-scrollbar">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}