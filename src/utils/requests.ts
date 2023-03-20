import { IGenre, IGenresToShowHomeScreen, MediaTypes } from "../typings";

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

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UxNzMyZjhmNDk1YTFiMTkxNDk0YjQ5YjgxMzY2OSIsInN1YiI6IjYzZGY4MTFhY2QyMDQ2MDBjMzBiMDA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A7ER6WylpDsZnk2qUkrhDWweWQ1moBHYFkiXwwU51cw
const API_KEY = "e3e1732f8f495a1b191494b49b813669";
const BASE_URL = "https://api.themoviedb.org/3";

const networkIds = {
  Netflix: 213,
  HBO: 49,
  HULU: 453,
  "Amazon Prime": 1024,
  "Disney+": 2739,
  "Cartoon Network": 56,
  "Adult Swim": 80,
  AMC: 174,
};

const productionComapnyIds = {
  // Netflix: "145174,178464,171251,185004,186222,192478",
  Lucasfilm: 1,
  HBO: 3268,
  "Adult Swim": 6759,
  Miramax: 14,
  Paramount: 4,
  "Columbia Pictures": 5,
  "Cartoon Network": 7899,
  Pixar: 3,
  "Warner Bros": 17,
  "20th Century Fox": 25,
  "Metro-Goldwyn-Mayer": 21,
  "Universal Pictures": 33,
  "Lions Gate Films": 35,
  "Sony Pictures": 34,
};

const customGenreIdToFetcher = {
  customTvGenresToFetcherURL: {
    // Netflix 213
    0.345457: `${BASE_URL}/discover/tv?with_networks=${networkIds.Netflix}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
    // HBO 49
    0.567456: `${BASE_URL}/discover/tv?with_networks=${networkIds.HBO}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
    // HULU 453
    0.23454545: `${BASE_URL}/discover/tv?with_networks=${networkIds.HULU}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
    // Amazon Prime 1024
    0.324778: `${BASE_URL}/discover/tv?with_networks=${networkIds["Amazon Prime"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
    // Disney+ 2739
    0.87908: `${BASE_URL}/discover/tv?with_networks=${networkIds["Disney+"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
    // Cartoon Network 56
    0.54633: `${BASE_URL}/discover/tv?with_networks=${networkIds["Cartoon Network"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
    // Adult Swim 80
    0.9765434: `${BASE_URL}/discover/tv?with_networks=${networkIds["Adult Swim"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
    // AMC 174
    0.235456: `${BASE_URL}/discover/tv?with_networks=${networkIds["AMC"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,

    // 0.45678886: "Discover",
    0.97756: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=en-US`,
    0.63465: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
    0.54364: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    0.63546: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`,
  },
  customMovieGenresToFetcherURL: {
    // Netflix
    // 0.345783442: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds.Netflix}&api_key=${API_KEY}&language=en-US`,
    // HBO
    0.9876854: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds.HBO}&api_key=${API_KEY}&language=en-US`,
    // Lucasfilm
    0.65436456: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds.Lucasfilm}&api_key=${API_KEY}&language=en-US`,
    // Columbia Pictures
    0.89733: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Columbia Pictures"]}&api_key=${API_KEY}&language=en-US`,
    // Paramount
    0.214545: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Paramount"]}&api_key=${API_KEY}&language=en-US`,
    // Warner Bros. Entertainment
    0.2344565: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Warner Bros"]}&api_key=${API_KEY}&language=en-US`,
    // 20th Century Fox
    0.9874323: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["20th Century Fox"]}&api_key=${API_KEY}&language=en-US`,
    // Metro-Goldwyn-Mayer
    0.3425567: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Metro-Goldwyn-Mayer"]}&api_key=${API_KEY}&language=en-US`,
    // Pixar
    0.745635: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Pixar"]}&api_key=${API_KEY}&language=en-US`,
    // Miramax
    0.213775: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Miramax"]}&api_key=${API_KEY}&language=en-US`,
    // Sony Pictures
    0.786576: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Sony Pictures"]}&api_key=${API_KEY}&language=en-US`,
    // Lions Gate Films
    0.9805434: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Lions Gate Films"]}&api_key=${API_KEY}&language=en-US`,
    // Universal Pictures
    0.768343: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Universal Pictures"]}&api_key=${API_KEY}&language=en-US`,

    0.6754435: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
    // "0.768343": "New HD Releases",
    // "0.9805434": `${BASE_URL}/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false`,
    0.788734: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    0.2345646: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
    0.985633: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    0.132323: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`,
    // "0.786576": "Wrestling",
  },
};

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
  const url = `${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${searchText}&language=en-US&page=1&include_adult=false&page=${page}`;
  // const abortController = new AbortController();
  const data = await fetch(url, { signal: abortController?.signal })
    .then((res) => res.json())
    .catch((err) => {
      if (err.message === "Aborted") {
        console.log(err.message);
        return;
      }
      throw err;
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
        return fetch(
          `${BASE_URL}/discover/${genre.mediaType}?api_key=${API_KEY}&language=en-US&with_genres=${genre.id}`
        ).then((res) => res.json());
      }

      // If reached here, we are dealing with a custom genre i.e. < 0
      if (genre.id < 1) {
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
        fetch(
          `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=en-US&with_genres=${genre.id}`
        ).then((res) => res.json())
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
 * Is used to load more Genre related media(Movie/Tv) on scroll list end in the Tiles list screen.
 *
 * @param getTheseGenreMedias - An array of genres that is to be loaded.
 * @param mediaType - The type of media to be loaded.
 * @param pageNumber - The page number
 */
export const getGenreMediasProps = async (
  getTheseGenreMedias: number[],
  mediaType: MediaTypes,
  pageNumber: number
) => {
  console.log(mediaType, getTheseGenreMedias, pageNumber);

  // if the id of the genre is less than 1, it is a custom genre.
  console.log(getTheseGenreMedias[0]);

  if (getTheseGenreMedias[0] >= 1) {
    const commaSeparatedGenres = getTheseGenreMedias.join(",");
    const data = await fetch(
      `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=en-US&with_genres=${commaSeparatedGenres}&page=${pageNumber}`
    ).then((res) => res.json());

    return data.results;
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
  const data = await fetch(
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
    `${BASE_URL}/${mediaType}/${relatedToMediaId}/recommendations?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
    // this was for similar only
    // `${BASE_URL}/${mediaType}/${relatedToMediaId}/similar?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
      throw new err();
    });

  console.log(mediaType);
  return data.results;
};

/**
 *Is used to load more  info on the TV media on the more info screen, specifically to access total number seasons for that show and others too while we are there at it.
 *
 * @param {number} tvMediaId - The ID of the TV show on the `MoreInfo` screen whose details are to be fetched
 * @return {*}
 */
export const getTvShowInfo = async (tvMediaId: number) => {
  const data = await fetch(
    // https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
    `${BASE_URL}/tv/${tvMediaId}?api_key=${API_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
      throw new err();
    });

  return data;
};

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
  const data = await fetch(
    `${BASE_URL}/${mediaType}/${mediaId}/watch/providers?api_key=${API_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
      throw new err();
    });

  return data.results;
  // return data.results["IN"];
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
  const data = await fetch(
    // https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=<<api_key>>&language=en-US
    `${BASE_URL}/tv/${tvMediaId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
      throw new err();
    });

  return data.results;
};

/**
 * Fucntion to fetch for the list of trailers for the given media and its media type.
 *
 * @param mediaId - The id of the media
 * @param mediaType - The media type of the media, This the distinguishing param from `tv` and `movie`
 * @returns - returns data as an object {`props`}
 */
export const fetchTrailers = async (mediaId: number, mediaType: MediaTypes) => {
  const url = `${BASE_URL}/${mediaType}/${mediaId}/videos?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US`;
  const data = await fetch(url)
    .then((data) => data.json())
    .catch((err) => {
      console.log(err.message);
      throw new Error(err.message);
    });

  if (data) {
    // console.log("from requests", data);
    return { props: data?.results };
  }
};

/**
 * To fetch for the list of genres for the given media type
 *
 * @param media - The media type to fetch
 * @returns  - returns data as an object {`props`}
 */
export const fetchGenres = async (media: MediaTypes) => {
  const url = `https://api.themoviedb.org/3/genre/${media}/list?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US`;
  const data = await fetch(url)
    .then((data) => data.json())
    .catch((err) => {
      console.log(err.message);
      throw new Error(err.message);
    });

  if (data) {
    // console.log("from requests", data);
    return { props: data?.genres };
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
  const url = `${BASE_URL}/tv/${tvMediaId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`;
  const data = await fetch(url)
    .then((data) => data.json())
    .catch((err) => {
      console.log(err.message);
      throw new Error(err.message);
    });

  if (data) {
    // Deleting unnecessary data from each season that we won't use.
    data.episodes.forEach((e: any) => {
      delete e["crew"];
      delete e["guest_stars"];
    });
    return data;
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
};

export default REQUESTS;
