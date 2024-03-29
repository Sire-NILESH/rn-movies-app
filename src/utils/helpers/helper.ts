import {
  Episode,
  Genre,
  ICast,
  ICastAggregate,
  ICountry,
  ICreditPerson,
  ICrew,
  ICrewAggregate,
  IDBEpisode,
  IDropdownYearsObj,
  IImageQuality,
  IPersonTVMedia,
  IQueryParams,
  IReduxListMedia,
  ISOLang,
  ISearchHistoryItem,
  ISupportedLang,
  IUrlObject,
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  MovieMediaHybrid,
  TGenderCodes,
  TReleaseYearConstraint,
  TvMedia,
  TvMediaExtended,
  TvMediaHybrid,
} from "../../../types/typings";
import { Alert, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import {
  TNetworkCompany,
  TProductionCompany,
  TTvMediaType,
  networkCompanyIdConst,
  productionComapnyIdsConst,
} from "../constants";

export function isMovie(
  media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended | null
): media is MovieMedia {
  return media !== null && (media as MovieMedia).title !== undefined;
}

export function isMovieMediaHybrid(
  media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended | null
): media is MovieMediaHybrid {
  return (
    media !== null &&
    (media as MovieMediaHybrid).credits !== undefined &&
    (media as MovieMediaHybrid).release_dates !== undefined
  );
}

// ----------------- TS infer --------------------
export function isTv(
  media:
    | MovieMedia
    | TvMedia
    | TvMediaExtended
    | MovieMediaExtended
    | IPersonTVMedia
    | null
): media is TvMedia {
  return media !== null && (media as TvMedia).name !== undefined;
}

export function isTvMediaHybrid(
  media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended | null
): media is TvMediaHybrid {
  return (
    media !== null &&
    (media as TvMediaHybrid).aggregate_credits !== undefined &&
    (media as TvMediaHybrid).content_ratings !== undefined
  );
}

export function isICrewAggregate(
  crew: ICrewAggregate | ICrew | null
): crew is ICrewAggregate {
  return (
    crew !== null &&
    (crew as ICrewAggregate).jobs !== undefined &&
    (crew as ICrewAggregate).department !== undefined &&
    (crew as ICrewAggregate).total_episode_count !== undefined
  );
}

export function isICrew(crew: ICrewAggregate | ICrew | null): crew is ICrew {
  return (
    crew !== null &&
    (crew as ICrew).credit_id !== undefined &&
    (crew as ICrew).department !== undefined &&
    (crew as ICrew).job !== undefined
  );
}

export function isICastAggregate(
  cast: ICastAggregate | ICast | null
): cast is ICastAggregate {
  return (
    cast !== null &&
    (cast as ICastAggregate).roles !== undefined &&
    (cast as ICastAggregate).order !== undefined &&
    (cast as ICastAggregate).total_episode_count !== undefined
  );
}

export function isICast(cast: ICastAggregate | ICast | null): cast is ICast {
  return (
    cast !== null &&
    (cast as ICast).cast_id !== undefined &&
    (cast as ICast).order !== undefined &&
    (cast as ICast).credit_id !== undefined &&
    (cast as ICast).character !== undefined
  );
}

export function isIPersonTVMedia(
  media:
    | MovieMedia
    | TvMedia
    | TvMediaExtended
    | MovieMediaExtended
    | IPersonTVMedia
    | null
): media is IPersonTVMedia {
  return (
    media !== null &&
    (media as IPersonTVMedia)["episode_count"] !== undefined &&
    isTv(media)
  );
}

export function isTvExtended(
  media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended | null
): media is TvMediaExtended {
  return media !== null && (media as TvMediaExtended).seasons !== undefined;
}

export function isPerson(obj: any): obj is ICreditPerson {
  return (
    obj !== null &&
    (obj as ICreditPerson).known_for_department !== undefined &&
    (obj as ICreditPerson).name !== undefined
  );
}

export function isMovieArray(
  medias: MovieMedia[] | TvMedia[]
): medias is MovieMedia[] {
  return medias !== null && (medias as MovieMedia[])[0].title !== undefined;
}

export function isTvArray(
  medias: MovieMedia[] | TvMedia[]
): medias is TvMedia[] {
  return medias !== null && (medias as TvMedia[])[0].name !== undefined;
}

export function isReduxCollectionMediaList(
  medias: MovieMedia[] | TvMedia[] | IReduxListMedia[]
): medias is IReduxListMedia[] {
  return (
    medias !== null && (medias as IReduxListMedia[])[0].dateAdded !== undefined
  );
}

export function isReduxCollectionMedia(
  medias: MovieMedia | TvMedia | IReduxListMedia
): medias is IReduxListMedia {
  return medias !== null && (medias as IReduxListMedia).dateAdded !== undefined;
}

export function isISOLang(obj: Object): obj is ISOLang {
  return (
    obj !== null &&
    (obj as ISOLang).iso639_1 !== undefined &&
    (obj as ISOLang).iso639_2T !== undefined &&
    (obj as ISOLang).iso639_2B !== undefined
  );
}

export function isSupportedLang(obj: Object): obj is ISupportedLang {
  return (
    obj !== null &&
    (obj as ISupportedLang).iso_639_1 !== undefined &&
    (obj as ISupportedLang).english_name !== undefined &&
    (obj as ISupportedLang).name !== undefined
  );
}

export function isIImageQuality(obj: Object): obj is IImageQuality {
  return (
    obj !== null &&
    (obj as IImageQuality).quality !== undefined &&
    (obj as IImageQuality).value !== undefined
  );
}

export function isICountry(obj: Object): obj is ICountry {
  return (
    obj !== null &&
    (obj as ICountry).name !== undefined &&
    (obj as ICountry).code !== undefined
  );
}

export function isISearchHistoryItem(obj: Object): obj is ISearchHistoryItem {
  return (
    obj !== null &&
    (obj as ISearchHistoryItem).itemName !== undefined &&
    (obj as ISearchHistoryItem).itemType === "searchHistory"
  );
}

export function isIDropdownYear(obj: Object): obj is IDropdownYearsObj {
  return (
    obj !== null &&
    (obj as IDropdownYearsObj).year !== undefined &&
    (obj as IDropdownYearsObj).value !== undefined
  );
}

/**
 * Is an `Object` that maps a TopTab screen's collection type to corresponding Redux collection.
 */
// export const collectionTypeToReduxCollection: TCollectionToTReduxCollection = {
//   watchlist: "watchlistMedias",
//   favourites: "favouriteMedias",
//   watched: "watchedMedias",
// };

// Movie MediaExtended will always have a 'title' alongside 'production_companies'
export function isMovieExtended(
  media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended
): media is MovieMediaExtended {
  return (
    media !== null &&
    (media as MovieMediaExtended).title !== undefined &&
    (media as MovieMediaExtended).production_companies !== undefined
  );
}

// ----------------- Utility functions --------------------
export function formatCurrencyNumbers(num: number): string {
  if (num >= 1000000000) {
    return (
      (num / 1000000000)
        .toFixed(1)
        // .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .toLocaleString()
        .replace(/\.0$/, "") + "B"
    );
  }
  if (num >= 1000000) {
    return (
      (num / 1000000)
        .toFixed(1)
        // .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .replace(/\.0$/, "") + "M"
    );
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return String(num);
}

export function calculateProfitOrLoss(
  costPrice: number,
  sellingPrice: number
): string {
  let profit = sellingPrice - costPrice;
  let percent = (profit / costPrice) * 100;
  if (profit > 0) {
    return `${percent.toFixed(1)}%`;
  } else if (profit < 0) {
    return `-${Math.abs(percent)
      .toFixed(1)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%`;
  } else {
    return "";
  }
}

// Getting the history/last screen
// const routes = navigation.getState()?.routes;
// const prevRoute = routes[routes.length - 2]; // -2 because -1 is the current route
// // {"key": "Search Screen-rxFVew3zQkNrXL4z0O_1J", "name": "Search Screen", "params": {"searchCategory": "tv"}, "path": undefined}
// console.log("path", prevRoute?.name);

export const getDeviceDimensions = (dimensionOf: "screen" | "window") => {
  const dimensions = Dimensions.get(dimensionOf);
  return dimensions;
};

/**
 * A helper function to build meida object suitable for reducers of collection redux slices.
 *
 * @param media a media object of the form `MovieMedia` | `TvMedia`
 * @param mediaType media type of the media object
 * @returns {IReduxListMedia} reduxListMedia object
 */
export const reduxListMediaObjBuilder = (
  media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended,
  mediaType: MediaTypes
): IReduxListMedia => {
  return {
    mediaId: media.id,
    dateAdded: Date.now(),
    poster_path: media.poster_path,
    backdrop_path: media.backdrop_path,
    mediaType: mediaType,
    mediaDate: isMovie(media) ? media.release_date : media.first_air_date,
    mediaTitle: isMovie(media) ? media.title : media.name,
  };
};

/**
 * A helper function to build episode object suitable for storing into the db.
 *
 * @param episode a episode object of the form `Episode`
 */
export const watchedEpisodeObjBuilder = (
  episode: Episode,
  seasonId: number
): IDBEpisode => {
  return {
    episodeId: episode.id,
    seasonId: seasonId,
    tvShowId: episode.show_id,
    watchedDate: Date.now(),
  };
};

export const addReleaseAndAirDateFilters = (
  filters: IQueryParams,
  mediaListType: MediaTypes,
  currentYear: number,
  releaseYearConstraint: TReleaseYearConstraint
) => {
  if (mediaListType === "tv") {
    if (releaseYearConstraint === "gte" && currentYear !== 0) {
      filters["first_air_date.gte"] = `${currentYear}-01-01`;
      filters["air_date.gte"] = `${currentYear}-01-01`;
    } else if (releaseYearConstraint === "lte" && currentYear !== 0) {
      filters["first_air_date.lte"] = `${currentYear}-01-01`;
      filters["air_date.lte"] = `${currentYear}-01-01`;
    } else {
      filters.first_air_date_year = String(currentYear);
    }
  } else if (mediaListType === "movie") {
    if (releaseYearConstraint === "gte" && currentYear !== 0) {
      filters["primary_release_date.gte"] = `${currentYear}-01-01`;
      filters["release_date.gte"] = `${currentYear}-01-01`;
    } else if (releaseYearConstraint === "lte" && currentYear !== 0) {
      filters["primary_release_date.lte"] = `${currentYear}-01-01`;
      filters["release_date.lte"] = `${currentYear}-01-01`;
    } else {
      filters.primary_release_year = String(currentYear);
    }
  }
};

export function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}hr ${minutes}min`;
}

export function dateFormatter(date: string): string {
  return new Date(date).toDateString().split(" ").splice(1).join(" ");
}

export function tvMediaType(code: string): string {
  const codes = {
    "0": "Documentary",
    "1": "News",
    "2": "Miniseries",
    "3": "Reality",
    "4": "Scripted",
    "5": "Talk Show",
    "6": "Video",
  };

  // @ts-ignore
  return codes[code];
}

export function getGender(code: TGenderCodes): string {
  const codes = {
    0: "Not specified",
    1: "Female",
    2: "Male",
    3: "Non Binary",
  };

  return codes[code];
}

export function calculateAge(birth: string, death?: string) {
  const today = death ? new Date(death) : new Date();
  const birthDate = new Date(birth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

// ----------------- TOAST AND ALERTS --------------------
export function showErrorAlert(title?: string, message?: string) {
  Alert.alert(
    "Error!",
    title ? title : "Something went wrong, please try again later",
    [{ text: "Okay", style: "destructive" }]
  );
}

export const showSuccessToast = (title: string, message: string) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
  });
};

export const showErrorToast = (title?: string, message?: string) => {
  Toast.show({
    type: "error",
    text1: title !== undefined ? title : "Error !",
    text2:
      message !== undefined ? message : "Something went wrong. Try again later",
  });
};

export function showGenericErrorToast() {
  showErrorToast("Error !", "Something went wrong, please try again later.");
}

// ----------------- CONSTANTS AND BUILDERS --------------------

// ----------------- PLAYLIST BUILDERS --------------------
export function buildTvPlaylist(
  name: string,
  networkId: keyof TNetworkCompany
): IUrlObject {
  return {
    name: name,
    url: `/discover/tv`,
    queryParams: {
      with_networks: String(networkCompanyIdConst[networkId]),
      include_null_first_air_dates: true,
      language: "en-US",
    },
  };
}

export function buildDiscoverPlaylist(
  name: string,
  mediaType: MediaTypes
): IUrlObject {
  return {
    name: name,
    url: `/discover/${mediaType}`,
    queryParams: {
      language: "en-US",
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildMoviePlaylist(
  name: string,
  productionCompanyId: keyof TProductionCompany
): IUrlObject {
  return {
    name: name,
    url: `/discover/movie`,
    queryParams: {
      with_companies: String(productionComapnyIdsConst[productionCompanyId]),
      include_null_first_air_dates: true,
      language: "en-US",
    },
  };
}

export function buildTrendingPlaylist(
  name: string,
  mediaType: MediaTypes
): IUrlObject {
  return {
    name: name,
    url: `/trending/${mediaType}/day`,
    queryParams: {
      language: "en-US",
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildPopularPlaylist(
  name: string,
  mediaType: MediaTypes
): IUrlObject {
  return {
    name: name,
    url: `/${mediaType}/popular`,
    queryParams: {
      language: "en-US",
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildTopRatedPlaylist(
  name: string,
  mediaType: MediaTypes
): IUrlObject {
  return {
    name: name,
    url: `/${mediaType}/top_rated`,
    queryParams: {
      language: "en-US",
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildAiringTodayPlaylist(
  name: string,
  mediaType: MediaTypes
): IUrlObject {
  return {
    name: name,
    url: `/${mediaType}/airing_today`,
    queryParams: {
      language: "en-US",
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildTvMediaTypePlaylist(
  name: string,
  tvMediaType: keyof TTvMediaType
): IUrlObject {
  return {
    name: name,
    url: `/discover/tv`,
    queryParams: {
      language: "en-US",
      with_type: tvMediaType,
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildTvNetworkTvMediaTypePlaylist(
  name: string,
  tvMediaType: keyof TTvMediaType,
  networkId: keyof TNetworkCompany
): IUrlObject {
  return {
    name: name,
    url: `/discover/tv`,
    queryParams: {
      language: "en-US",
      with_type: tvMediaType,
      with_networks: String(networkCompanyIdConst[networkId]),
      include_null_first_air_dates: true,
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildNowPlayingPlaylist(
  name: string,
  mediaType: MediaTypes
): IUrlObject {
  return {
    name: name,
    url: `/${mediaType}/now_playing`,
    queryParams: {
      language: "en-US",
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildUpcomingPlaylist(
  name: string,
  mediaType: MediaTypes
): IUrlObject {
  return {
    name: name,
    url: `/${mediaType}/upcoming`,
    queryParams: {
      language: "en-US",
      primary_release_year: String(new Date(new Date()).getFullYear()),
    },
    additionalFiltersUnsupported: true,
  };
}

export function buildGenrePlaylist(
  mediaType: MediaTypes,
  genre: Genre
): IUrlObject {
  return {
    name: genre.name,
    url: `/discover/${mediaType}`,
    queryParams: {
      with_genres: String(genre.id),
      language: "en-US",
    },
    showGenresRibbon: true,
    additionalFiltersUnsupported: true,
  };
}

export function buildMultiGenresPlaylist(
  name: string,
  mediaType: MediaTypes,
  genres: Genre[]
): IUrlObject {
  const commaSeperatedGenreIds = genres.map((g) => g.id).join(",");

  return {
    name: name,
    url: `/discover/${mediaType}`,
    queryParams: {
      with_genres: commaSeperatedGenreIds,
      language: "en-US",
      include_adult: false,
    },
    showGenresRibbon: false,
    additionalFiltersUnsupported: true,
  };
}

export function buildLanguagePlaylist(
  name: string,
  mediaType: MediaTypes,
  language: ISOLang,
  releaseYear?: number
): IUrlObject {
  return {
    name: name,
    url: `/discover/${mediaType}`,
    queryParams: {
      with_original_language: language.iso639_1,
      primary_release_year:
        releaseYear !== undefined
          ? String(releaseYear)
          : String(new Date(Date.now()).getFullYear()),
    },
    additionalFiltersUnsupported: true,
  };
}

export const tvGenresList: Genre[] = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

export const movieGenresList: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export let idToGenresMapped = {};

// Default TV genres
for (let i = 0; i < tvGenresList.length; i++) {
  const genreObj = tvGenresList[i];
  // @ts-ignore
  idToGenresMapped[String(genreObj.id)] = genreObj.name;
}

// Default Movie genres
for (let i = 0; i < movieGenresList.length; i++) {
  const genreObj = movieGenresList[i];
  // @ts-ignore
  idToGenresMapped[String(genreObj.id)] = genreObj.name;
}

export const countries: ICountry[] = [
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Australia", code: "AU" },
  { name: "Canada", code: "CA" },
  { name: "India", code: "IN" },
  { name: "Japan", code: "JP" },
  { name: "Argentina", code: "AR" },
  { name: "Austria", code: "AT" },
  { name: "Belgium", code: "BE" },
  { name: "Brazil", code: "BR" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Egypt", code: "EG" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Italy", code: "IT" },
  { name: "South Korea, Republic of Korea", code: "KR" },
  { name: "Latvia", code: "LV" },
  { name: "Malaysia", code: "MY" },
  { name: "Mexico", code: "MX" },
  { name: "New Zealand", code: "NZ" },
  { name: "Pakistan", code: "PK" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Qatar", code: "QA" },
  { name: "Russian Federation", code: "RU" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "South Africa", code: "ZA" },
  { name: "Spain", code: "ES" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Taiwan", code: "TW" },
  { name: "Thailand", code: "TH" },
  { name: "Turkey", code: "TR" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
];

export const Allcountries: ICountry[] = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: 'Cote D"Ivoire', code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: 'Korea, Democratic People"S Republic of', code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: 'Lao People"S Democratic Republic', code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];
