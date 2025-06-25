// src/components/Footer.tsx
import React from "react";
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
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background text-gray-800 pt-10 border-t-2 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <Radio className="h-6 w-6 text-pink-600 mr-2" />
              <span className="font-semibold text-xl text-pink-600">Rádio Brasil FM</span>
            </div>
            <p className="text-secondary-foreground mb-4">
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
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Programação
                </Link>
              </li>
              <li>
                <Link
                  to="/galeria"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Galeria
                </Link>
              </li>
              <li>
                <Link
                  to="/premios"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Prêmios
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Contato
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
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Manhã Animada
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Tarde Brasileira
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Show da Noite
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Sexta Eletrônica
                </Link>
              </li>
              <li>
                <Link
                  to="/programacao"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  Domingo Relaxante
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
                <span className="text-secondary-foreground">
                  Av. Paulista, 1000<br />
                  São Paulo - SP<br />
                  Brasil
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-pink-600 mr-2" />
                <a
                  href="tel:+551199999999"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  +55 11 9999-9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-pink-600 mr-2" />
                <a
                  href="mailto:contato@radiobrasil.fm"
                  className="text-secondary-foreground hover:text-pink-600 transition-colors font-medium"
                >
                  contato@radiobrasil.fm
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-secondary-foreground mb-8">
          <p>&copy; {new Date().getFullYear()} Rádio Brasil FM. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
