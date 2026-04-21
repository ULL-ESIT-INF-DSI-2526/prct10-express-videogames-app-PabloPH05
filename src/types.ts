export enum Platform {
  PC = 'PC',
  PS5 = 'PlayStation 5',
  XBOX = 'Xbox Series X/S',
  SWITCH = 'Nintendo Switch',
  STEAMDECK = 'Steam Deck',
}

export enum Genre {
  Action = 'Acción',
  Adventure = 'Aventura',
  RPG = 'Rol',
  Strategy = 'Estrategia',
  Sports = 'Deportes',
  Simulation = 'Simulación',
}

export type Videogame = {
  id: string;
  name: string;
  description: string;
  platform: Platform;
  genre: Genre;
  developer: string;
  releaseYear: number;
  multiplayer: boolean;
  estimatedPlaytime: number;
  marketValue: number;
};

export type ResponseType = {
  success: boolean;
  error?: string;
  videogames?: Videogame[];
};
