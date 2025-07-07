import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast"; 
import { ContactFormData } from "@/lib/types"; 
import {  Send, User, Mail, Phone, MessageSquare, MapPin, Clock, Radio, ChevronRight, Users, Heart, Building } from "lucide-react";

// Esquema de validação do formulário com Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos.",
  }),
  message: z.string().min(10, {
    message: "Mensagem deve ter pelo menos 10 caracteres.",
  }),
});

// Interfaces para os dados
interface ContactMethod {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  action: string;
  color: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export function ContactPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Função onSubmit para o formulário
  function onSubmit(values: ContactFormData) {
    console.log(values);
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    form.reset(); // Limpa o formulário após o envio
  }

  const contactMethods: ContactMethod[] = [
    {
      id: 'whatsapp',
      icon: <Phone size={24} />,
      title: 'WhatsApp',
      description: 'Resposta imediata durante o horário comercial',
      value: '(15) 99615-6506',
      action: 'Enviar mensagem',
      color: 'bg-green-500' 
    },
    {
      id: 'phone',
      icon: <Phone size={24} />,
      title: 'Telefone',
      description: 'Ligue diretamente para nossa central',
      value: '(11) 3333-3333',
      action: 'Fazer ligação',
      color: 'bg-blue-500' 
    },
    {
      id: 'email',
      icon: <Mail size={24} />,
      title: 'Email',
      description: 'Envie sua mensagem detalhada',
      value: 'contato@ifnc.com.br',
      action: 'Enviar email',
      color: 'bg-primary' 
    },
    {
      id: 'radio',
      icon: <Radio size={24} />,
      title: 'Ao Vivo',
      description: 'Participe dos programas ao vivo',
      value: 'Segunda à Sexta, 8h às 18h',
      action: 'Participar agora',
      color: 'bg-orange-500' 
    }
  ];

  // Dados para os horários de funcionamento
  const officeHours = [
    { day: 'Segunda à Sexta', hours: '08:00 - 18:00', status: 'Atendimento completo' },
    { day: 'Sábado', hours: '09:00 - 13:00', status: 'Plantão de final de semana' },
    { day: 'Domingo', hours: 'Fechado', status: 'Apenas programação automática' },
  ];

  // Dados para as Perguntas Frequentes (FAQs)
  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'Como posso participar dos programas ao vivo?',
      answer: 'Você pode ligar durante os programas ou enviar mensagem via WhatsApp. Nossos locutores adoram interagir com os ouvintes!'
    },
    {
      id: 2,
      question: 'Vocês divulgam eventos da comunidade?',
      answer: 'Sim! Adoramos divulgar eventos locais. Entre em contato conosco com antecedência para programarmos a divulgação.'
    },
    {
      id: 3,
      question: 'Como posso denunciar problemas na cidade?',
      answer: 'Envie sua denúncia via WhatsApp com fotos e localização. Nossa equipe de jornalismo investigará e dará o devido encaminhamento.'
    },
    {
      id: 4,
      question: 'Qual o horário de funcionamento da rádio?',
      answer: 'Nossa programação é 24h, mas o atendimento presencial é de segunda a sexta das 8h às 18h, e sábados das 9h às 13h.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#F63A9C] to-[#FF2C69] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4">FALE CONOSCO</h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6">Sua voz é nossa prioridade!</p>
            <div className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
              <div className="flex items-center my-1">
                <Clock size={14} className="mr-1" />
                <span>Resposta em até 24h</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center my-1">
                <Users size={14} className="mr-1" />
                <span>Atendimento personalizado</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center my-1">
                <Heart size={14} className="mr-1" />
                <span>Sempre à disposição</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16 bg-background transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">ENVIE SUA MENSAGEM</h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400">Preencha o formulário e nossa equipe entrará em contato</p>
          </div>

          {/* Grid container para alinhar formulário e info lado a lado */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">

            {/* Formulário de Contato */}
            <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                <div className="flex items-center mb-2 sm:mb-0">
                    <MessageSquare size={24} className="text-[#F63A9C] mr-2" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Formulário de Contato</h3>
                </div>
                <span className="ml-0 sm:ml-3 text-xs sm:text-sm bg-[#F63A9C] text-white px-2 py-1 rounded">
                  RESPOSTA EM 24H
                </span>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center text-sm sm:text-base">
                          <User size={16} className="mr-2 text-[#F63A9C]" />
                          Nome Completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome completo"
                            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#F63A9C] focus:border-[#F63A9C] rounded-lg transition-colors duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"> 
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center text-sm sm:text-base">
                            <Mail size={16} className="mr-2 text-[#F63A9C]" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="seu@email.com"
                              type="email"
                              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#F63A9C] focus:border-[#F63A9C] rounded-lg transition-colors duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center text-sm sm:text-base">
                            <Phone size={16} className="mr-2 text-[#F63A9C]" />
                            Telefone/WhatsApp
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(00) 00000-0000"
                              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#F63A9C] focus:border-[#F63A9C] rounded-lg transition-colors duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center text-sm sm:text-base">
                          <MessageSquare size={16} className="mr-2 text-[#F63A9C]" />
                          Sua Mensagem
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escreva sua mensagem, sugestão, crítica ou elogio aqui..."
                            className="min-h-[120px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#F63A9C] focus:border-[#F63A9C] rounded-lg transition-colors duration-200 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                          Compartilhe comentários, sugestões ou perguntas que você tenha. Sua opinião nos ajuda a melhorar!
                        </FormDescription>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Botão WhatsApp Direto no formulário */}
                  <div className="flex flex-col items-center justify-between bg-card p-4 rounded-lg transition-colors duration-200">
                    <div className="text-gray-700 dark:text-gray-200 mb-4 text-center">
                      <h4 className="font-medium text-base">Precisa de resposta rápida?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Entre em contato direto pelo WhatsApp!</p>
                    </div>

                    <a
                      href="https://wa.me/5515996156506"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      <Phone size={18} className="mr-2" />
                      WhatsApp Direto
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#F63A9C] hover:bg-[#FF2C69] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center text-base"
                  >
                    <Send size={18} className="mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </Form>
            </div>

            {/* Informações do Escritório e Horários */}
            <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <MapPin size={24} className="text-[#F63A9C] mr-2" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Nossa Localização</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Building size={20} className="text-[#F63A9C] mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white text-base">Endereço</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Rua do Cruzeiro, 70<br />Centro - Capela do Alto, SP<br />CEP: 18195-078</p>
                  </div>
                </div>
                {/* Rubens, ajuste o src do iframe do mapa aqui! */}
                <div className="relative overflow-hidden w-full h-48 sm:h-64 rounded-lg"> 
                  <iframe
                    title="Mapa interativo"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0773600000003!2d-47.88607102439002!3d-23.528405059695843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf54805e5d36e7%3A0x6b4c10398b1e4f40!2sR.%20do%20Cruzeiro%2C%2070%20-%20Centro%2C%20Capela%20do%20Alto%20-%20SP%2C%2018195-000!5e0!3m2!1spt-BR!2sbr!4v1719438012345!5m2!1spt-BR!2sbr"
                  ></iframe>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <Clock size={24} className="text-[#F63A9C] mr-2" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Horário de Funcionamento</h3>
              </div>

              <div className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">{schedule.day}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{schedule.status}</p>
                    </div>
                    <span className="font-bold text-[#F63A9C] text-sm sm:text-base mt-1 sm:mt-0">{schedule.hours}</span>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-[#F63A9C] bg-opacity-10 dark:bg-opacity-20 rounded-lg transition-colors duration-200">
                  <div className="flex items-center text-[#F63A9C] mb-2">
                    <Radio size={20} className="mr-2" />
                    <h4 className="font-bold text-base">Programação 24h</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-200">Nossa rádio toca 24 horas por dia, todos os dias do ano!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-12 md:py-16 bg-background transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">ESCOLHA COMO FALAR CONOSCO</h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400">Vários canais para você se conectar com a gente</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12"> {/* Ajuste para 2 colunas em sm e 4 em lg */}
            {contactMethods.map((method) => (
              <div
                key={method.id}
                className="bg-card rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center text-white mb-4 mx-auto`}>
                  {method.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2 text-gray-800 dark:text-white">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-3">{method.description}</p>
                <p className="font-medium text-center mb-4 text-gray-700 dark:text-gray-200 text-sm">{method.value}</p>
                <Button className="w-full bg-[#F63A9C] hover:bg-[#FF2C69] text-white transition-colors duration-200 text-sm sm:text-base">
                  {method.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-background transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">DÚVIDAS FREQUENTES</h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400">Respostas para as perguntas mais comuns</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-card rounded-lg shadow-md mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <button
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-800 dark:text-white"
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                >
                  <h3 className="font-bold text-base sm:text-lg">{faq.question}</h3>
                  <ChevronRight
                    size={20}
                    className={`text-[#F63A9C] transform transition-transform duration-200 ${expandedFAQ === faq.id ? 'rotate-90' : ''}`}
                  />
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#F63A9C] to-[#FF2C69] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">AINDA TEM DÚVIDAS?</h2>
          <p className="text-base sm:text-xl mb-6 md:mb-8">Nossa equipe está sempre pronta para ajudar você!</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/5515996156506"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white text-[#F63A9C] px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
            >
              <Phone size={18} className="mr-2" />
              Falar no WhatsApp
            </a>

            <a
              href="tel:+5515996156506"
              className="flex items-center bg-transparent border-2 border-white text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-bold hover:bg-white hover:text-[#F63A9C] transition-colors duration-200 text-sm sm:text-base"
            >
              <Phone size={18} className="mr-2" />
              Ligar Agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}