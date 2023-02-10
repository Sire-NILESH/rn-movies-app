import { Movie } from "../typings";

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

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UxNzMyZjhmNDk1YTFiMTkxNDk0YjQ5YjgxMzY2OSIsInN1YiI6IjYzZGY4MTFhY2QyMDQ2MDBjMzBiMDA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A7ER6WylpDsZnk2qUkrhDWweWQ1moBHYFkiXwwU51cw
const API_KEY = "e3e1732f8f495a1b191494b49b813669";
const BASE_URL = "https://api.themoviedb.org/3";

const movieText = "batman";

export const searchRequest = async (
  searchText: string,
  mediaType: "movie" | "tv" | "multi",
  abortController: AbortController
) => {
  const url = `${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${searchText}&language=en-US&page=1&include_adult=true`;
  // const abortController = new AbortController();
  const data = await fetch(url, { signal: abortController.signal })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));

  console.log("fetching", searchText);
  return { props: data.results };
};

export const tvRequests = {
  fetchTrending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchAnimationTvShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16`,
  fetchComedyTvShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchCrimeTvShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=80`,
  fetchRomanceTvShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=99`,
};
export const allRequests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=99`,
};
export const movieRequests = {
  fetchTrending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
};

// export const getMoviesScreenProps = async () => {
export const getMoviesScreenProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(movieRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(movieRequests.fetchTrending).then((res) => res.json()),
    fetch(movieRequests.fetchTopRated).then((res) => res.json()),
    fetch(movieRequests.fetchActionMovies).then((res) => res.json()),
    fetch(movieRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(movieRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(movieRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(movieRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  netflixOriginals.results.forEach(
    (content: Movie) => (content.type = "movie")
  );
  trendingNow.results.forEach((content: Movie) => (content.type = "movie"));
  topRated.results.forEach((content: Movie) => (content.type = "movie"));
  actionMovies.results.forEach((content: Movie) => (content.type = "movie"));
  comedyMovies.results.forEach((content: Movie) => (content.type = "movie"));
  horrorMovies.results.forEach((content: Movie) => (content.type = "movie"));
  romanceMovies.results.forEach((content: Movie) => (content.type = "movie"));
  documentaries.results.forEach((content: Movie) => (content.type = "movie"));

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};

export const getTVScreenProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    animationTvShows,
    comedyTvShows,
    crimeTvShows,
    romanceTvShows,
    documentaries,
  ] = await Promise.all([
    fetch(tvRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(tvRequests.fetchTrending).then((res) => res.json()),
    fetch(tvRequests.fetchTopRated).then((res) => res.json()),
    fetch(tvRequests.fetchAnimationTvShows).then((res) => res.json()),
    fetch(tvRequests.fetchComedyTvShows).then((res) => res.json()),
    fetch(tvRequests.fetchCrimeTvShows).then((res) => res.json()),
    fetch(tvRequests.fetchRomanceTvShows).then((res) => res.json()),
    fetch(tvRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  netflixOriginals.results.forEach((content: Movie) => (content.type = "tv"));
  trendingNow.results.forEach((content: Movie) => (content.type = "tv"));
  topRated.results.forEach((content: Movie) => (content.type = "tv"));
  animationTvShows.results.forEach((content: Movie) => (content.type = "tv"));
  comedyTvShows.results.forEach((content: Movie) => (content.type = "tv"));
  crimeTvShows.results.forEach((content: Movie) => (content.type = "tv"));
  romanceTvShows.results.forEach((content: Movie) => (content.type = "tv"));
  documentaries.results.forEach((content: Movie) => (content.type = "tv"));

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      animationTvShows: animationTvShows.results,
      comedyTvShows: comedyTvShows.results,
      crimeTvShows: crimeTvShows.results,
      romanceTvShows: romanceTvShows.results,
      documentaries: documentaries.results,
    },
  };
};

export const getAllScreenProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(allRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(allRequests.fetchTrending).then((res) => res.json()),
    fetch(allRequests.fetchTopRated).then((res) => res.json()),
    fetch(allRequests.fetchActionMovies).then((res) => res.json()),
    fetch(allRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(allRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(allRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(allRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  netflixOriginals.results.forEach((content: Movie) => (content.type = "tv"));
  trendingNow.results.forEach(
    (content: Movie) => (content.type = content.media_type)
  );
  topRated.results.forEach((content: Movie) => (content.type = "movie"));
  actionMovies.results.forEach((content: Movie) => (content.type = "movie"));
  comedyMovies.results.forEach((content: Movie) => (content.type = "tv"));
  horrorMovies.results.forEach((content: Movie) => (content.type = "movie"));
  romanceMovies.results.forEach((content: Movie) => (content.type = "tv"));
  documentaries.results.forEach((content: Movie) => (content.type = "tv"));

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};

const genres = {
  genres: [
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
  ],
};
