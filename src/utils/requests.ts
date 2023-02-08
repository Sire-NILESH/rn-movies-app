import { Movie } from "../typings";

// Movie search
// const data = fetch('https://api.themoviedb.org/3/search/movie?api_key=e3e1732f8f495a1b191494b49b813669&query=batman&language=en-US&page=1&include_adult=false').then((data)=>data.json()).then((res)=>console.log(res))

// TV search
// const data = fetch('https://api.themoviedb.org/3/search/tv?api_key=e3e1732f8f495a1b191494b49b813669&query=batman&language=en-US&page=1&include_adult=false').then((data)=>data.json()).then((res)=>console.log(res))

// Multi search
// const data = fetch('https://api.themoviedb.org/3/search/multi?api_key=e3e1732f8f495a1b191494b49b813669&query=batman&language=en-US&page=1&include_adult=false').then((data)=>data.json()).then((res)=>console.log(res))

// keywords
// const data = fetch('https://api.themoviedb.org/3/search/keyword?api_key=e3e1732f8f495a1b191494b49b813669&query=bat&page=1').then((data)=>data.json()).then((res)=>console.log(res)).catch((err)=>console.log(err.message))

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UxNzMyZjhmNDk1YTFiMTkxNDk0YjQ5YjgxMzY2OSIsInN1YiI6IjYzZGY4MTFhY2QyMDQ2MDBjMzBiMDA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A7ER6WylpDsZnk2qUkrhDWweWQ1moBHYFkiXwwU51cw
const API_KEY = "e3e1732f8f495a1b191494b49b813669";
const BASE_URL = "https://api.themoviedb.org/3";

export const tvRequests = {
  fetchTrending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10749`,
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
