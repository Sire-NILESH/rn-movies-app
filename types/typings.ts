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
  type: string;
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
  /** "Documentary"
     | "News"
     | "Miniseries"
     | "Reality"
     | "Scripted"
     | "Talk Show"
     | "Video" */
  // type: string;
  // type:
  //   | "Documentary"
  //   | "News"
  //   | "Miniseries"
  //   | "Reality"
  //   | "Scripted"
  //   | "Talk Show"
  //   | "Video";
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
  crew: ICrew[];
  guest_stars: ICast[];
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

export interface IBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface MovieMediaExtended extends MovieMedia {
  belongs_to_collection: IBelongsToCollection;
  budget: number;
  genres: IGenre[];
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

export type TGenderCodes = 0 | 1 | 2 | 3;

export interface ICreditPerson {
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

export interface ICastAggregate extends ICreditPerson {
  roles: Role[];
  total_episode_count: number;
  order: number;
}

export interface Role {
  credit_id: string;
  character: string;
  episode_count: number;
}

export interface ICrew extends ICreditPerson {
  credit_id: string;
  department: string;
  job: string;
}

export interface ICrewAggregate extends ICreditPerson {
  jobs: CrewJob[];
  department: string;
  total_episode_count: number;
}

export interface CrewJob {
  credit_id: string;
  job: string;
  episode_count: number;
}

export interface ICredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}

export interface ICreditsAggregate {
  id: number;
  cast: ICastAggregate[];
  crew: ICrewAggregate[];
}

export interface EpisodeCastAndCrew {
  seasonNumber: number;
  episodeNumber: number;
  episdodeName: string;
  cast: ICast[];
  crew: ICrew[];
}

// Define a type for the watchlist slice state
export interface IReduxListMedia {
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

export interface IDBEpisode {
  episodeId: number;
  seasonId: number;
  tvShowId: number;
  watchedDate: number;
}

export interface IWatchedEpisodesLookup {
  [key: number]: IDBEpisode;
}

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
  with_watch_providers?: string;
  watch_region?: string;
  sort_by?: TGenresSortByValue;
  append_to_response?: string;

  // for movie
  primary_release_year?: string;
  "primary_release_date.gte"?: string;
  "release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  "release_date.lte"?: string;

  // for tv
  first_air_date_year?: string;
  "first_air_date.gte"?: string;
  "air_date.gte"?: string;
  "first_air_date.lte"?: string;
  "air_date.lte"?: string;
}

export interface IUrlObject {
  name: string;
  url: string;
  queryParams: IQueryParams;
  additionalFiltersUnsupported?: boolean;
}

export interface IPlaylist extends IUrlObject {}

export interface IDropdownYearsObj {
  year: number;
  value: string;
}

export type TReleaseYearConstraint = "gte" | "lte" | undefined;

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

export type TGenresSortByValue =
  | "popularity.asc"
  | "popularity.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc"
  | undefined;

export type TGenresSortByKey =
  | "↑ Popularity"
  | "↓ Popularity"
  | "↑ Revenue"
  | "↓ Revenue"
  | "↑ Release"
  | "↓ Release"
  | "↑ Ratings"
  | "↓ Ratings"
  | "↓ Avg Ratings"
  | "↑ Avg Ratings"
  | "Default";

export interface IGenreSortBy {
  key: TGenresSortByKey;
  value: TGenresSortByValue;
}

export interface IMovieReleaseAndCertificate {
  // id: number;
  results: IMovieRegionAndRelease[];
}

export interface IMovieRegionAndRelease {
  iso_3166_1: string;
  release_dates: IMovieReleaseDate[];
}

export interface IMovieReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface ITVContentRatingList {
  results: ITVContentRating[];
  // id: number;
}

export interface ITVContentRating {
  descriptors: any[];
  iso_3166_1: string;
  rating: string;
}

export interface MovieMediaHybrid extends MovieMediaExtended {
  "watch/providers": {
    results: IAllWatchProviderData;
  };
  credits: ICredits;
  release_dates: IMovieReleaseAndCertificate;
}

export interface TvMediaHybrid extends TvMediaExtended {
  "watch/providers": {
    results: IAllWatchProviderData;
  };
  credits: ICredits;
  aggregate_credits: ICreditsAggregate;
  content_ratings: ITVContentRatingList;
}

export interface ITrailerScreenParams {
  trailerType: "mediaTrailer" | "episodeTrailer";
  mediaTrailer?: IUrlObject;
  episodeTrailer?: IUrlObject;
}

export interface CollectionPart {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: Date;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface FranchiseCollection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: CollectionPart[];
}

export interface IPersonInfo {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: any;
  gender: number;
  homepage: any;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface ISearchPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  known_for: IPersonKnownFor[];
}

export interface IPersonKnownFor {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export interface IPersonTVMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  episode_count: number;
}

export interface ISearchHistoryItem {
  id: string;
  itemName: string;
  itemType: "searchHistory";
}
