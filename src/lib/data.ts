import { GalleryImage, Prize, Show, Host } from "./types";

export const radioStations = [
  {
    name: "Brabo FM",
    streamUrl: "https://uk3freenew.listen2myradio.com/live.mp3?typeportmount=s1_24105_stream_386281298", // <-- Use esta URL!
    currentSong: "Sem informação",
    currentSongImage: ""
  }
];

export const hostsData: Host[] = [
  {
    id: 1,
    name: "Carlos Santos",
    image: "https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg",
    bio: "Com mais de 15 anos de experiência em rádio, Carlos traz energia e alegria para suas manhãs.",
    shows: ["Manhã Animada"],
    socialMedia: {
      instagram: "https://instagram.com/carlossantos",
      twitter: "https://twitter.com/carlossantos"
    }
  },
  {
    id: 2,
    name: "Ana Silva",
    image: "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg",
    bio: "Especialista em MPB e música brasileira contemporânea, Ana apresenta os melhores sons nacionais.",
    shows: ["Tarde Brasileira"],
    socialMedia: {
      instagram: "https://instagram.com/anasilva",
      facebook: "https://facebook.com/anasilva"
    }
  },
  {
    id: 3,
    name: "Roberto Oliveira",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    bio: "DJ e produtor musical, Roberto é a voz que anima suas noites com os melhores hits.",
    shows: ["Show da Noite"],
    socialMedia: {
      instagram: "https://instagram.com/robertooliveira",
      twitter: "https://twitter.com/robertooliveira"
    }
  },
  {
    id: 4,
    name: "Juliana Paiva",
    image: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
    bio: "Apresentadora e jornalista, Juliana traz as melhores seleções para seu domingo.",
    shows: ["Domingo Relaxante"],
    socialMedia: {
      instagram: "https://instagram.com/julianapaiva",
      facebook: "https://facebook.com/julianapaiva"
    }
  }
];

export const showsData: Show[] = [
  {
    id: 1,
    title: "Manhã Animada",
    host: "Carlos Santos",
    time: "06:00 - 09:00",
    day: 1, // Monday
    description: "Comece o dia com muita energia e as melhores músicas!",
    image: "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg"
  },
  {
    id: 2,
    title: "Tarde Brasileira",
    host: "Ana Silva",
    time: "12:00 - 15:00",
    day: 1, // Monday
    description: "O melhor da MPB para sua tarde de trabalho.",
    image: "https://images.pexels.com/photos/4090902/pexels-photo-4090902.jpeg"
  },
  {
    id: 3,
    title: "Show da Noite",
    host: "Roberto Oliveira",
    time: "19:00 - 22:00",
    day: 1, // Monday
    description: "Entretenimento e música para animar sua noite.",
    image: "https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg"
  },
  {
    id: 4,
    title: "Clássicos do Rock",
    host: "Pedro Mendes",
    time: "14:00 - 17:00",
    day: 2, // Tuesday
    description: "Os maiores sucessos do rock nacional e internacional.",
    image: "https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg"
  },
  {
    id: 5,
    title: "Samba & Pagode",
    host: "Fernanda Lima",
    time: "15:00 - 18:00",
    day: 3, // Wednesday
    description: "O melhor do samba e pagode para animar seu dia.",
    image: "https://images.pexels.com/photos/7280159/pexels-photo-7280159.jpeg"
  },
  {
    id: 6,
    title: "Bate-papo Cultural",
    host: "Mariana Torres",
    time: "09:00 - 12:00",
    day: 4, // Thursday
    description: "Discussões sobre cultura, música e entretenimento.",
    image: "https://images.pexels.com/photos/5699519/pexels-photo-5699519.jpeg"
  },
  {
    id: 7,
    title: "Sexta Eletrônica",
    host: "DJ Felipe",
    time: "22:00 - 01:00",
    day: 5, // Friday
    description: "As melhores batidas para começar seu fim de semana.",
    image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg"
  },
  {
    id: 8,
    title: "Madrugada Especial",
    host: "Lucas Ferreira",
    time: "00:00 - 03:00",
    day: 6, // Saturday
    description: "Músicas selecionadas para quem está acordado de madrugada.",
    image: "https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg"
  },
  {
    id: 9,
    title: "Domingo Relaxante",
    host: "Juliana Paiva",
    time: "10:00 - 13:00",
    day: 0, // Sunday
    description: "Músicas calmas para um domingo tranquilo.",
    image: "https://images.pexels.com/photos/634541/pexels-photo-634541.jpeg"
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Festival de Verão 2024",
    src: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    alt: "Festival de Verão 2024",
    date: "15/01/2024",
    event: "Festival de Verão"
  },
  {
    id: 2,
    title: "Show ao Vivo",
    src: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    alt: "Show ao Vivo na Rádio",
    date: "05/02/2024",
    event: "Show ao Vivo"
  },
  {
    id: 3,
    title: "Entrevista Especial",
    src: "https://images.pexels.com/photos/2747448/pexels-photo-2747448.jpeg",
    alt: "Entrevista com Artista",
    date: "20/02/2024",
    event: "Entrevista"
  },
  {
    id: 4,
    title: "Carnaval 2024",
    src: "https://images.pexels.com/photos/5319385/pexels-photo-5319385.jpeg",
    alt: "Cobertura do Carnaval",
    date: "13/02/2024",
    event: "Carnaval"
  },
  {
    id: 5,
    title: "Lançamento de Álbum",
    src: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg",
    alt: "Evento de Lançamento",
    date: "10/03/2024",
    event: "Lançamento"
  },
  {
    id: 6,
    title: "Feira de Música",
    src: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg",
    alt: "Stand na Feira de Música",
    date: "25/03/2024",
    event: "Feira"
  },
  {
    id: 7,
    title: "DJ Set Especial",
    src: "https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg",
    alt: "DJ Set na Rádio",
    date: "07/04/2024",
    event: "DJ Set"
  },
  {
    id: 8,
    title: "Aniversário da Rádio",
    src: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
    alt: "Festa de Aniversário",
    date: "15/04/2024",
    event: "Aniversário"
  },
  {
    id: 9,
    title: "Sessão Acústica",
    src: "https://images.pexels.com/photos/1813124/pexels-photo-1813124.jpeg",
    alt: "Apresentação Acústica",
    date: "22/04/2024",
    event: "Acústico"
  }
];

export const prizesData: Prize[] = [
  {
    id: 1,
    title: "Ingressos para Show Premium",
    description: "Ganhe um par de ingressos para o show especial que acontecerá no próximo mês.",
    image: "https://images.pexels.com/photos/3328892/pexels-photo-3328892.jpeg",
    endDate: new Date(2025, 6, 15) // July 15, 2025
  },
  {
    id: 2,
    title: "Kit Exclusivo",
    description: "Concorra a um kit exclusivo com camiseta, boné e caneca personalizada da Rádio Brasil FM.",
    image: "https://images.pexels.com/photos/4066841/pexels-photo-4066841.jpeg",
    endDate: new Date(2025, 5, 30) // June 30, 2025
  },
  {
    id: 3,
    title: "Sessão de Estúdio",
    description: "Grave uma música profissionalmente em nosso estúdio com equipe técnica completa.",
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
    endDate: new Date(2025, 7, 5) // August 5, 2025
  }
];