import React from "react";
import { Link } from "react-router-dom";
import { Radio, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card mt-10 border-t">
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <Radio className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">Rádio Brasil FM</span>
            </div>
            <p className="text-muted-foreground mb-4">
              A melhor rádio online do Brasil, com música de qualidade 24 horas por dia!
            </p>
            <div className="flex space-x-4 mt-auto">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/programacao" className="text-muted-foreground hover:text-primary transition-colors">
                  Programação
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-muted-foreground hover:text-primary transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/premios" className="text-muted-foreground hover:text-primary transition-colors">
                  Prêmios
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Programas Populares</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programacao" className="text-muted-foreground hover:text-primary transition-colors">
                  Manhã Animada
                </Link>
              </li>
              <li>
                <Link to="/programacao" className="text-muted-foreground hover:text-primary transition-colors">
                  Tarde Brasileira
                </Link>
              </li>
              <li>
                <Link to="/programacao" className="text-muted-foreground hover:text-primary transition-colors">
                  Show da Noite
                </Link>
              </li>
              <li>
                <Link to="/programacao" className="text-muted-foreground hover:text-primary transition-colors">
                  Sexta Eletrônica
                </Link>
              </li>
              <li>
                <Link to="/programacao" className="text-muted-foreground hover:text-primary transition-colors">
                  Domingo Relaxante
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary mr-2 mt-0.5" />
                <span className="text-muted-foreground">
                  Av. Paulista, 1000<br />
                  São Paulo - SP<br />
                  Brasil
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-2" />
                <a href="tel:+551199999999" className="text-muted-foreground hover:text-primary">
                  +55 11 9999-9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary mr-2" />
                <a href="mailto:contato@radiobrasil.fm" className="text-muted-foreground hover:text-primary">
                  contato@radiobrasil.fm
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rádio Brasil FM. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}