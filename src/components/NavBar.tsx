import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { RadioPlayer } from "@/components/RadioPlayer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, Radio, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavItemProps = {
  to: string;
  label: string;
  isMobile?: boolean;
  onClick?: () => void;
};

function NavItem({ to, label, isMobile, onClick }: NavItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "transition-colors duration-200",
        isMobile
          ? "block py-3 px-4 hover:bg-primary/10 rounded-md font-medium"
          : "px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10"
      )}
    >
      {label}
    </Link>
  );
}

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { to: "/", label: "Início" },
    { to: "/programacao", label: "Programação" },
    { to: "/galeria", label: "Galeria" },
    { to: "/locutores", label: "Locutores" },
    { to: "/premios", label: "Prêmios" },
    { to: "/contato", label: "Contato" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
        <div className="container flex h-16 items-center">
          {/* Desktop logo */}
          <div className="mr-4 flex md:flex">
            <Link to="/" className="hidden md:flex items-center space-x-2">
              <img src="/images/RadioBraba.png" alt="Logo Rádio Braba FM" className="h-20 w-20" />
              <span className="font-bold text-xl">Rádio Braba</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <div className="hover:text-primary font-medium" key={item.to}>
                  <NavItem to={item.to} label={item.label} />
                </div>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPlayer(!showPlayer)}
                aria-label="Toggle radio player"
              >
                <Radio className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button asChild variant="default">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
          {/* Mobile logo */}
          <div className="flex items-center absolute left-0 z-20 md:hidden ml-2 sm:ml-4">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img src="/images/RadioBraba.png" alt="Logo Rádio Braba FM" className="h-12 w-12" />
              <span className="font-bold text-lg whitespace-nowrap ml-2">Rádio Braba</span>
            </Link>
          </div>
          {/* Right side buttons */}
          <div className="flex flex-1 items-center justify-end md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPlayer(!showPlayer)}
              aria-label="Toggle radio player"
              className="mr-2"
            >
              <Radio className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                      <Radio className="h-6 w-6 text-primary" />
                      <span className="font-bold text-xl whitespace-nowrap">Rádio Braba FM</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col">
                    {navItems.map((item) => (
                      <NavItem
                        key={item.to}
                        to={item.to}
                        label={item.label}
                        isMobile
                        onClick={closeMobileMenu}
                      />
                    ))}
                    <div className="mt-4 px-4">
                      <Button
                        asChild
                        variant="default"
                        className="w-full"
                        onClick={closeMobileMenu}
                      >
                        <Link to="/login" className="flex justify-center">
                          Login
                        </Link>
                      </Button>
                    </div>

                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {showPlayer && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
          <RadioPlayer />
        </div>
      )}
    </>
  );
}