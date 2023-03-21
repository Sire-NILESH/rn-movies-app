export interface ICountry {
  name: string;
  code: string;
}

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

// export interface IGenresToShowMainScreens {
//   id: number;
//   name: string;
//   mediaType: MediaTypes;
// }

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

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProviderForCountry {
  link: string;
  flatrate?: WatchProvider[];
  free?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
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

export interface TvMediaExtended extends TvMedia {
  created_by: {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    profile_path: string;
  }[];
  // episode_run_time: never[];
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  networks: Network[];
  next_episode_to_air: null;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string | undefined;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: Season[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}

export interface Season {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string | null;
  poster_path: string | null;
  season_number: number;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface SeasonDetails {
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
}

// export interface Movie {
//   title: string;
//   backdrop_path: string;
//   adult: boolean;
//   media_type?: string | string[];
//   release_date?: string;
//   first_air_date: string;
//   genre_ids: number[];
//   id: number;
//   name: string;
//   origin_country: string[];
//   original_language: string;
//   original_name: string;
//   original_title: string;
//   title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   vote_average: number;
//   vote_count: number;
//   type: string | string[] | undefined;
// }

// type TContent = {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: ArrayConstructor[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// };

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
