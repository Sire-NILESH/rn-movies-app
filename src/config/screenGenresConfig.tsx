import { IPlaylist } from "../../types/typings";
import {
  buildGenrePlaylist,
  buildPopularPlaylist,
  buildTrendingPlaylist,
} from "../utils/helpers/helper";

// export const tvScreenGenresToShow: IGenre[] = [
//   { id: 10765, name: "Sci-Fi & Fantasy" },
//   { id: 80, name: "Crime" },
//   { id: 35, name: "Comedy" },
//   { id: 10767, name: "Talk" },
//   { id: 16, name: "Animation" },
//   { id: 10751, name: "Family" },
//   { id: 18, name: "Drama" },
//   { id: 99, name: "Documentary" },
// ];

// export const movieScreenGenresToShow: IGenre[] = [
//   { id: 35, name: "Comedy" },
//   { id: 12, name: "Adventure" },
//   { id: 18, name: "Drama" },
//   { id: 28, name: "Action" },
//   { id: 16, name: "Animation" },
//   { id: 27, name: "Horror" },
//   { id: 878, name: "Science Fiction" },
//   { id: 99, name: "Documentary" },
// ];

// export const homeScreenGenresToShow: IGenresToShowHomeScreen[] = [
//   { id: 0.97756, name: "Trending TV shows", mediaType: "tv" },
//   { id: 0.2345646, name: "Popular Movies", mediaType: "movie" },
//   { id: 16, name: "Animation", mediaType: "tv" },
//   { id: 35, name: "Comedy", mediaType: "movie" },
//   { id: 18, name: "Drama", mediaType: "tv" },
//   { id: 10752, name: "War", mediaType: "movie" },
//   { id: 99, name: "Documentary", mediaType: "tv" },
//   { id: 10751, name: "Family", mediaType: "movie" },
// ];

// export const movieScreenGenresToShow: IGenresToShowHomeScreen[] = [
//   { id: 35, name: "Comedy", mediaType: "movie" },
//   { id: 12, name: "Adventure", mediaType: "movie" },
//   { id: 18, name: "Drama", mediaType: "movie" },
//   { id: 28, name: "Action", mediaType: "movie" },
//   { id: 16, name: "Animation", mediaType: "movie" },
//   { id: 27, name: "Horror", mediaType: "movie" },
//   { id: 878, name: "Science Fiction", mediaType: "movie" },
//   { id: 99, name: "Documentary", mediaType: "movie" },
// ];

// export const tvScreenGenresToShow: IGenresToShowHomeScreen[] = [
//   { id: 10765, name: "Sci-Fi & Fantasy", mediaType: "tv" },
//   { id: 80, name: "Crime", mediaType: "tv" },
//   { id: 35, name: "Comedy", mediaType: "tv" },
//   { id: 10767, name: "Talk", mediaType: "tv" },
//   { id: 16, name: "Animation", mediaType: "tv" },
//   { id: 10751, name: "Family", mediaType: "tv" },
//   { id: 18, name: "Drama", mediaType: "tv" },
//   { id: 99, name: "Documentary", mediaType: "tv" },
// ];

export const homeScreenPlaylists: IPlaylist[] = [
  // "Trending TV shows"
  buildTrendingPlaylist("Trending TV Shows", "tv"),
  // "Popular Movies"
  buildPopularPlaylist("Popular Movies", "movie"),
  // "Animation"
  buildGenrePlaylist("movie", { id: 16, name: "Animated Delights" }),
  // "Comedy"
  buildGenrePlaylist("movie", { id: 35, name: "Comedy Corner" }),
  // "Drama"
  buildGenrePlaylist("tv", { id: 18, name: "Drama Central" }),
  // "War"
  buildGenrePlaylist("movie", { id: 10752, name: "War Stories" }),
  // "Documentary"
  buildGenrePlaylist("tv", { id: 99, name: "Documentary" }),
  // "Family"
  buildGenrePlaylist("movie", { id: 10751, name: "Family Favorites" }),
];

export const movieScreenPlaylists: IPlaylist[] = [
  // "Comedy"
  buildGenrePlaylist("movie", { id: 35, name: "Comedy Corner" }),
  // "Adventure"
  buildGenrePlaylist("movie", { id: 12, name: "Adventure" }),
  // "Drama"
  buildGenrePlaylist("movie", { id: 18, name: "Drama Central" }),
  // "Action"
  buildGenrePlaylist("movie", { id: 28, name: "Action Busters" }),
  // "Animation"
  buildGenrePlaylist("movie", { id: 16, name: "Animated Delights" }),
  // "Horror"
  buildGenrePlaylist("movie", { id: 27, name: "Horrors & Nightmares" }),
  // "Science Fiction"
  buildGenrePlaylist("movie", { id: 878, name: "Science Fiction" }),
  // "Documentary"
  buildGenrePlaylist("movie", { id: 99, name: "Documentary" }),
];

export const tvScreenPlaylists: IPlaylist[] = [
  // "Sci-Fi & Fantasy"
  buildGenrePlaylist("tv", { id: 10765, name: "Sci-Fi & Fantasy" }),
  // "Crime"
  buildGenrePlaylist("tv", { id: 80, name: "Criminal Minds" }),
  // "Comedy"
  buildGenrePlaylist("tv", { id: 35, name: "Laugh Track" }),
  // "Talk"
  buildGenrePlaylist("tv", { id: 10767, name: "Talk It Out" }),
  // "Animation"
  buildGenrePlaylist("tv", { id: 16, name: "Animated Amusements" }),
  // "Family"
  buildGenrePlaylist("tv", { id: 10751, name: "Family Time" }),
  // "Drama"
  buildGenrePlaylist("tv", { id: 18, name: "Emotional Rollercoaster" }),
  // "Documentary"
  buildGenrePlaylist("tv", { id: 99, name: "Real Life Chronicles" }),
];
