import { RootState } from "../src/store/store";

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

export type ScreenTypes = "tv" | "movie" | "homescreen";

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
  rent?: WatchProvider[];
  free?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
}

export interface IAllWatchProviderData {
  [key: string]: WatchProviderForCountry;
}
[];

export interface IProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface NextEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: null | number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
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
  next_episode_to_air: null | NextEpisodeToAir;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: IProductionCompany[];
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

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface MovieMediaExtended extends MovieMedia {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  video: boolean;
}

interface ICreditPersonGender {
  0: "Not specified";
  1: "Female";
  2: "Male";
  3: "Non Binary";
}

interface ICreditPerson {
  adult: boolean;
  gender: 0 | 1 | 2 | 3 | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface ICast extends ICreditPerson {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrew extends ICreditPerson {
  credit_id: string;
  department: string;
  job: string;
}

export interface ICredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}

// Define a type for the watchlist slice state
interface IReduxListMedia {
  mediaId: number;
  mediaType: MediaTypes;
  dateAdded: number;
  mediaTitle?: string;
  mediaDate?: string;
  poster_path?: string;
  backdrop_path?: string;
}

interface IDbListMedia extends IReduxListMedia {}

export interface IDBCollectionMedia extends IReduxListMedia {
  dateAddedString: string;
}

export type TCollectionType = "watchlist" | "favourites" | "watched";

export type TDbCollectionType = "watchlist" | "favourites" | "watched";

export type TCollectionToTReduxCollection = {
  [key in TCollectionType]: keyof RootState;
};

export interface ISOLang {
  name: string;
  nativeName: string;
  iso639_1: string;
  iso639_2T: string;
  iso639_2B: string;
}

export interface Element {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}

export interface INetworkIds {
  Netflix: 213;
  HBO: 49;
  FOX: 19;
  HULU: 453;
  "Amazon Prime": 1024;
  "Disney+": 2739;
  "Apple TV+": 2552;
  "Cartoon Network": 56;
  "Adult Swim": 80;
  AMC: 174;
  PBS: 14;
  CBS: 16;
  "History Tv": 65;
  "BBC One": 4;
  "BBC Two": 332;
  "Sky Atlantic": 1063;
  CuriosityStream: 2349;
  "National Geographic": 43;
  Discovery: 64;
  ShowTime: 67;
  ABC: 2;
  Nickelodeon: 13;
  "Toon Disney": 142;
  "Disney XD": 44;
  ANIMAX: 171;
  "The CW": 71;
}

export interface IProductionComapnyIds {
  // Netflix: "145174,178464,171251,185004,186222,192478",
  Lucasfilm: 1;
  HBO: 3268;
  "Adult Swim": 6759;
  Miramax: 14;
  Paramount: 4;
  "Columbia Pictures": 5;
  "Village Roadshow Pictures": 79;
  "Cartoon Network": 7899;
  Pixar: 3;
  "Warner Bros": 17;
  "20th Century Fox": 25;
  "Metro-Goldwyn-Mayer": 21;
  "Universal Pictures": 33;
  "Lions Gate Films": 35;
  "Sony Pictures": 34;
  DreamWorks: "521";
  // DreamWorks: [
  //   7, 521, 3486, 15258, 42141, 73933, 114185, 114539, 125083, 144867, 183771,
  // ],
}

export interface IQueryParams {
  page?: number;
  include_adult?: boolean;
  language?: string;
  query?: string;
  with_genres?: string;
  include_null_first_air_dates?: boolean;
  with_companies?: string;
  with_networks?: string;
  with_cast?: string;
  with_people?: string;
  with_original_language?: string;
  primary_release_year?: string;
  with_watch_providers?: string;
  watch_region?: string;
}

export interface IUrlObject {
  name: string;
  url: string;
  queryParams: IQueryParams;
}

export interface IPlaylist extends IUrlObject {}

export interface IDropdownYearsObj {
  year: number;
  value: string;
}

export type TImgQualities = "Default" | "Low" | "Medium" | "High" | "Very high";

export type TImgQualityValues = "200" | "300" | "400" | "500" | "780";

export interface IImageQuality {
  quality: TImgQualities;
  value: TImgQualityValues;
}

export type ImageItemTypes =
  | "thumbnail"
  | "watchProviders"
  | "banner"
  | "companies";

export interface IImageItemSettingsValue {
  key: ImageItemTypes;
  imgQuality: IImageQuality;
}

export interface IImgItemSettingsDB extends IImageQuality {
  name: ImageItemTypes;
}

export type TAllImgSettingsDB = IImgItemSettingsDB[];

export type IImageItemQualitySetting = {
  [key in ImageItemTypes]: IImageItemSettingsValue;
};

export interface ISupportedLang {
  iso_639_1: string;
  english_name: string;
  name: string;
}
[];
