export interface ProductionCompany {
  id: string;
  name: string;
}

export interface Movie {
  id: string;
  url: string;
  primaryTitle: string;
  originalTitle: string;
  type: string;
  description: string;
  primaryImage: string;
  trailer: string;
  contentRating: string;
  startYear: number;
  endYear: number | null;
  releaseDate: string;
  interests: string[];
  countriesOfOrigin: string[];
  externalLinks: any; // usa un tipo específico si conoces la estructura
  spokenLanguages: string[];
  filmingLocations: string[];
  productionCompanies: ProductionCompany[];
  budget: number;
  grossWorldwide: number;
  genres: string[];
  isAdult: boolean;
  runtimeMinutes: number;
  averageRating: number;
  numVotes: number;
  metascore: number;
}
