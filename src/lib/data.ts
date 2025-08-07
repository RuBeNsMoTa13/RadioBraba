import { Prize, Show, Locutor } from "./types";

export const radioStations = [
  {
    name: "Brabo FM",
    streamUrl: "https://stm16.xcast.com.br:9186/stream", 
    currentSong: "Sem informação",
    currentSongImage: ""
  }
];

export const showsData: Show[] = [
  {
    // Segunda-feira (day: 1)
    id: 1,
    title: "Classicos da Braba",
    host: "Paulinho do Povo",
    time: "07:00 - 09:15",
    day: 1,
    description: "Os clássicos que marcaram época, você ouve aqui!",
    image: "/images/Programas/classicosBraba.png"
  },
  {
    id: 2,
    title: "Manhã Sertaneja",
    host: "Paulinho do Povo",
    time: "07:00 - 09:15",
    day: 1,
    description: "Comece o dia com muita energia e as melhores músicas sertanejas!",
    image: "/images/Programas/manhaSertaneja.png"
  },
  {
    id: 3,
    title: "Obrigado Homem do Campo",
    host: "Toninho",
    time: "09:30 - 11:00",
    day: 1,
    description: "Notícias, dicas e muita música para o homem do campo.",
    image: "/images/Programas/homemCampo.png"
  },
  {
    id: 4,
    title: "Bate-Bola com Nenê Quevedo",
    host: "Nenê Quevedo",
    time: "11:00 - 13:00",
    day: 1,
    description: "Tudo sobre futebol com os comentarios de Nenê Quevedo.",
    image: "/images/Programas/bateBola.png"
  },
  {
    id: 5,
    title: "As Brabas do Momento 1ª Edição",
    host: "Fred",
    time: "13:00 - 14:30",
    day: 1,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento1.png"
  },
  {
    id: 6,
    title: "Solta a Braba!",
    host: "Mariana Lopes",
    time: "14:30 - 17:00",
    day: 1,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/soltaaBraba.png"
  },
  {
    id: 7,
    title: "Hora do Rush",
    host: "Fred",
    time: "17:00 - 18:00",
    day: 1,
    description: "Hora do Rush na Braba pra chegar em casa bem informado e bem acompanhado!",
    image: "/images/Programas/horadoRush.png"
  },
  {
    id: 8,
    title: "Tarde de Bençãos",
    host: "Diversos",
    time: "18:00 - 19:00",
    day: 1,
    description: "Músicas evangélicas para abençoar sua tarde.",
    image: "/images/Programas/tardeBencaos.png"
  },
  {
    id: 9,
    title: "Na Xinxa Xou!",
    host: "Felipe Branco",
    time: "20:00 - 21:30",
    day: 1,
    description: "O humor e a irreverência de Felipe Branco para animar sua noite.",
    image: "/images/Programas/naXinxaXou.png"
  },
  {
    id: 10,
    title: "As Brabas do Momento 2ª Edição",
    host: "",
    time: "21:30 - 00:00",
    day: 1,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento2.png"
  },
  {
    id: 11,
    title: "Madrugada Braba",
    host: "",
    time: "00:00 - 04:00",
    day: 1,
    description: "Músicas para quem está acordado de madrugada.",
    image: "/images/Programas/madrugadaBraba.png"
  },
    // Terça-Feira (day: 2)
  {
    id: 12,
    title: "Classicos da Braba",
    host: "Paulinho do Povo",
    time: "07:00 - 09:15",
    day: 2, 
    description: "Os clássicos que marcaram época, você ouve aqui!",
    image: "/images/Programas/classicosBraba.png"
  },
  {
    id: 13,
    title: "Manhã Sertaneja",
    host: "Paulinho do Povo",
    time: "07:00 - 09:15",
    day: 2, 
    description: "Comece o dia com muita energia e as melhores músicas sertanejas!",
    image: "/images/Programas/manhaSertaneja.png"
  },
  {
    id: 14,
    title: "Obrigado Homem do Campo",
    host: "Toninho",
    time: "09:30 - 11:00",
    day: 2, 
    description: "Notícias, dicas e muita música para o homem do campo.",
    image: "/images/Programas/homemCampo.png"
  },
  {
    id: 15,
    title: "Na Braba Informa com Gersinho Rádio e TV",
    host: "Gersinho",
    time: "11:00 - 13:00",
    day: 2, 
    description: "As principais notícias do dia com a credibilidade de Gersinho Rádio e TV.",
    image: "/images/Programas/brabaInforma.png"
  },
  {
    id: 16,
    title: "As Brabas do Momento 1ª Edição",
    host: "Fred",
    time: "13:00 - 14:30",
    day: 2, 
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento1.png"
  },
  {
    id: 17,
    title: "Solta a Braba!",
    host: "Mariana Lopes",
    time: "14:30 - 17:00",
    day: 2, 
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/soltaaBraba.png"
  },
  {
    id: 18,
    title: "Hora do Rush",
    host: "Fred",
    time: "17:00 - 18:00",
    day: 2, 
    description: "Hora do Rush na Braba pra chegar em casa bem informado e bem acompanhado!",
    image: "/images/Programas/horadoRush.png"
  },
  {
    id: 19,
    title: "Tarde de Bençãos",
    host: "Diversos",
    time: "18:00 - 19:00",
    day: 2, 
    description: "Músicas evangélicas para abençoar sua tarde.",
    image: "/images/Programas/tardeBencaos.png"
  },
  {
    id: 20,
    title: "Na Xinxa Xou!",
    host: "Felipe Branco",
    time: "20:00 - 21:30",
    day: 2, 
    description: "O humor e a irreverência de Felipe Branco para animar sua noite.",
    image: "/images/Programas/naXinxaXou.png"
  },
  {
    id: 21,
    title: "As Brabas do Momento 2ª Edição",
    host: "",
    time: "21:30 - 00:00",
    day: 2, 
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento2.png"
  },
  {
    id: 22,
    title: "Madrugada Braba",
    host: "",
    time: "21:30 - 00:00",
    day: 2, 
    description: "Músicas para quem está acordado de madrugada.",
    image: "/images/Programas/madrugadaBraba.png"
  },
  // Quarta-feira (day: 3)
  {
    id: 23,
    title: "Classicos da Braba",
    host: "Paulinho do Povo",
    time: "07:00 - 09:15",
    day: 3,
    description: "Os clássicos que marcaram época, você ouve aqui!",
    image: "/images/Programas/classicosBraba.png",
  },
  {
    id: 24,
    title: "Manhã Sertaneja",
    host: "Paulinho do Povo",
    time: "07:00 - 11:00",
    day: 3,
    description: "Comece o dia com muita energia e as melhores músicas sertanejas!",
    image: "/images/Programas/manhaSertaneja.png",
  },

  {
    id: 26,
    title: "Na Braba Informa com Gersinho Rádio e TV",
    host: "Gersinho",
    time: "11:00 - 13:00",
    day: 3,
    description: "As principais notícias do dia com a credibilidade de Gersinho Rádio e TV.",
    image: "/images/Programas/brabaInforma.png",
  },
  {
    id: 27,
    title: "As Brabas do Momento 1ª Edição",
    host: "Fred",
    time: "13:00 - 14:30",
    day: 3,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento1.png",
  },
  {
    id: 28,
    title: "Solta a Braba!",
    host: "Mariana Lopes",
    time: "14:30 - 17:00",
    day: 3,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/soltaaBraba.png",
  },
  {
    id: 29,
    title: "Hora do Rush",
    host: "Fred",
    time: "17:00 - 18:00",
    day: 3,
    description: "Hora do Rush na Braba pra chegar em casa bem informado e bem acompanhado!",
    image: "/images/Programas/horadoRush.png",
  },
  {
    id: 30,
    title: "Tarde de Bençãos",
    host: "Diversos",
    time: "18:00 - 19:00",
    day: 3,
    description: "Músicas evangélicas para abençoar sua tarde.",
    image: "/images/Programas/tardeBencaos.png",
  },
  {
    id: 31,
    title: "Na Xinxa Xou!",
    host: "Felipe Branco",
    time: "20:00 - 21:30",
    day: 3,
    description: "O humor e a irreverência de Felipe Branco para animar sua noite.",
    image: "/images/Programas/naXinxaXou.png",
  },
  {
    id: 32,
    title: "As Brabas do Momento 2ª Edição",
    host: "",
    time: "21:30 - 00:00",
    day: 3,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento2.png",
  },
  {
    id: 33,
    title: "Madrugada Braba",
    host: "",
    time: "21:30 - 00:00",
    day: 3,
    description: "Músicas para quem está acordado de madrugada.",
    image: "/images/Programas/madrugadaBraba.png",
  },
  // Quinta-feira (day: 4)
  {
    id: 34,
    title: "Classicos da Braba",
    host: "Paulinho do Povo",
    time: "07:00 - 09:15",
    day: 4,
    description: "Os clássicos que marcaram época, você ouve aqui!",
    image: "/images/Programas/classicosBraba.png",
  },
  {
    id: 35,
    title: "Manhã Sertaneja",
    host: "Paulinho do Povo",
    time: "07:00 - 09:15",
    day: 4,
    description: "Comece o dia com muita energia e as melhores músicas sertanejas!",
    image: "/images/Programas/manhaSertaneja.png",
  },
  {
    id: 36,
    title: "Obrigado Homem do Campo",
    host: "Toninho",
    time: "09:30 - 11:00",
    day: 4,
    description: "Notícias, dicas e muita música para o homem do campo.",
    image: "/images/Programas/homemCampo.png",
  },
  {
    id: 37,
    title: "Bate-Bola com Nenê Quevedo",
    host: "Nenê Quevedo",
    time: "11:00 - 13:00",
    day: 4,
    description: "Tudo sobre futebol com os comentarios de Nenê Quevedo.",
    image: "/images/Programas/bateBola.png",
  },
  {
    id: 38,
    title: "As Brabas do Momento 1ª Edição",
    host: "Fred",
    time: "13:00 - 14:30",
    day: 4,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento1.png",
  },
  {
    id: 39,
    title: "Solta a Braba!",
    host: "Mariana Lopes",
    time: "14:30 - 17:00",
    day: 4,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/soltaaBraba.png",
  },
  {
    id: 40,
    title: "Hora do Rush",
    host: "Fred",
    time: "17:00 - 18:00",
    day: 4,
    description: "Hora do Rush na Braba pra chegar em casa bem informado e bem acompanhado!",
    image: "/images/Programas/horadoRush.png",
  },
  {
    id: 41,
    title: "Tarde de Bençãos",
    host: "Diversos",
    time: "18:00 - 19:00",
    day: 4,
    description: "Músicas evangélicas para abençoar sua tarde.",
    image: "/images/Programas/tardeBencaos.png",
  },
  {
    id: 42,
    title: "Na Xinxa Xou!",
    host: "Felipe Branco",
    time: "20:00 - 21:30",
    day: 4,
    description: "O humor e a irreverência de Felipe Branco para animar sua noite.",
    image: "/images/Programas/naXinxaXou.png",
  },
  {
    id: 43,
    title: "As Brabas do Momento 2ª Edição",
    host: "",
    time: "21:30 - 00:00",
    day: 4,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento2.png",
  },
  {
    id: 44,
    title: "Madrugada Braba",
    host: "",
    time: "00:00 - 04:00",
    day: 4,
    description: "Músicas para quem está acordado de madrugada.",
    image: "/images/Programas/madrugadaBraba.png",
  },
  // Sexta-feira (day: 5)
  {
    id: 45,
    title: "Classicos da Braba",
    host: "Paulinho do Povo",
    time: "07:00 - 09:15",
    day: 5,
    description: "Os clássicos que marcaram época, você ouve aqui!",
    image: "/images/Programas/classicosBraba.png",
  },
  {
    id: 46,
    title: "Manhã Sertaneja",
    host: "Paulinho do Povo",
    time: "07:00 - 11:00",
    day: 5,
    description: "Comece o dia com muita energia e as melhores músicas sertanejas!",
    image: "/images/Programas/manhaSertaneja.png",
  },
  {
    id: 47,
    title: "Na Braba Informa com Gersinho Rádio e TV",
    host: "Gersinho",
    time: "11:00 - 13:00",
    day: 5,
    description: "As principais notícias do dia com a credibilidade de Gersinho Rádio e TV.",
    image: "/images/Programas/brabaInforma.png",
  },
  {
    id: 48,
    title: "As Brabas do Momento 1ª Edição",
    host: "Fred",
    time: "13:00 - 14:30",
    day: 5,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento1.png",
  },
  {
    id: 49,
    title: "Solta a Braba!",
    host: "Mariana Lopes",
    time: "14:30 - 17:00",
    day: 5,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/soltaaBraba.png",
  },
  {
    id: 50,
    title: "Hora do Rush",
    host: "Fred",
    time: "17:00 - 18:00",
    day: 5,
    description: "Hora do Rush na Braba pra chegar em casa bem informado e bem acompanhado!",
    image: "/images/Programas/horadoRush.png",
  },
  {
    id: 51,
    title: "Tarde de Bençãos",
    host: "Diversos",
    time: "18:00 - 19:00",
    day: 5,
    description: "Músicas evangélicas para abençoar sua tarde.",
    image: "/images/Programas/tardeBencaos.png",
  },
  {
    id: 52,
    title: "As Brabas do Momento 2ª Edição",
    host: "",
    time: "21:30 - 00:00",
    day: 5,
    description: "As músicas mais tocadas do momento, você ouve aqui!",
    image: "/images/Programas/brabasMomento2.png",
  },
  {
    id: 53,
    title: "Madrugada Braba",
    host: "",
    time: "00:00 - 04:00",
    day: 5,
    description: "Músicas para quem está acordado de madrugada.",
    image: "/images/Programas/madrugadaBraba.png",
  },
  // Sábado (day: 6)
  {
    id: 54,
    title: "Fique Ligado nos Eventos",
    host: "",
    time: "",
    day: 6,
    description: "",
    image: "/images/Programas/fimdeSemana.png",
  },
    
    // Domingo (day: 0)
{
    id: 54,
    title: "Fique Ligado nos Eventos",
    host: "",
    time: "",
    day: 0,
    description: "",
    image: "/images/Programas/fimdeSemana.png",
}

];

export const prizesData: Prize[] = [
  {
    id: 1,
    title: "Ingressos para Show Premium",
    description: "Ganhe um par de ingressos para o show especial que acontecerá no próximo mês.",
    image: "/images/Programas/emBreve.png",
    endDate: new Date(2025, 6, 15) // July 15, 2025
  },
  {
    id: 2,
    title: "Kit Exclusivo",
    description: "Concorra a um kit exclusivo com camiseta, boné e caneca personalizada da Rádio Brasil FM.",
    image: "/images/Programas/emBreve.png",
    endDate: new Date(2025, 5, 30) // June 30, 2025
  },
  {
    id: 3,
    title: "Sessão de Estúdio",
    description: "Grave uma música profissionalmente em nosso estúdio com equipe técnica completa.",
    image: "/images/Programas/emBreve.png",
    endDate: new Date(2025, 7, 5) // August 5, 2025
  }
];

export const locutoresData: Locutor[] = [
    {
        id: 1,
        nome: "Felipe Branco",
        programa: "",
        foto: "/images/FelipeBranco.png",
        biografia: " Comediante stand-up e roteirista, da zueira porque sabe que a vida é importante demais pra ser levada a sério",
        aniversario: "26/09",
        banda: "Guns, Mamonas Assassinas",
        musica: "Lá vem o Alemão - Mamonas Assassinas",
        instagram: "@felipebrancostandup"
    },
    {
        id: 2,
        nome: "Lais Moraes",
        programa: "",
        foto: "/images/LaisMoraes.png",
        biografia: "Iniciou a locução aos 14 anos na rádio comunitária Capela Fm e em eventos como o Baile da Rainha de Capela do Alto. Amante da música e cantora nas horas vagas.",
        aniversario: "18/12",
        banda: "Evanescence / Miley Cyrus",
        musica: "Good Enough - Amy Lee",
        instagram: "@laismoraesv"
    },
        {
        id: 3,
        nome: "Paulinho do Povo",
        programa: "",
        foto: "/images/PaulinhoPovo.png",
        biografia: "Amo rádio, apaixonado por modas sertanejas, clássicos, universitários, vanerão gaúcho.",
        aniversario: "19/02",
        banda: "Gino & Geno",
        musica: "Agita Aí - Gino & Geno",
        instagram: "@paulinhodopovo104.9"
    },
        {
        id: 4,
        nome: "Toninho",
        programa: "",
        foto: "/images/Toninho.png",
        biografia: "Locutor e radialista desde 2008, criador do programa 'Obrigado ao homem do campo', pois o homem, a mulher e seus filhos produzem o alimento que abastecem nossas mesas todos os dias, faça sol, faça chuva e enobrecem nosso país.",
        aniversario: "30/08",
        banda: "Pink Floyd / Trio Parada Dura / Zé Neto e Cristiano",
        musica: "Obrigado ao Homem do Campo - Dom & Ravel",
        instagram: "@terra.tecnica"
    },
    {
        id: 5,
        nome: "Marco Nissani",
        programa: "",
        foto: "/images/MarcoNissani.png",
        biografia: "Piloto de avião, técnico de ar condicionado e radialista.",
        aniversario: "19/12",
        banda: "Victor e Leo / Barão Vermelho",
        musica: "Chuva de bruxaria - Victor e Leo",
        instagram: "@marco_nissani"
    },
    {
        id: 6,
        nome: "Grídia Maria",
        programa: "",
        foto: "/images/GrídiaMaria.png",
        biografia: "Orgulhosamente do interior, onde a vida é mais calma, os vizinhos são amigos e o café é sempre fresquinho.",
        aniversario: "27/08",
        banda: "Nhana e Cascantinha, Chitãozinho e Xororó, Padre Marcelo Rossi",
        musica: "Meu primeiro amor (Nhana e Cascantinha)",
        instagram: "@gridia.maria"
    },
    {
        id: 7,
        nome: "Sérgio Góes",
        programa: "",
        foto: "/images/SergioGoes.png",
        biografia: "Comerciante e músico apaixonado por musica, sempre com uma história para contar.",
        aniversario: "08/03",
        banda: "Beatles / Deep Purple / Ultraje a Rigor",
        musica: "For Whom the Bell Tolls - Metallica",
        instagram: "@serggiogoes"
    },
    {
        id: 8,
        nome: "Fred",
        programa: "",
        foto: "/images/Fred.png",
        biografia: "Busco ver possibilidades onde os outros veem obstáculos. Uso minha criatividade não só pra inovar, mas também encontrar soluções únicas aos problemas comuns do nosso cotidiano.",
        aniversario: "23/11",
        banda: "Charlie Brown Jr. / Supertramp / SOJA",
        musica: "Bob Dylan - Hurricane",
        instagram: "@fredericolc"
    },
    {
      id: 9,
      nome: "Gersinho",
      programa: "",
      foto: "/images/Gersinho.png",
      biografia: "Iniciou a carreira de notícias em 2020 sendo o maior canal de notícias da cidade de Capela do Alto.",
      aniversario: "05/05",
      banda: "Roupa Nova / RPM",
      musica: "Whisky à go-go-go - Roupa Nova",
      instagram: "@gersinho_radio_tv"
    },
    {
      id: 10,
      nome: "Sandro Aparecido",
      programa: "",
      foto: "/images/SandroAparecido.png",
      biografia: "Mais conhecido como Ksandra, vocalista da banda Rock Mesclado. Meu lema e 'Viver com alegria, um dia de cada vez'.",
      aniversario: "18/04",
      banda: "Legião Urbana / Barão Vermelha / Cassia Eller",
      musica: "November Rain - Guns N' Roses",
      instagram: "@sandroaparecidomachado"
    }
];