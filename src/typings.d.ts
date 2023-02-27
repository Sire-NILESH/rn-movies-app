export interface Genre {
  id: number;
  name: string;
}

export type MediaTypes = "movie" | "tv" | "multi";

export interface IGenre {
  id: number;
  name: string;
}

export type ScreenTypes = "tv" | "movie" | "home";

export interface IGenresToShowHomeScreen {
  id: number;
  name: string;
  mediaType: MediaTypes;
}

export interface Trailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface Media {
  id: number;
  adult: boolean;
  media_type?: string | string[];
  genre_ids: number[];
  overview: string;
  origin_country: string[];
  original_language: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  type: MediaTypes;
  backdrop_path: string;
}

export interface MovieMedia extends Media {
  title: string;
  original_title: string;
  release_date?: string;
}

export interface TvMedia extends Media {
  name: string;
  original_name: string;
  first_air_date: string;
}

export interface Movie {
  title: string;
  backdrop_path: string;
  adult: boolean;
  media_type?: string | string[];
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  original_title: string;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  type: string | string[] | undefined;
}

type TContent = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: ArrayConstructor[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface Element {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}

export interface HomeCollectionProps {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}
