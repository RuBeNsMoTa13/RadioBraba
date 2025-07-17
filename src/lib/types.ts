export interface Show {
  id: number;
  title: string;
  host: string;
  time: string;
  day: number;
  description: string;
  image: string;
}

export interface Host {
  id: number;
  name: string;
  image: string;
  bio: string;
  shows: string[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface GalleryImage {
  id: number;
  title: string;
  src: string;
  alt: string;
  date: string;
  event: string;
}

export interface Prize {
  id: number;
  title: string;
  description: string;
  image: string;
  endDate: Date;
}

export interface RadioState {
  isPlaying: boolean;
  volume: number;
  station: {
    name: string;
    streamUrl: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}