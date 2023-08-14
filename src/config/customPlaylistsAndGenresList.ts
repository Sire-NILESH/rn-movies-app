import {
  buildAiringTodayPlaylist,
  buildDiscoverPlaylist,
  buildGenrePlaylist,
  buildLanguagePlaylist,
  buildMoviePlaylist,
  buildNowPlayingPlaylist,
  buildPopularPlaylist,
  buildTopRatedPlaylist,
  buildTrendingPlaylist,
  buildTvPlaylist,
  buildUpcomingPlaylist,
  movieGenresList,
  tvGenresList,
} from "../utils/helpers/helper";

const currentYear = new Date(Date.now()).getFullYear();

const bollywoodHindi = {
  iso639_1: "hi",
  iso639_2B: "hin",
  iso639_2T: "hin",
  name: "Hindi",
  nativeName: "हिन्दी, हिंदी",
};

const bollywoodTamil = {
  iso639_1: "ta",
  iso639_2B: "tam",
  iso639_2T: "tam",
  name: "Tamil",
  nativeName: "தமிழ்",
};

const bollywoodTelugu = {
  iso639_1: "te",
  iso639_2B: "tel",
  iso639_2T: "tel",
  name: "Telugu",
  nativeName: "తెలుగు",
};

const bollywoodKannada = {
  iso639_1: "kn",
  iso639_2B: "kan",
  iso639_2T: "kan",
  name: "Kannada",
  nativeName: "ಕನ್ನಡ",
};

const tvGenresPlaylists = [
  buildDiscoverPlaylist("Discover", "tv"),
  ...tvGenresList.map((g) => buildGenrePlaylist("tv", g)),
];

export const tvPlaylist = [
  [
    buildTrendingPlaylist("Trending", "tv"),
    buildPopularPlaylist("Popular", "tv"),
    buildTopRatedPlaylist("Top Rated", "tv"),
    buildDiscoverPlaylist("Discover", "tv"),
    buildAiringTodayPlaylist("Airing Today", "tv"),
    buildTvPlaylist("Netflix Shows", "Netflix"),
    buildTvPlaylist("HBO Shows", "HBO"),
    buildTvPlaylist("FOX", "FOX"),
    buildTvPlaylist("HULU Shows", "HULU"),
    buildTvPlaylist("Amazon Prime Shows", "Amazon Prime"),
    buildTvPlaylist("Disney+ Shows", "Disney+"),
    buildTvPlaylist("The CW", "The CW"),
    buildTvPlaylist("Apple TV+ Shows", "Apple TV+"),
    buildTvPlaylist("Adult Swim Shows", "Adult Swim"),
    buildTvPlaylist("AMC", "AMC"),
    buildTvPlaylist("ABC", "ABC"),
    buildLanguagePlaylist("Hindi", "tv", bollywoodHindi),
    buildLanguagePlaylist("Tamil", "tv", bollywoodTamil),
    buildLanguagePlaylist("Telugu", "tv", bollywoodTelugu),
    buildLanguagePlaylist("Kannada", "tv", bollywoodKannada),
    buildTvPlaylist("Cartoon Network Shows", "Cartoon Network"),
    buildTvPlaylist("Nickelodeon Shows", "Nickelodeon"),
    buildTvPlaylist("Disney Channel", "Disney Channel"),
    buildTvPlaylist("Disney XD Shows", "Disney XD"),
    buildTvPlaylist("ANIMAX Shows", "ANIMAX"),
    buildTvPlaylist("Comedy Central", "Comedy Central"),
    buildTvPlaylist("PBS Shows", "PBS"),
    buildTvPlaylist("CBS Shows", "CBS"),
    buildTvPlaylist("Peacock", "Peacock"),
    buildTvPlaylist("Starz", "Starz"),
    buildTvPlaylist("ShowTime", "ShowTime"),
    buildTvPlaylist("BBC 1", "BBC One"),
    buildTvPlaylist("BBC 2", "BBC Two"),
    buildTvPlaylist("Sky Atlantic", "Sky Atlantic"),
    buildTvPlaylist("History Tv", "History Tv"),
    buildTvPlaylist("Curiosity stream", "CuriosityStream"),
    buildTvPlaylist("National Geographic", "National Geographic"),
    buildTvPlaylist("Discovery", "Discovery"),
  ],
  [...tvGenresPlaylists],
];

const moviGenresPlaylists = [
  buildDiscoverPlaylist("Discover", "movie"),
  ...movieGenresList.map((g) => buildGenrePlaylist("movie", g)),
];

// : [IUrlObject[],IUrlObject[]]

export const moviePlaylist = [
  [
    buildTrendingPlaylist("Trending", "movie"),
    buildPopularPlaylist("Popular", "movie"),
    buildTopRatedPlaylist("Top Rated", "movie"),
    buildDiscoverPlaylist("Discover", "movie"),
    // buildAiringTodayPlaylist("Airing Today", "movie"),
    buildNowPlayingPlaylist("Playing in Theatres", "movie"),
    buildUpcomingPlaylist("New Releases", "movie"),
    buildLanguagePlaylist("Bollywood", "movie", bollywoodHindi, 0),
    buildLanguagePlaylist(`Hindi, ${currentYear}`, "movie", bollywoodHindi),
    buildLanguagePlaylist(`Tamil, ${currentYear}`, "movie", bollywoodTamil),
    buildLanguagePlaylist(`Telugu, ${currentYear}`, "movie", bollywoodTelugu),
    buildLanguagePlaylist(`Kannada, ${currentYear}`, "movie", bollywoodKannada),
    buildMoviePlaylist("Lucasfilm", "Lucasfilm"),
    buildMoviePlaylist("HBO Movies", "HBO"),
    buildMoviePlaylist("Warner Bros. Entertainment", "Warner Bros"),
    buildMoviePlaylist("Paramount", "Paramount"),
    buildMoviePlaylist("Columbia Pictures", "Columbia Pictures"),
    buildMoviePlaylist(
      "Village Roadshow Pictures",
      "Village Roadshow Pictures"
    ),
    buildMoviePlaylist("Miramax", "Miramax"),
    buildMoviePlaylist("Pixar Movies", "Pixar"),
    buildMoviePlaylist("DreamWorks", "DreamWorks"),
    buildMoviePlaylist("Metro-Goldwyn-Mayer", "Metro-Goldwyn-Mayer"),
    buildMoviePlaylist("New Line Cinema", "New Line Cinema"),
    buildMoviePlaylist("20th Century Fox", "20th Century Fox"),
    buildMoviePlaylist("Universal Pictures", "Universal Pictures"),
    buildMoviePlaylist("Lions Gate Films", "Lions Gate Films"),
    buildMoviePlaylist("Sony Pictures", "Sony Pictures"),
  ],
  [...moviGenresPlaylists],
];
