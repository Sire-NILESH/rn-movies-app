import { IGenre, IGenresToShowHomeScreen, MediaTypes } from "../typings";

export const tvScreenGenresToShow: IGenre[] = [
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 80, name: "Crime" },
  { id: 35, name: "Comedy" },
  { id: 10767, name: "Talk" },
  { id: 16, name: "Animation" },
  { id: 10751, name: "Family" },
  { id: 18, name: "Drama" },
  { id: 99, name: "Documentary" },
];

export const movieScreenGenresToShow: IGenre[] = [
  { id: 35, name: "Comedy" },
  { id: 12, name: "Adventure" },
  { id: 18, name: "Drama" },
  { id: 28, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Science Fiction" },
  { id: 99, name: "Documentary" },
];

export const homeScreenGenresToShow: IGenresToShowHomeScreen[] = [
  { id: 10765, name: "Sci-Fi & Fantasy", mediaType: "tv" },
  { id: 28, name: "Action", mediaType: "movie" },
  { id: 16, name: "Animation", mediaType: "tv" },
  { id: 35, name: "Comedy", mediaType: "movie" },
  { id: 18, name: "Drama", mediaType: "tv" },
  { id: 10752, name: "War", mediaType: "movie" },
  { id: 99, name: "Documentary", mediaType: "tv" },
  { id: 10751, name: "Family", mediaType: "movie" },
];
