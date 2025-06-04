import React from "react";
import { ContactForm } from "@/components/ContactPage/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Radio } from "lucide-react";

export function ContactPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Entre em Contato</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Informações de Contato</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block">Endereço</strong>
                    <address className="not-italic text-muted-foreground">
                      Av. Paulista, 1000<br />
                      São Paulo - SP, 01310-100<br />
                      Brasil
                    </address>
                  </div>
                </li>
                <li className="flex">
                  <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <strong className="block">Telefone</strong>
                    <a href="tel:+551199999999" className="text-muted-foreground hover:text-primary">
                      +55 11 9999-9999
                    </a>
                  </div>
                </li>
                <li className="flex">
                  <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <strong className="block">Email</strong>
                    <a href="mailto:contato@radiobrasil.fm" className="text-muted-foreground hover:text-primary">
                      contato@radiobrasil.fm
                    </a>
                  </div>
                </li>
                <li className="flex">
                  <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <strong className="block">Horário de Atendimento</strong>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 9h às 13h
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Radio className="h-5 w-5 text-primary mr-2" />
                Ao Vivo
              </h2>
              <p className="text-muted-foreground mb-4">
                Quer participar ao vivo da nossa programação?
                Entre em contato pelo WhatsApp:
              </p>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                WhatsApp da Rádio
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}