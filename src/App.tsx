import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/mode-toggle";
import { Header } from "./components/Header";

type AppProps = {
  children: React.ReactNode;
};

function App({children}: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   <Header />
      <div className="container flex flex-col items-center justify-center min-h-screen p-4">
        {children}
      </div>
    </ThemeProvider>
  );
}

export default App
