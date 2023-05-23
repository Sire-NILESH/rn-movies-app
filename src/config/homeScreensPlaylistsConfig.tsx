import { IPlaylist } from "../../types/typings";
import {
  buildGenrePlaylist,
  buildPopularPlaylist,
  buildTrendingPlaylist,
} from "../utils/helpers/helper";

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
  // "Trending"
  buildTrendingPlaylist("Trending", "movie"),
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
  // buildGenrePlaylist("movie", { id: 99, name: "Documentary" }),
];

export const tvScreenPlaylists: IPlaylist[] = [
  // "Sci-Fi & Fantasy"
  buildGenrePlaylist("tv", { id: 10765, name: "Sci-Fi & Fantasy" }),
  // "Comedy"
  buildGenrePlaylist("tv", { id: 35, name: "Laugh Track" }),
  // "Crime"
  buildGenrePlaylist("tv", { id: 80, name: "Crime" }),
  // "Kids"
  buildGenrePlaylist("tv", { id: 10762, name: "Kids" }),
  // "Animation"
  buildGenrePlaylist("tv", { id: 16, name: "Animated Amusements" }),
  // "Family"
  buildGenrePlaylist("tv", { id: 10751, name: "Family Time" }),
  // "Drama"
  buildGenrePlaylist("tv", { id: 18, name: "Emotional Rollercoaster" }),
  // "Documentary"
  buildGenrePlaylist("tv", { id: 99, name: "Real Life Chronicles" }),
];
