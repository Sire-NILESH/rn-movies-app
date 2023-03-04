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

// Recommended content TV
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

// API call to get the search results for the keywords.
export const searchRequest = async (
  searchText: string,
  mediaType: MediaTypes,
  abortController: AbortController
) => {
  const url = `${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${searchText}&language=en-US&page=1&include_adult=false`;
  // const abortController = new AbortController();
  const data = await fetch(url, { signal: abortController.signal })
    .then((res) => res.json())
    .catch((err) => {
      if (err.message === "Aborted") {
        console.log(err.message);
        return;
      }
      throw err;
    });

  console.log("fetching", searchText);

  if (data?.results) return { props: data?.results, mediaType: mediaType };
};

/* Function that calls the API and returns props for the Home screen only. 
   Only needs a list of genres that is to be requested.
*/
export const getHomeScreenProps = async (
  getTheseGenreMedias: IGenresToShowHomeScreen[]
) => {
  const data = await Promise.all([
    ...getTheseGenreMedias.map((genre) =>
      fetch(
        `${BASE_URL}/discover/${genre.mediaType}?api_key=${API_KEY}&language=en-US&with_genres=${genre.id}`
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
};

/*  Common function that calls the API and returns screen props for Movies and Tv screens.
Requires a list of genres to be fetched and type media type movie/tv.
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

// Is used to load more Genre related media(Movie/Tv) on scroll list end in the Tiles list screen.
export const getGenreMediasProps = async (
  getTheseGenreMedias: number[],
  mediaType: MediaTypes,
  pageNumber: number
) => {
  console.log(mediaType, getTheseGenreMedias, pageNumber);
  const commaSeparatedGenres = getTheseGenreMedias.join(",");
  console.log(pageNumber);
  const data = await fetch(
    `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=en-US&with_genres=${commaSeparatedGenres}&page=${pageNumber}`
  ).then((res) => res.json());

  return data.results;
};

// Is used to load more  Related/Similar media(Movie/Tv) on scroll list end in the Related tiles list screen.
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

// Is used to load more  info on the TV media on the more info screen, specifically to access total number seasons for that show and others too while we are there at it.
export /**
 *Is used to load more  info on the TV media on the more info screen, specifically to access total number seasons for that show and others too while we are there at it.
 *
 * @param {number} tvMediaId - The ID of the TV show on the `MoreInfo` screen whose details are to be fetched
 * @return {*}
 */
const getTvShowInfo = async (tvMediaId: number) => {
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

// To fetch more information about a particular season number of a tv show.
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

// fucntion to fetch for the list of trailers for the given media and its media type.
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

  // return {
  //   props: [
  //     {
  //       iso_639_1: "en",
  //       iso_3166_1: "US",
  //       name: "Inside Game of Thrones: A Story in Camera Work – BTS (HBO)",
  //       key: "y2ZJ3lTaREY",
  //       site: "YouTube",
  //       size: 1080,
  //       type: "Behind the Scenes",
  //       official: true,
  //       published_at: "2019-03-25T14:00:06.000Z",
  //       id: "5c999b48c3a36863b73b9d42",
  //     },
  //     {
  //       iso_639_1: "en",
  //       iso_3166_1: "US",
  //       name: "Inside Game of Thrones: A Story in Prosthetics – BTS (HBO)",
  //       key: "f3MUpuRF6Ck",
  //       site: "YouTube",
  //       size: 1080,
  //       type: "Behind the Scenes",
  //       official: true,
  //       published_at: "2019-03-11T14:00:03.000Z",
  //       id: "5c92c2519251412b51773135",
  //     },
  //     {
  //       iso_639_1: "en",
  //       iso_3166_1: "US",
  //       name: "GAME OF THRONES - SEASON 1- TRAILER",
  //       key: "bjqEWgDVPe0",
  //       published_at: "2017-02-20T15:25:56.000Z",
  //       site: "YouTube",
  //       size: 1080,
  //       type: "Trailer",
  //       official: true,
  //       id: "5b5b91c2925141523700502c",
  //     },
  //     {
  //       iso_639_1: "en",
  //       iso_3166_1: "US",
  //       name: "Game of Thrones | Season 1 | Official Trailer",
  //       key: "BpJYNVhGf1s",
  //       site: "YouTube",
  //       size: 1080,
  //       type: "Trailer",
  //       official: true,
  //       published_at: "2011-03-04T04:21:14.000Z",
  //       id: "5c9295200e0a267cd8168bd8",
  //     },
  //   ],
  // };
};

// fucntion to fetch for the list of genres for the given media type
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
