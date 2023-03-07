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

  // return {
  //   _id: "5256c89f19c2956ff6046d47",
  //   air_date: "2011-04-17",
  //   episodes: [
  //     {
  //       air_date: "2011-04-17",
  //       episode_number: 1,
  //       id: 63056,
  //       name: "Winter Is Coming",
  //       overview:
  //         "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
  //       production_code: "101",
  //       runtime: 62,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg",
  //       vote_average: 7.8,
  //       vote_count: 284,
  //     },
  //     {
  //       air_date: "2011-04-24",
  //       episode_number: 2,
  //       id: 63057,
  //       name: "The Kingsroad",
  //       overview:
  //         "While Bran recovers from his fall, Ned takes only his daughters to Kings Landing. Jon Snow goes with his uncle Benjen to The Wall. Tyrion joins them.",
  //       production_code: "102",
  //       runtime: 55,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/1kdHRLs05ia0E9X3Hi5Ts5Sc1jk.jpg",
  //       vote_average: 7.7,
  //       vote_count: 185,
  //     },
  //     {
  //       air_date: "2011-05-01",
  //       episode_number: 3,
  //       id: 63058,
  //       name: "Lord Snow",
  //       overview:
  //         "Lord Stark and his daughters arrive at King's Landing to discover the intrigues of the king's realm.",
  //       production_code: "103",
  //       runtime: 57,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg",
  //       vote_average: 8,
  //       vote_count: 152,
  //     },
  //     {
  //       air_date: "2011-05-08",
  //       episode_number: 4,
  //       id: 63059,
  //       name: "Cripples, Bastards, and Broken Things",
  //       overview:
  //         "Eddard investigates Jon Arryn's murder. Jon befriends Samwell Tarly, a coward who has come to join the Night's Watch.",
  //       production_code: "104",
  //       runtime: 55,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/Ai2UPMWv38xGjOgNBuA1o8w8dUI.jpg",
  //       vote_average: 8.085,
  //       vote_count: 129,
  //     },
  //     {
  //       air_date: "2011-05-15",
  //       episode_number: 5,
  //       id: 63060,
  //       name: "The Wolf and the Lion",
  //       overview:
  //         "Catelyn has captured Tyrion and plans to bring him to her sister, Lysa Arryn, at The Vale, to be tried for his, supposed, crimes against Bran. Robert plans to have Daenerys killed, but Eddard refuses to be a part of it and quits.",
  //       production_code: "105",
  //       runtime: 54,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/eeMxrTGa4Tin8oyZx1fOfSRuMdz.jpg",
  //       vote_average: 8.47,
  //       vote_count: 135,
  //     },
  //     {
  //       air_date: "2011-05-22",
  //       episode_number: 6,
  //       id: 63061,
  //       name: "A Golden Crown",
  //       overview:
  //         "While recovering from his battle with Jamie, Eddard is forced to run the kingdom while Robert goes hunting. Tyrion demands a trial by combat for his freedom. Viserys is losing his patience with Drogo.",
  //       production_code: "106",
  //       runtime: 53,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/6FcfWGFlDyWZ2JvQi8uvkxbDx1z.jpg",
  //       vote_average: 8.322,
  //       vote_count: 132,
  //     },
  //     {
  //       air_date: "2011-05-29",
  //       episode_number: 7,
  //       id: 63062,
  //       name: "You Win or You Die",
  //       overview:
  //         "Robert has been injured while hunting and is dying. Jon and the others finally take their vows to the Night's Watch. A man, sent by Robert, is captured for trying to poison Daenerys. Furious, Drogo vows to attack the Seven Kingdoms.",
  //       production_code: "107",
  //       runtime: 58,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/dwrpT3W8sT9VhGf8zhVb3npfMzi.jpg",
  //       vote_average: 8.462,
  //       vote_count: 132,
  //     },
  //     {
  //       air_date: "2011-06-05",
  //       episode_number: 8,
  //       id: 63063,
  //       name: "The Pointy End",
  //       overview:
  //         "Eddard and his men are betrayed and captured by the Lannisters. When word reaches Robb, he plans to go to war to rescue them. The White Walkers attack The Wall. Tyrion returns to his father with some new friends.",
  //       production_code: "108",
  //       runtime: 58,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/loWNUGR3MtEEcx4NJ4WpEhceKBd.jpg",
  //       vote_average: 8.137,
  //       vote_count: 128,
  //     },
  //     {
  //       air_date: "2011-06-12",
  //       episode_number: 9,
  //       id: 63064,
  //       name: "Baelor",
  //       overview:
  //         "Robb goes to war against the Lannisters. Jon finds himself struggling on deciding if his place is with Robb or the Night's Watch. Drogo has fallen ill from a fresh battle wound. Daenerys is desperate to save him.",
  //       production_code: "109",
  //       runtime: 56,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/7FCFDPcxLCvhVxyjTa8rYKY0ZSV.jpg",
  //       vote_average: 8.835,
  //       vote_count: 139,
  //     },
  //     {
  //       air_date: "2011-06-19",
  //       episode_number: 10,
  //       id: 63065,
  //       name: "Fire and Blood",
  //       overview:
  //         "With Ned dead, Robb vows to get revenge on the Lannisters. Jon must officially decide if his place is with Robb or the Night's Watch. Daenerys says her final goodbye to Drogo.",
  //       production_code: "110",
  //       runtime: 53,
  //       season_number: 1,
  //       show_id: 1399,
  //       still_path: "/7GhSiFhXOg81AevNQWrX6DOEL1U.jpg",
  //       vote_average: 8.7,
  //       vote_count: 132,
  //     },
  //   ],
  //   id: 3624,
  //   name: "Season 1",
  //   overview:
  //     "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.",
  //   poster_path: "/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg",
  //   season_number: 1,
  // };
};
