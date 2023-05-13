import { API_KEY, BASE_URL } from "@env";
import {
  IGenre,
  IGenresToShowHomeScreen,
  IQueryParams,
  IUrlObject,
  MediaTypes,
  Trailer,
} from "../../types/typings";
import { fetchDataFromApi } from "./api";

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
  allowAdult: boolean = false,
  abortController?: AbortController
) => {
  const page = pageNumber ? pageNumber : 1;
  const url = `${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${searchText}&language=en-US&include_adult=${allowAdult}&page=${page}`;
  // const abortController = new AbortController();
  const data = await fetch(url, { signal: abortController?.signal })
    .then((res) => res.json())
    .catch((err) => {
      if (err.message === "Aborted") {
        return;
      } else throw err;
    });

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
 * Common function that calls the API and returns screen props for Tile list screens and Person medias screen.
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
        return fetchDataFromApi(urlObj.url, {
          ...urlObj.queryParams,
          ...filters,
        });
      }),
    ]);

    if (urlObjects[0].url.startsWith("/person/")) {
      const medias = [...data[0].data.cast, ...data[0].data.crew];

      // some people are credited for cast as well as crew members in some media(same), and since we collect both the cast and crew and crew we have possibility(proven) of having same media multiple times.
      const withoutDuplicates = Object.values(
        medias.reduce((acc, obj) => {
          acc[obj.id] = obj;
          return acc;
        }, {})
      );

      // it would be better to sort the TV medias of a person based upon the episode-count/appearance count of that person for that show.
      if (urlObjects[0].url.includes("/tv_credits")) {
        withoutDuplicates.sort(
          (a: any, b: any) => Number(b.episode_count) - Number(a.episode_count)
        );
      }

      return {
        medias: withoutDuplicates,
        totalPages: data[0].data.total_pages,
      };
      // return {
      //   medias: [...data[0].data.cast, ...data[0].data.crew],
      //   totalPages: data[0].data.total_pages,
      // };
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

    return data[0].data.results;
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
export const sendUrlObjApiRequestV2 = async (
  urlObjects: IUrlObject[],
  filters?: IQueryParams
) => {
  try {
    const data = await Promise.all([
      ...urlObjects.map((urlObj) =>
        fetchDataFromApi(urlObj.url, { ...urlObj.queryParams, ...filters })
      ),
    ]);

    const results = data.map((dat) => dat.data.results);
    return results;
  } catch (err) {
    throw err;
  }
};

/**
 * Is used to load more Genre related media(Movie/Tv) on scroll list end in the Tiles list screen.
 *
 * Currently unused
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
  // if the id of the genre is less than 1, it is a custom genre.
  // console.log(getTheseGenreMedias[0]);

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
  allowAdult: boolean = false,
  pageNumber: number
) => {
  try {
    const data = await fetchDataFromApi(
      `/${mediaType}/${relatedToMediaId}/recommendations?`,
      {
        language: "en-US",
        include_adult: allowAdult,
        page: pageNumber,
      }
    );
    // return data.results;
    return data.data.results;
  } catch (err) {
    // console.log(err);
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
      fetchDataFromApi(`/${mediaType}/${mediaId}/watch/providers`, {
        language: "en-US",
      }),
    ]);
    return {
      media: data[0].data,
      mediaCredits: data[1].data,
      mediaWatchProviders: data[2].data.results,
    };
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
      // return { props: data.data?.results };

      const videosData: Trailer[] = data.data?.results;

      // if we received some data,
      if (videosData.length > 0) {
        videosData.filter((v: Trailer, i: number) => v.site === "YouTube");
        return [...videosData];
      }
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
