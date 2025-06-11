import React, { useState } from 'react';
import { Newspaper, Search, Calendar, Megaphone, Filter, ChevronRight, DollarSign, Home, Heart, BookOpen, Landmark } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

interface Interview {
  id: number;
  name: string;
  role: string;
  topic: string;
  date: string;
  imageUrl: string;
}

interface CommunityPost {
  id: number;
  name: string;
  content: string;
  date: string;
  neighborhood: string;
  imageUrl?: string;
}

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'Todas', icon: <Newspaper size={18} /> },
    { id: 'commerce', name: 'Comércio', icon: <DollarSign size={18} /> },
    { id: 'neighborhoods', name: 'Bairros', icon: <Home size={18} /> },
    { id: 'health', name: 'Saúde', icon: <Heart size={18} /> },
    { id: 'education', name: 'Educação', icon: <BookOpen size={18} /> },
    { id: 'politics', name: 'Política', icon: <Landmark size={18} /> },
  ];
  
  const newsItems: NewsItem[] = [
    {
      id: 1,
      category: 'commerce',
      title: 'Nova feira de empreendedores locais acontece neste fim de semana',
      summary: 'Evento reunirá mais de 50 comerciantes de Capela com produtos artesanais, gastronomia e muito mais.',
      date: '12/05/2025',
      imageUrl: 'https://images.pexels.com/photos/375889/pexels-photo-375889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: true
    },
    {
      id: 2, 
      category: 'health',
      title: 'Campanha de vacinação contra gripe começa na próxima segunda',
      summary: 'Postos de saúde estarão abertos em horário estendido para atender toda a população.',
      date: '10/05/2025',
      imageUrl: 'https://images.pexels.com/photos/3786153/pexels-photo-3786153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      category: 'neighborhoods',
      title: 'Moradores do Bairro São José recebem melhorias na iluminação pública',
      summary: 'Prefeitura instalou 25 novos postes de LED após reivindicação da associação de moradores.',
      date: '09/05/2025',
      imageUrl: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      category: 'education',
      title: 'Escola Municipal ganha novo laboratório de informática',
      summary: 'Investimento de R$ 120 mil vai beneficiar mais de 500 alunos com equipamentos modernos.',
      date: '08/05/2025',
      imageUrl: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 5,
      category: 'politics',
      title: 'Câmara Municipal aprova projeto para revitalização da praça central',
      summary: 'Obras devem começar no próximo mês com previsão de conclusão em 60 dias.',
      date: '07/05/2025',
      imageUrl: 'https://images.pexels.com/photos/236415/pexels-photo-236415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 6,
      category: 'commerce',
      title: 'Associação Comercial lança campanha "Compre em Capela"',
      summary: 'Iniciativa incentiva consumo no comércio local com descontos e sorteios semanais.',
      date: '06/05/2025',
      imageUrl: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
  ];
  
  const interviews: Interview[] = [
    {
      id: 1,
      name: 'Dr. Carlos Mendes',
      role: 'Secretário de Saúde',
      topic: 'Novos investimentos na saúde pública de Capela',
      date: '11/05/2025',
      imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      name: 'Dona Maria do Bolo',
      role: 'Empreendedora Local',
      topic: 'Como transformei minha receita familiar em um negócio de sucesso',
      date: '09/05/2025',
      imageUrl: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      name: 'Professor Antônio Silva',
      role: 'Diretor da Escola Municipal',
      topic: 'Os desafios e conquistas da educação pública em nossa cidade',
      date: '07/05/2025',
      imageUrl: 'https://images.pexels.com/photos/5212335/pexels-photo-5212335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];
  
  const communityPosts: CommunityPost[] = [
    {
      id: 1,
      name: 'João Pereira',
      neighborhood: 'Centro',
      content: 'O buraco na Rua das Flores só aumenta e já causou três acidentes essa semana. Precisamos de uma solução urgente!',
      date: '12/05/2025',
      imageUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      name: 'Ana Souza',
      neighborhood: 'Vila Nova',
      content: 'Gostaria de agradecer a equipe da UBS Vila Nova pelo atendimento excepcional. Fui muito bem tratada e o médico foi super atencioso!',
      date: '10/05/2025'
    },
    {
      id: 3,
      name: 'Roberto Santos',
      neighborhood: 'São José',
      content: 'Nossa praça está precisando de manutenção nos brinquedos. As crianças não conseguem brincar com segurança.',
      date: '09/05/2025',
      imageUrl: 'https://images.pexels.com/photos/2853315/pexels-photo-2853315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const filteredNews = newsItems.filter(news => {
    const matchesCategory = activeCategory === 'all' || news.category === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          news.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsItems.find(news => news.featured);
  
  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="page-container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">NOTÍCIAS LOCAIS</h2>
          <p className="text-xl text-gray-600">Aqui não tem fake. Só o que rola de verdade em Capela.</p>
        </div>
        
        {/* Featured News */}
        {featuredNews && (
          <div className="mb-10 overflow-hidden rounded-xl shadow-lg group bg-white">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img 
                  src={featuredNews.imageUrl} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 bg-[#F63A9C] text-white py-1 px-3 rounded-br-lg">
                  DESTAQUE
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar size={16} className="text-[#F63A9C]" />
                    <span className="ml-2 text-sm text-gray-500">{featuredNews.date}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500 uppercase">{categories.find(c => c.id === featuredNews.category)?.name}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{featuredNews.title}</h3>
                  <p className="text-gray-600 mb-4">{featuredNews.summary}</p>
                </div>
                <a 
                  href="#" 
                  className="flex items-center text-[#F63A9C] font-medium hover:text-[#FF2C69] transition-colors"
                >
                  Ler matéria completa
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F63A9C] focus:border-[#F63A9C] block w-full pl-10 p-2.5"
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center overflow-x-auto md:overflow-visible scrollbar-hide space-x-2 pb-2 md:pb-0">
              <div className="text-sm font-medium text-gray-500 flex items-center whitespace-nowrap">
                <Filter size={16} className="mr-1" />
                Filtrar:
              </div>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex items-center whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-[#F63A9C] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredNews.filter(news => !news.featured).map((news) => (
            <div 
              key={news.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 h-48 overflow-hidden">
                <img 
                  src={news.imageUrl} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium uppercase px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {categories.find(c => c.id === news.category)?.name}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {news.date}
                  </span>
                </div>'
                <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{news.summary}</p>
                <a 
                  href="#" 
                  className="text-[#F63A9C] text-sm font-medium flex items-center hover:text-[#FF2C69] transition-colors"
                >
                  Ler mais
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Interview Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Megaphone size={24} className="text-[#F63A9C] mr-2" />
            <h3 className="text-2xl font-bold">Entrevistas Exclusivas</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {interviews.map((interview) => (
              <div 
                key={interview.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-w-3 aspect-h-2 h-52 overflow-hidden">
                  <img 
                    src={interview.imageUrl} 
                    alt={interview.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="bg-[#F63A9C] text-white text-xs font-medium px-2 py-1 rounded">
                      ENTREVISTA
                    </span>
                    <h4 className="text-white font-bold mt-1">{interview.name}</h4>
                    <p className="text-white text-sm opacity-90">{interview.role}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Calendar size={12} className="mr-1" />
                    {interview.date}
                  </div>
                  <p className="font-medium">{interview.topic}</p>
                  <a 
                    href="#" 
                    className="mt-3 inline-flex items-center text-[#F63A9C] text-sm font-medium hover:text-[#FF2C69] transition-colors"
                  >
                    Assistir entrevista
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        

        
        {/* Call to Action */}
      <div className="mt-8 text-center">
        <Button 
        asChild
      size="lg"
      className="font-semibold bg-white text-primary border-[1px] border-primary shadow-lg rounded-full px-8 py-4 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-105 text-black"
        >
          <Link to="#" className="">Ver todas as notícias</Link>
        </Button>
      </div>


      </div>
    </section>
  );
};

export default News;