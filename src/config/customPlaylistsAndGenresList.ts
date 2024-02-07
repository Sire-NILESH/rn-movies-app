import {
  buildAiringTodayPlaylist,
  buildDiscoverPlaylist,
  buildGenrePlaylist,
  buildLanguagePlaylist,
  buildMoviePlaylist,
  buildMultiGenresPlaylist,
  buildNowPlayingPlaylist,
  buildPopularPlaylist,
  buildTopRatedPlaylist,
  buildTrendingPlaylist,
  buildTvMediaTypePlaylist,
  buildTvNetworkTvMediaTypePlaylist,
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

    buildMultiGenresPlaylist("Animation", "tv", [
      { id: 16, name: "Animation" },
    ]),
    buildMultiGenresPlaylist("Animation Comedy", "tv", [
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
    ]),
    buildMultiGenresPlaylist("Comedy Drama", "tv", [
      { id: 35, name: "Comedy" },
      { id: 18, name: "Drama" },
    ]),
    buildMultiGenresPlaylist("Crime Documentaries", "tv", [
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
    ]),
    buildMultiGenresPlaylist("Fantasy and Drama", "tv", [
      { id: 10759, name: "Action & Adventure" },
      { id: 18, name: "Drama" },
      { id: 10765, name: "Sci-Fi & Fantasy" },
    ]),
    buildMultiGenresPlaylist("Mystery Crime", "tv", [
      { id: 9648, name: "Mystery" },
      { id: 80, name: "Crime" },
    ]),

    buildLanguagePlaylist("Hindi", "tv", bollywoodHindi),
    buildLanguagePlaylist("Tamil", "tv", bollywoodTamil),
    buildLanguagePlaylist("Telugu", "tv", bollywoodTelugu),
    buildLanguagePlaylist("Kannada", "tv", bollywoodKannada),

    buildTvMediaTypePlaylist("Miniseries", 2),

    buildTvPlaylist("Adult Swim Shows", "Adult Swim"),
    buildTvPlaylist("Amazon Prime Shows", "Amazon Prime"),
    buildTvNetworkTvMediaTypePlaylist("Apple TV+ Miniseries", 2, "Apple TV+"),
    buildTvPlaylist("Apple TV+ Shows", "Apple TV+"),
    buildTvPlaylist("ABC", "ABC"),
    buildTvPlaylist("AMC", "AMC"),
    buildTvPlaylist("ANIMAX Shows", "ANIMAX"),
    buildTvPlaylist("BBC 1", "BBC One"),
    buildTvPlaylist("BBC 2", "BBC Two"),
    buildTvPlaylist("Cartoon Network Shows", "Cartoon Network"),
    buildTvPlaylist("Comedy Central", "Comedy Central"),
    buildTvPlaylist("Curiosity stream", "CuriosityStream"),
    buildTvPlaylist("CBS Shows", "CBS"),
    buildTvPlaylist("Discovery", "Discovery"),
    buildTvPlaylist("Disney Channel", "Disney Channel"),
    buildTvPlaylist("Disney XD Shows", "Disney XD"),
    buildTvPlaylist("Disney+ Shows", "Disney+"),
    buildTvPlaylist("FOX", "FOX"),
    buildTvPlaylist("History Tv", "History Tv"),
    buildTvNetworkTvMediaTypePlaylist("HBO Miniseries", 2, "HBO"),
    buildTvPlaylist("HBO Shows", "HBO"),
    buildTvNetworkTvMediaTypePlaylist("HULU Miniseries", 2, "HULU"),
    buildTvPlaylist("HULU Shows", "HULU"),
    buildTvNetworkTvMediaTypePlaylist("Netflix Miniseries", 2, "Netflix"),
    buildTvPlaylist("Netflix Shows", "Netflix"),
    buildTvPlaylist("National Geographic", "National Geographic"),
    buildTvPlaylist("Nickelodeon Shows", "Nickelodeon"),
    buildTvMediaTypePlaylist("OVA / DVD / VHS", 6),
    buildTvPlaylist("Peacock", "Peacock"),
    buildTvPlaylist("PBS Shows", "PBS"),
    buildTvPlaylist("ShowTime", "ShowTime"),
    buildTvPlaylist("Sky Atlantic", "Sky Atlantic"),
    buildTvPlaylist("Starz", "Starz"),
    buildTvPlaylist("The CW", "The CW"),
  ],
  [...tvGenresPlaylists],
];

const moviGenresPlaylists = [
  buildDiscoverPlaylist("Discover", "movie"),
  ...movieGenresList.map((g) => buildGenrePlaylist("movie", g)),
];

export const moviePlaylist = [
  [
    buildTrendingPlaylist("Trending", "movie"),
    buildPopularPlaylist("Popular", "movie"),
    buildTopRatedPlaylist("Top Rated", "movie"),
    buildDiscoverPlaylist("Discover", "movie"),
    // buildAiringTodayPlaylist("Airing Today", "movie"),
    buildNowPlayingPlaylist("Playing in Theatres", "movie"),

    buildUpcomingPlaylist("New Releases", "movie"),

    buildMultiGenresPlaylist("Action and Adventure", "movie", [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
    ]),

    buildMultiGenresPlaylist("American Western", "movie", [
      { id: 37, name: "Western" },
    ]),

    buildMultiGenresPlaylist("Epic Adventures", "movie", [
      { id: 12, name: "Adventure" },
      { id: 14, name: "Fantasy" },
    ]),

    buildMultiGenresPlaylist("Chills of Horror", "movie", [
      { id: 27, name: "Horror" },
      { id: 9648, name: "Mystery" },
    ]),

    buildMultiGenresPlaylist("Comedy", "movie", [{ id: 35, name: "Comedy" }]),

    buildMultiGenresPlaylist("Comedy with family", "movie", [
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" },
    ]),

    buildMultiGenresPlaylist("Crimes", "movie", [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
    ]),

    buildMultiGenresPlaylist("Crimes and Mystery", "movie", [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
      { id: 9648, name: "Mystery" },
    ]),

    buildMultiGenresPlaylist("Kids & Family Movies", "movie", [
      { id: 16, name: "Animation" },
      { id: 14, name: "Fantasy" },
      { id: 10751, name: "Family" },
    ]),

    buildMultiGenresPlaylist("Mystery Thrillers", "movie", [
      { id: 9648, name: "Mystery" },
      { id: 53, name: "Thriller" },
    ]),

    buildMultiGenresPlaylist("Mystical Mysteries", "movie", [
      { id: 9648, name: "Mystery" },
      { id: 14, name: "Fantasy" },
    ]),

    buildMultiGenresPlaylist("Retro Sci-Fi Horror", "movie", [
      { id: 878, name: "Science Fiction" },
      { id: 27, name: "Horror" },
    ]),

    buildMultiGenresPlaylist("Rom-com", "movie", [
      { id: 35, name: "Comedy" },
      { id: 10749, name: "Romance" },
      { id: 18, name: "Drama" },
    ]),

    buildMultiGenresPlaylist("Sci-Fi & Fantasy", "movie", [
      { id: 878, name: "Science Fiction" },
      { id: 14, name: "Fantasy" },
    ]),

    buildMultiGenresPlaylist("War Action", "movie", [
      { id: 10752, name: "War" },
      { id: 28, name: "Action" },
    ]),

    buildMultiGenresPlaylist("War History", "movie", [
      { id: 10752, name: "War" },
      // { id: 28, name: "Action" },
      // { id: 12, name: "Adventure" },
      { id: 36, name: "History" },
    ]),

    buildLanguagePlaylist("Bollywood", "movie", bollywoodHindi, 0),
    buildLanguagePlaylist(`Hindi, ${currentYear}`, "movie", bollywoodHindi),
    buildLanguagePlaylist(`Tamil, ${currentYear}`, "movie", bollywoodTamil),
    buildLanguagePlaylist(`Telugu, ${currentYear}`, "movie", bollywoodTelugu),
    buildLanguagePlaylist(`Kannada, ${currentYear}`, "movie", bollywoodKannada),

    buildMoviePlaylist("20th Century Fox", "20th Century Fox"),
    buildMoviePlaylist("Columbia Pictures", "Columbia Pictures"),
    buildMoviePlaylist("DreamWorks", "DreamWorks"),
    buildMoviePlaylist("HBO Movies", "HBO"),
    buildMoviePlaylist("Lions Gate Films", "Lions Gate Films"),
    buildMoviePlaylist("Lucasfilm", "Lucasfilm"),
    buildMoviePlaylist("Miramax", "Miramax"),
    buildMoviePlaylist("Metro-Goldwyn-Mayer", "Metro-Goldwyn-Mayer"),
    buildMoviePlaylist("New Line Cinema", "New Line Cinema"),
    buildMoviePlaylist("Paramount", "Paramount"),
    buildMoviePlaylist("Pixar Movies", "Pixar"),
    buildMoviePlaylist("Sony Pictures", "Sony Pictures"),
    buildMoviePlaylist("Universal Pictures", "Universal Pictures"),
    buildMoviePlaylist(
      "Village Roadshow Pictures",
      "Village Roadshow Pictures"
    ),
    buildMoviePlaylist("Walt Disney Pictures", "Walt Disney Pictures"),
    buildMoviePlaylist("Warner Bros. Entertainment", "Warner Bros"),
  ],
  [...moviGenresPlaylists],
];
