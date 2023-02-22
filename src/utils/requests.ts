import {
  IGenre,
  IGenresToShowHomeScreen,
  MediaTypes,
  Movie,
  MovieMedia,
  TvMedia,
} from "../typings";

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

// tv details
// const data = fetch('https://api.themoviedb.org/3/movie/76600?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// providers
// const data = fetch('https://api.themoviedb.org/3/watch/providers/regions?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// trailer videos
// const data = fetch('https://api.themoviedb.org/3/movie/646389/videos?api_key=e3e1732f8f495a1b191494b49b813669&language=en-US').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UxNzMyZjhmNDk1YTFiMTkxNDk0YjQ5YjgxMzY2OSIsInN1YiI6IjYzZGY4MTFhY2QyMDQ2MDBjMzBiMDA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A7ER6WylpDsZnk2qUkrhDWweWQ1moBHYFkiXwwU51cw
const API_KEY = "e3e1732f8f495a1b191494b49b813669";
const BASE_URL = "https://api.themoviedb.org/3";

const movieText = "batman";

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

// Is used to load more media(Movie/Tv) on scroll list end in the Tiles list screen.
export const getMediasProps = async (
  getTheseGenreMedias: number[],
  mediaType: MediaTypes,
  pageNumber: number
) => {
  const commaSeparatedGenres = getTheseGenreMedias.join(",");
  const data = await fetch(
    `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=en-US&with_genres=${commaSeparatedGenres}&page=${pageNumber}`
  ).then((res) => res.json());

  return data.results;
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
