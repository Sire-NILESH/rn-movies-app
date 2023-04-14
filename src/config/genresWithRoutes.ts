import {
  buildAiringTodayPlaylist,
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

// export const networkIds: INetworkIds = {
//   Netflix: 213,
//   HBO: 49,
//   FOX: 19,
//   HULU: 453,
//   "Amazon Prime": 1024,
//   "Disney+": 2739,
//   "Apple TV+": 2552,
//   "Cartoon Network": 56,
//   "Adult Swim": 80,
//   AMC: 174,
//   PBS: 14,
//   CBS: 16,
//   "History Tv": 65,
//   "BBC One": 4,
//   "BBC Two": 332,
//   "Sky Atlantic": 1063,
//   CuriosityStream: 2349,
//   "National Geographic": 43,
//   Discovery: 64,
//   ShowTime: 67,
//   ABC: 2,
//   Nickelodeon: 13,
//   "Toon Disney": 142,
//   "Disney XD": 44,
//   ANIMAX: 171,
// };

// export const productionComapnyIds = {
//   // Netflix: "145174,178464,171251,185004,186222,192478",
//   Lucasfilm: 1,
//   HBO: 3268,
//   "Adult Swim": 6759,
//   Miramax: 14,
//   Paramount: 4,
//   "Columbia Pictures": 5,
//   "Village Roadshow Pictures": 79,
//   "Cartoon Network": 7899,
//   Pixar: 3,
//   "Warner Bros": 17,
//   "20th Century Fox": 25,
//   "Metro-Goldwyn-Mayer": 21,
//   "Universal Pictures": 33,
//   "Lions Gate Films": 35,
//   "Sony Pictures": 34,
//   DreamWorks: "521",
//   // DreamWorks: [
//   //   7, 521, 3486, 15258, 42141, 73933, 114185, 114539, 125083, 144867, 183771,
//   // ],
// };

// export const customGenreIdToFetcher = {
//   customTvGenresToFetcherURL: {
//     // Netflix 213
//     0.345457: `${BASE_URL}/discover/tv?with_networks=${networkIds.Netflix}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // HBO 49
//     0.567456: `${BASE_URL}/discover/tv?with_networks=${networkIds.HBO}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     //  FOX: 19,
//     0.85345435: `${BASE_URL}/discover/tv?with_networks=${networkIds.FOX}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // HULU 453
//     0.23454545: `${BASE_URL}/discover/tv?with_networks=${networkIds.HULU}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // Amazon Prime 1024
//     0.324778: `${BASE_URL}/discover/tv?with_networks=${networkIds["Amazon Prime"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // Disney+ 2739
//     0.87908: `${BASE_URL}/discover/tv?with_networks=${networkIds["Disney+"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // "Apple TV+": 2552,
//     0.7786455: `${BASE_URL}/discover/tv?with_networks=${networkIds["Apple TV+"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // Cartoon Network 56
//     0.54633: `${BASE_URL}/discover/tv?with_networks=${networkIds["Cartoon Network"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // Adult Swim 80
//     0.9765434: `${BASE_URL}/discover/tv?with_networks=${networkIds["Adult Swim"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // AMC 174
//     0.235456: `${BASE_URL}/discover/tv?with_networks=${networkIds["AMC"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // PBS 14
//     0.83546345: `${BASE_URL}/discover/tv?with_networks=${networkIds["PBS"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // CBS 16
//     0.6673423: `${BASE_URL}/discover/tv?with_networks=${networkIds["CBS"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     //  ShowTime: 67,
//     0.234867865: `${BASE_URL}/discover/tv?with_networks=${networkIds["ShowTime"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     //  "BBC One": 4,
//     0.5575343: `${BASE_URL}/discover/tv?with_networks=${networkIds["BBC One"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     //  "BBC Two": 332,
//     0.2234787: `${BASE_URL}/discover/tv?with_networks=${networkIds["BBC Two"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     //  Sky Atlantic: 1063
//     0.4544342: `${BASE_URL}/discover/tv?with_networks=${networkIds["Sky Atlantic"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // ABC: 2,
//     0.6556346: `${BASE_URL}/discover/tv?with_networks=${networkIds["ABC"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // Nickelodeon: 13,
//     0.2324356: `${BASE_URL}/discover/tv?with_networks=${networkIds["Nickelodeon"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // "Toon Disney": 142,,
//     0.234578: `${BASE_URL}/discover/tv?with_networks=${networkIds["Toon Disney"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // "Disney XD" : 44,
//     0.34546989: `${BASE_URL}/discover/tv?with_networks=${networkIds["Disney XD"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // ANIMAX: 171,
//     0.889763: `${BASE_URL}/discover/tv?with_networks=${networkIds["ANIMAX"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // CuriosityStream 2349
//     0.346546: `${BASE_URL}/discover/tv?with_networks=${networkIds["CuriosityStream"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     // "History Tv" 65,
//     0.9823874: `${BASE_URL}/discover/tv?with_networks=${networkIds["History Tv"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     //  "National Geographic" 43,
//     0.56754623: `${BASE_URL}/discover/tv?with_networks=${networkIds["National Geographic"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,
//     //  "Discovery": 64,
//     0.952455: `${BASE_URL}/discover/tv?with_networks=${networkIds["Discovery"]}&include_null_first_air_dates=true&api_key=${API_KEY}&language=en-US`,

//     // 0.45678886: "Discover",
//     0.97756: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=en-US`,
//     0.63465: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
//     0.54364: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
//     0.63546: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`,
//   },
//   customMovieGenresToFetcherURL: {
//     // Netflix
//     // 0.345783442: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds.Netflix}&api_key=${API_KEY}&language=en-US`,
//     // HBO
//     0.9876854: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds.HBO}&api_key=${API_KEY}&language=en-US`,
//     // Lucasfilm
//     0.65436456: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds.Lucasfilm}&api_key=${API_KEY}&language=en-US`,
//     // Columbia Pictures
//     0.89733: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Columbia Pictures"]}&api_key=${API_KEY}&language=en-US`,
//     // "Village Roadshow Pictures": 79,
//     0.243468: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Village Roadshow Pictures"]}&api_key=${API_KEY}&language=en-US`,
//     // Paramount
//     0.214545: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Paramount"]}&api_key=${API_KEY}&language=en-US`,
//     // Warner Bros. Entertainment
//     0.2344565: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Warner Bros"]}&api_key=${API_KEY}&language=en-US`,
//     // 20th Century Fox
//     0.9874323: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["20th Century Fox"]}&api_key=${API_KEY}&language=en-US`,
//     // Metro-Goldwyn-Mayer
//     0.3425567: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Metro-Goldwyn-Mayer"]}&api_key=${API_KEY}&language=en-US`,
//     // Pixar
//     0.745635: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Pixar"]}&api_key=${API_KEY}&language=en-US`,
//     // DreamWorks
//     0.324786: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["DreamWorks"]}&api_key=${API_KEY}&language=en-US`,
//     // Miramax
//     0.213775: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Miramax"]}&api_key=${API_KEY}&language=en-US`,
//     // Sony Pictures
//     0.786576: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Sony Pictures"]}&api_key=${API_KEY}&language=en-US`,
//     // Lions Gate Films
//     0.9805434: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Lions Gate Films"]}&api_key=${API_KEY}&language=en-US`,
//     // Universal Pictures
//     0.768343: `${BASE_URL}/discover/movie?with_companies=${productionComapnyIds["Universal Pictures"]}&api_key=${API_KEY}&language=en-US`,

//     0.6754435: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
//     // "0.768343": "New HD Releases",
//     // "0.9805434": `${BASE_URL}/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false`,
//     0.788734: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
//     0.2345646: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
//     0.985633: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
//     0.132323: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`,
//     // "0.786576": "Wrestling",
//   },
// };

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

const tvGenresPlaylists = tvGenresList.map((g) =>
  buildGenrePlaylist("movie", g)
);

export const tvPlaylist = [
  [
    buildTrendingPlaylist("Trending", "tv"),
    buildPopularPlaylist("Popular", "tv"),
    buildTopRatedPlaylist("Top Rated", "tv"),
    buildAiringTodayPlaylist("Airing Today", "tv"),
    buildTvPlaylist("Netflix Shows", "Netflix"),
    buildTvPlaylist("HBO Shows", "HBO"),
    buildTvPlaylist("FOX", "FOX"),
    buildTvPlaylist("HULU Shows", "HULU"),
    buildTvPlaylist("Amazon Prime Shows", "Amazon Prime"),
    buildTvPlaylist("Disney+ Shows", "Disney+"),
    buildTvPlaylist("Apple TV+ Shows", "Apple TV+"),
    buildTvPlaylist("Adult Swim Shows", "Adult Swim"),
    buildTvPlaylist("AMC", "AMC"),
    buildTvPlaylist("ABC", "ABC"),
    buildLanguagePlaylist("Bollywood (Hindi)", "tv", bollywoodHindi),
    buildLanguagePlaylist("Bollywood (Tamil)", "tv", bollywoodTamil),
    buildLanguagePlaylist("Bollywood (Telugu)", "tv", bollywoodTelugu),
    buildLanguagePlaylist("Bollywood (Kannada)", "tv", bollywoodKannada),
    buildTvPlaylist("Cartoon Network Shows", "Cartoon Network"),
    buildTvPlaylist("Nickelodeon Shows", "Nickelodeon"),
    buildTvPlaylist("Disney XD Shows", "Disney XD"),
    buildTvPlaylist("ANIMAX Shows", "ANIMAX"),
    buildTvPlaylist("PBS Shows", "PBS"),
    buildTvPlaylist("CBS Shows", "CBS"),
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

const moviGenresPlaylists = movieGenresList.map((g) =>
  buildGenrePlaylist("movie", g)
);

export const moviePlaylist = [
  [
    buildTrendingPlaylist("Trending", "movie"),
    buildPopularPlaylist("Popular", "movie"),
    buildTopRatedPlaylist("Top Rated", "movie"),
    buildAiringTodayPlaylist("Airing Today", "movie"),
    buildNowPlayingPlaylist("Now Playing", "movie"),
    buildUpcomingPlaylist("New Releases", "movie"),
    buildLanguagePlaylist("Bollywood (Hindi)", "movie", bollywoodHindi),
    buildLanguagePlaylist("Bollywood (Tamil)", "movie", bollywoodTamil),
    buildLanguagePlaylist("Bollywood (Telugu)", "movie", bollywoodTelugu),
    buildLanguagePlaylist("Bollywood (Kannada)", "movie", bollywoodKannada),
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
    buildMoviePlaylist("20th Century Fox", "20th Century Fox"),
    buildMoviePlaylist("Universal Pictures", "Universal Pictures"),
    buildMoviePlaylist("Lions Gate Films", "Lions Gate Films"),
    buildMoviePlaylist("Sony Pictures", "Sony Pictures"),
  ],
  [...moviGenresPlaylists],
];
