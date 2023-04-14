import { API_KEY, BASE_URL } from "@env";
import {
  IGenre,
  IGenresToShowHomeScreen,
  IQueryParams,
  IUrlObject,
  MediaTypes,
} from "../../types/typings";
import { fetchDataFromApi, fetchDataFromApiV2 } from "./api";

// Movie search
// const data = fetch('https://api.themoviedb.org/3/search/movie?api_key=e3e1732f8f495a1b191494b49b813669&query=batman&language=en-US&page=1&include_adult=false').then((data)=>data.json()).then((res)=>console.log(res))

// TV search
// const data = fetch('https://api.themoviedb.org/3/search/tv?api_key=e3e1732f8f495a1b191494b49b813669&query=batman&language=en-US&page=1&include_adult=false').then((data)=>data.json()).then((res)=>console.log(res))

// Multi search
// const data = fetch('https://api.themoviedb.org/3/search/multi?api_key=e3e1732f8f495a1b191494b49b813669&query=batman&language=en-US&page=1&include_adult=false').then((data)=>data.json()).then((res)=>console.log(res))

// keywords
// const data = fetch('https://api.themoviedb.org/3/search/keyword?api_key=e3e1732f8f495a1b191494b49b813669&query=bat&page=1').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// genre
// const data = fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// tv details
// const data = fetch('https://api.themoviedb.org/3/tv/1396?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// movie details
// const data = fetch('https://api.themoviedb.org/3/movie/76600?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// providers
// const data = fetch('https://api.themoviedb.org/3/watch/providers/regions?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// trailer videos
// const data = fetch('https://api.themoviedb.org/3/movie/646389/videos?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// related/similar content
// Movies
// const data = fetch('https://api.themoviedb.org/3/movie/646389/similar?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US&page=1').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// Recommended content TV
// const data = fetch('https://api.themoviedb.org/3/movie/646389/similar?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US&page=1').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// Movie Details
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// const data = fetch('https://api.themoviedb.org/3/movie/76600?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// YT thumbnail download
// https://medium.com/apis-with-valentine/how-to-download-a-youtube-video-thumbnail-fedb511c88a1
// https://img.youtube.com/vi/juuhb3W8xT4/maxresdefault.jpg

// Watch Providers.
// https://api.themoviedb.org/3/tv/{tv_id}/watch/providers?api_key=<<api_key>>
// const data = fetch('https://api.themoviedb.org/3/tv/94997/watch/providers?api_key=e3e1732f8f495a1b191494b49b813669').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

/**
 * API call to get the search results for the keywords.
 *
 * @param searchText - The search text `keyword` to search.
 * @param mediaType - The media type of the search, `tv` or `movie`.
 * @param abortController - The abort controller to abort the search request, meant to be passed from the cleanup method of the `useEffect`.
 * @param pageNumber - Optional, default is `1` if not provided.
 */
export const searchRequest = async (
  searchText: string,
  mediaType: MediaTypes,
  pageNumber: number,
  abortController?: AbortController
) => {
  const page = pageNumber ? pageNumber : 1;
  const url = `${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${searchText}&language=en-US&include_adult=false&page=${page}`;
  // const abortController = new AbortController();
  const data = await fetch(url, { signal: abortController?.signal })
    .then((res) => res.json())
    .catch((err) => {
      if (err.message === "Aborted") {
        console.log(err.message);
        return;
      } else throw err;
    });

  console.log("fetching", searchText);
  // console.log("------", data.results);
  if (data?.results) return { results: data?.results, mediaType: mediaType };
};

/**
 * Function that calls the API and returns props for the Home screens of `Home`, `TV shows` and `Movies` options of the drawer.
 * Only needs a list of genres that is to be requested.
 *
 * @param getTheseGenreMedias - An array of genre object contaning `id` , `name` and `mediaType` to be fetched.
 * `id` is the id of the genre.
 */
export const getHomeScreenProps = async (
  getTheseGenreMedias: IGenresToShowHomeScreen[]
) => {
  const data = await Promise.all([
    ...getTheseGenreMedias.map((genre, i) => {
      // Real genre ids are > 1
      if (genre.id >= 1) {
        return fetchDataFromApi(`/discover/${genre.mediaType}`, {
          with_genres: String(genre.id),
          page: 1,
        })
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          });
      }

      // If reached here, we are dealing with a custom genre i.e. < 0
      else if (genre.id < 1) {
        let URL;
        if (genre.mediaType === "movie") {
          console.log(
            "reached here",
            (URL =
              // @ts-ignore
              customGenreIdToFetcher.customMovieGenresToFetcherURL[
                String(genre.id)
              ])
          );
          URL =
            // @ts-ignore
            customGenreIdToFetcher.customMovieGenresToFetcherURL[
              String(genre.id)
            ];
        }

        if (genre.mediaType === "tv") {
          URL =
            // @ts-ignore
            customGenreIdToFetcher.customTvGenresToFetcherURL[String(genre.id)];
        }

        if (URL) {
          return fetch(URL).then((res) => res.json());
        }
      }
    }),
  ]);

  const results = getTheseGenreMedias.map((genre, i) => {
    return {
      genreId: genre.id,
      genreName: genre.name,
      genreMedias: data[i].results,
    };
  });

  return results;
};

/**
 * Common function that calls the API and returns screen props for Movies and Tv screens.
 * Requires a list of genres to be fetched and type media type movie/tv.
 *
 * Currently unused.
 *
 * @param getTheseGenreMedias - An array of genres to be fetched.
 * @param mediaType - The type of media to be fetched.
 */
export const getScreenProps = async (
  getTheseGenreMedias: IGenre[],
  mediaType: MediaTypes
) => {
  let data: any;
  try {
    data = await Promise.all([
      ...getTheseGenreMedias.map((genre) =>
        fetchDataFromApi(`/discover/${mediaType}`, {
          with_genres: String(genre.id),
          page: 1,
        }).then((res) => res.data)
      ),
    ]);

    const results = getTheseGenreMedias.map((genre, i) => {
      return {
        genreId: genre.id,
        genreName: genre.name,
        genreMedias: data[i].results,
      };
    });

    return results;
  } catch (err) {
    throw err;
  }
};

/**
 * Common function that calls the API and returns screen props for Tile list screens.
 * Requires a list of IUrlObject to be fetched.
 *
 *
 * @param urlObject - An array of the type IUrlObject to be fetched that contains the url and query params object.
 */
export const getTileListScreenMedias = async (
  urlObjects: IUrlObject[],
  filters: IQueryParams
) => {
  try {
    const data = await Promise.all([
      ...urlObjects.map((urlObj) => {
        console.log(urlObj);
        return fetchDataFromApi(urlObj.url, {
          ...urlObj.queryParams,
          ...filters,
        });
      }),
    ]);

    if (urlObjects[0].url.startsWith("/person/")) {
      return {
        medias: [...data[0].data.cast, ...data[0].data.crew],
        totalPages: data[0].data.total_pages,
      };
    }

    return {
      medias: data[0].data.results,
      totalPages: data[0].data.total_pages,
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Common function that calls the API and returns screen props
 * Requires a list of IUrlObject to be fetched.
 *
 *
 * @param urlObject - An array of the type IUrlObject to be fetched that contains the url and query params object.
 */
export const sendUrlObjApiRequest = async (
  urlObjects: IUrlObject[],
  filters?: IQueryParams
) => {
  try {
    const data = await Promise.all([
      ...urlObjects.map((urlObj) =>
        fetchDataFromApi(urlObj.url, { ...urlObj.queryParams, ...filters })
      ),
    ]);

    // console.log(data[0].data);
    return data[0].data.results;
  } catch (err) {
    throw err;
  }
};

/**
 * Is used to load more Genre related media(Movie/Tv) on scroll list end in the Tiles list screen.
 *
 * @param getTheseGenreMedias - An array of genres that is to be loaded.
 * @param mediaType - The type of media to be loaded.
 * @param pageNumber - The page number
 */
export const getGenreMediasProps = async (
  getTheseGenreMedias: number[],
  mediaType: MediaTypes,
  pageNumber: number,
  networkId?: number,
  productionCompanyId?: number
) => {
  console.log(mediaType, getTheseGenreMedias, pageNumber);

  // if the id of the genre is less than 1, it is a custom genre.
  console.log(getTheseGenreMedias[0]);

  if (getTheseGenreMedias[0] >= 1) {
    const commaSeparatedGenres = getTheseGenreMedias.join(",");

    try {
      const data = await fetchDataFromApi(`/discover/${mediaType}`, {
        with_genres: commaSeparatedGenres,
        page: pageNumber,
      });

      return data.data.results;
    } catch (err) {
      return err;
    }
  }

  // 0.1111 is a special decided custom genre id that is used to fetch the network-provider/production-companies media list.
  else if (getTheseGenreMedias[0] === 0.1111) {
    const companyType =
      mediaType === "movie"
        ? { queryParam: "with_companies", queryParamValue: productionCompanyId }
        : { queryParam: "with_networks", queryParamValue: networkId };

    try {
      const data = await fetchDataFromApi(`/discover/${mediaType}`, {
        [companyType.queryParam]: companyType.queryParamValue,
        include_null_first_air_dates: true,
        page: pageNumber,
      });

      return data.data.results;
    } catch (err) {
      throw err;
    }
  }

  // If reached here, we are dealing with a custom genre.
  let URL;
  switch (mediaType) {
    case "movie" as MediaTypes:
      URL =
        // @ts-ignore
        customGenreIdToFetcher.customMovieGenresToFetcherURL[
          String(getTheseGenreMedias[0])
        ] +
        "&page=" +
        pageNumber;
      break;

    case "tv" as MediaTypes:
      URL =
        // @ts-ignore
        customGenreIdToFetcher.customTvGenresToFetcherURL[
          String(getTheseGenreMedias[0])
        ] +
        "&page=" +
        pageNumber;
      break;
  }

  if (URL) {
    const data = await fetch(URL).then((res) => res.json());
    return data.results;
  }
};

/**
 * Is used to load more  Related/Similar media(Movie/Tv) on scroll list end in the Related tiles list screen.
 *
 * @param relatedToMediaId - Id of the media whose related media is to be loaded.
 * @param mediaType - Type of media to be loaded `tv` or `movie`
 * @param pageNumber - Page number
 */
export const getRelatedMediasProps = async (
  relatedToMediaId: number,
  mediaType: MediaTypes,
  pageNumber: number
) => {
  try {
    const data = await fetchDataFromApi(
      `/${mediaType}/${relatedToMediaId}/recommendations?`,
      {
        language: "en-US",
        page: pageNumber,
      }
    );
    // return data.results;
    return data.data.results;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 *Is used to load more  info on the TV media on the more info screen, specifically to access total number seasons for that show and others too while we are there at it.
 *
 * @param {number} tvMediaId - The ID of the TV show on the `MoreInfo` screen whose details are to be fetched
 * @return {*}
 */
export const getTvShowInfo = async (tvMediaId: number) => {
  try {
    const data = await fetchDataFromApi(`/tv/${tvMediaId}`, {
      language: "en-US",
    });

    return data.data.results;
  } catch (err) {
    throw err;
  }
};

/**
 *Is used to load more  info on the TV media on the more info screen, specifically to access total number seasons for that show and others too while we are there at it.
 *
 * @param {number} mediaId - The ID of the TV show on the `MoreInfo` screen whose details are to be fetched
 * @param {MediaTypes} mediaType - The media type of the show on the `MoreInfo` screen whose details are to be fetched
 * @return {*}
 */
export const getMediaInfo = async (mediaId: number, mediaType: MediaTypes) => {
  try {
    const data = await Promise.all([
      fetchDataFromApi(`/${mediaType}/${mediaId}`, {
        language: "en-US",
      }),
      fetchDataFromApi(`/${mediaType}/${mediaId}/credits`, {
        language: "en-US",
      }),
    ]);
    return { media: data[0].data, mediaCredits: data[1].data };
  } catch (err) {
    throw err;
  }
};
// /**
//  *Is used to load more  info on the TV media on the more info screen, specifically to access total number seasons for that show and others too while we are there at it.
//  *
//  * @param {number} mediaId - The ID of the TV show on the `MoreInfo` screen whose details are to be fetched
//  * @param {MediaTypes} mediaType - The media type of the show on the `MoreInfo` screen whose details are to be fetched
//  * @return {*}
//  */
// export const getMediaInfo = async (mediaId: number, mediaType: MediaTypes) => {
//   try {
//     const data = await fetchDataFromApi(`/${mediaType}/${mediaId}`, {
//       language: "en-US",
//     });
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

/**
 * This function is used to retrieve information about the media's watch providers for all the regions.
 *
 * @param mediaId - The id of the media
 * @param mediaType - The type of the media `movie` or `tv`
 * @returns an array of the watch providers for the all the regions.
 */
export const getWatchProviders = async (
  mediaId: number,
  mediaType: MediaTypes
) => {
  try {
    const data = await fetchDataFromApi(
      `/${mediaType}/${mediaId}/watch/providers`,
      {
        language: "en-US",
      }
    );
    return data.data.results;
    // return data.data.results["IN"];
  } catch (err) {
    throw err;
  }
};

/**
 * To fetch more information about a particular season number of a tv show.
 *
 * @param tvMediaId - The ID of the tv media
 * @param seasonNumber - The season number of the tv show whose details are to be fetched.
 * @returns - An object
 */
export const getTvSeasonInfo = async (
  tvMediaId: number,
  seasonNumber: number
) => {
  try {
    const data = await fetchDataFromApi(
      `/tv/${tvMediaId}/season/${seasonNumber}`,
      {
        language: "en-US",
      }
    );
    return data.data.results;
  } catch (err) {
    throw err;
  }
};

/**
 * Fucntion to fetch for the list of trailers for the given media and its media type.
 *
 * @param mediaId - The id of the media
 * @param mediaType - The media type of the media, This the distinguishing param from `tv` and `movie`
 * @returns - returns data as an object {`props`}
 */
export const fetchTrailers = async (mediaId: number, mediaType: MediaTypes) => {
  try {
    const data = await fetchDataFromApi(`/${mediaType}/${mediaId}/videos`, {
      language: "en-US",
    });
    if (data.data.results) {
      return { props: data.data?.results };
    }
  } catch (err) {
    throw err;
  }
};

/**
 * To fetch for the list of genres for the given media type
 *
 * @param mediaType - The media type to fetch
 * @returns  - returns data as an object {`props`}
 */
export const fetchGenres = async (mediaType: MediaTypes) => {
  try {
    const data = await fetchDataFromApi(`/genre/${mediaType}/list`, {
      language: "en-US",
    });
    if (data.data?.genres) {
      return { props: data.data?.genres };
    }
  } catch (err) {
    throw err;
  }
};

// fucntion to fetch for the list of genres for the given media type
/**
 * Fetches details of the given season number for a given TV media id
 *
 * @param tvMediaId - The id of the TV show
 * @param seasonNumber - Season number to fetch information of.
 * @returns `Object` - TV Seasons Details
 */
export const fetchSeasonDetails = async (
  tvMediaId: number,
  seasonNumber: number
) => {
  try {
    const data = await fetchDataFromApi(
      `/tv/${tvMediaId}/season/${seasonNumber}`,
      {
        language: "en-US",
      }
    );

    if (data.data) {
      // Deleting unnecessary data from each season that we won't use.
      data.data.episodes.forEach((e: any) => {
        delete e["crew"];
        delete e["guest_stars"];
      });
      return data.data;
    }
  } catch (err) {
    throw err;
  }
};

const REQUESTS = {
  fetchSeasonDetails,
  fetchGenres,
  fetchTrailers,
  getTvSeasonInfo,
  getWatchProviders,
  getTvShowInfo,
  getRelatedMediasProps,
  getGenreMediasProps,
  getScreenProps,
  getHomeScreenProps,
  searchRequest,
  getMediaInfo,
};

export default REQUESTS;
