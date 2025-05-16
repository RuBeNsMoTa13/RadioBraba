import React, { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/mode-toggle";

type AppProps = {
  children: ReactNode;
};

function App({children}: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      {children}
    </ThemeProvider>
  );
}

export default App
