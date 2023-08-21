import { IPlaylist } from "../../types/typings";
import {
  buildGenrePlaylist,
  buildMultiGenresPlaylist,
  buildPopularPlaylist,
  buildTrendingPlaylist,
  buildUpcomingPlaylist,
} from "../utils/helpers/helper";

export const homeScreenPlaylists: IPlaylist[] = [
  // "Trending TV shows"
  buildTrendingPlaylist("Trending TV Shows", "tv"),
  // "Trending Movies"
  buildTrendingPlaylist("Trending Movies", "movie"),

  // "Animation Comedy"
  buildMultiGenresPlaylist("Animation Comedy", "tv", [
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
  ]),
  // "Mystery Thrillers"
  buildMultiGenresPlaylist("Mystery Thrillers", "movie", [
    { id: 9648, name: "Mystery" },
    { id: 53, name: "Thriller" },
  ]),
  // "Chronic Crimes"
  // buildMultiGenresPlaylist("Chronic Crimes", "movie", [
  //   { id: 80, name: "Crime" },
  //   { id: 18, name: "Drama" },
  //   { id: 9648, name: "Mystery" },
  // ]),
  // "Comedy Drama"
  buildMultiGenresPlaylist("Comedy Drama", "tv", [
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
  ]),
  // "War Action"
  buildMultiGenresPlaylist("War Action", "movie", [
    { id: 10752, name: "War" },
    { id: 28, name: "Action" },
  ]),
  // "Crime Documentaries"
  buildMultiGenresPlaylist("Crime Documentaries", "tv", [
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
  ]),
  // "Epic Adventures"
  buildMultiGenresPlaylist("Epic Adventures", "movie", [
    { id: 12, name: "Adventure" },
    { id: 14, name: "Fantasy" },
  ]),
];

export const movieScreenPlaylists: IPlaylist[] = [
  // "Popular Movies"
  buildPopularPlaylist("Popular Movies", "movie"),
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
  // "Chills of Horror"
  buildMultiGenresPlaylist("Chills of Horror", "movie", [
    { id: 27, name: "Horror" },
    { id: 9648, name: "Mystery" },
  ]),
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
