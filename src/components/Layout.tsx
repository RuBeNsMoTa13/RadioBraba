import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-[#f9fafb71]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}