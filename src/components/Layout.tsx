import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}