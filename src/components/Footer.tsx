// src/components/Footer.tsx
import { Link } from "react-router-dom";
import {
  Radio,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background text-gray-800 pt-10 border-t border-background dark:border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <Radio className="h-6 w-6 text-pink-600 mr-2" />
              <span className="font-semibold text-xl text-pink-600">Rádio Braba FM</span>
            </div>
            <p className="text-popover-foreground mb-4">
              A rádio que fala como o povo fala. Música e bate-papo 24h por dia!
            </p>
            <div className="flex space-x-4 mt-auto">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors"
              >
                <Facebook size={20} className="text-white" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors"
              >
                <Twitter size={20} className="text-white" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors"
              >
                <Instagram size={20} className="text-white" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors"
              >
                <Youtube size={20} className="text-white" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-pink-600">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Início
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Programação
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/galeria"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Galeria
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/premios"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Prêmios
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Contato
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Programas Populares */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-pink-600">Programas Populares</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/programacao"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Manhã Animada
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Tarde Brasileira
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Show da Noite
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Sexta Eletrônica
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  Domingo Relaxante
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-pink-600">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-pink-600 mr-2 mt-0.5" />
                <span className="text-popover-foreground">
                  Rua do Cruzeiro, 70<br />
                  Capela do Alto - SP<br />
                  Brasil
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-pink-600 mr-2" />
                <a
                  href="tel:+551199999999"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  +55 15 99615-6506
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-pink-600 mr-2" />
                <a
                  href="mailto:contato@ifnc.com.br"
                  className="flex items-center gap-2 text-popover-foreground hover:text-pink-600 transition-colors font-[450]"
                >
                  contato@ifnc.com.br
                  <ExternalLink size={15} className="text-popover-foreground hover:text-pink-600 transition-colors font-[450]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-background dark:border-border pt-6 text-center text-sm text-popover-foreground mb-8">
          <p>&copy; {new Date().getFullYear()} Rádio Braba FM. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
