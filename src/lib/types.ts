export interface Show {
  id: number;
  title: string;
  host: string;
  time: string;
  day: number;
  description: string;
  image: string;
}


export interface Prize {
  id: number;
  title: string;
  description: string;
  image: string;
  endDate: Date;
}


export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}


export interface Locutor {
    id: number;
    nome: string;
    programa: string;
    foto: string;
    biografia: string;
    aniversario: string;
    banda: string;
    musica: string;
    instagram?: string;
}
