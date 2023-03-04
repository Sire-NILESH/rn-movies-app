import { getHomeScreenProps, getScreenProps } from "../utils/requests";
import useFetcher from "./useFetcher";
import {
  homeScreenGenresToShow,
  movieScreenGenresToShow,
  tvScreenGenresToShow,
} from "../config/screenGenresConfig";
import { ScreenTypes } from "../typings";

/**
 * This hook is responsible for generating `loading`, `screen props` and `error` states for the `Home`, `TV` and `Movies` screens.
 * @param screenType - Takes one of the main screen types `movie` | `tv` | `home`
 * @return screenObject - Returns { `screenProps`, `loadingProps`, `errorLoadingProps` } */
const useFetchScreenProps = (screenType?: ScreenTypes) => {
  // Get the genre list to fetch depending on the screen type.
  let genresToFetch;
  switch (screenType) {
    case "tv":
      genresToFetch = tvScreenGenresToShow;
      break;
    case "movie":
      genresToFetch = movieScreenGenresToShow;
      break;
    default:
      genresToFetch = homeScreenGenresToShow;
  }

  // Get the fetcher function for the screen type.
  const fetcher = screenType === "home" ? getHomeScreenProps : getScreenProps;

  // Get the mediaType. The fetcher func. for Movie and TV screens need a mediaType but the Home screen's fetcher doesn't. Check out the request module for the fetcher function.
  let mediaType;
  switch (screenType) {
    case "tv":
      mediaType = "tv";
      break;
    case "movie":
      mediaType = "movie";
      break;
    case "home":
      mediaType = null;
      break;
  }

  // 'useFetcher' hook is made such that it can be used to fetch any async calls to the API. So, it can take any number of parameters that we will pass.
  const params: any[] = [genresToFetch];

  if (mediaType !== null) params.push(mediaType);

  // This hook is responsible for managing the data, loading and error states from the server/API. It takes in an async 'fetcher' function that will request the API call.
  const { screenProps, loadingProps, errorLoadingProps } = useFetcher(fetcher, [
    ...params,
  ]);

  return { screenProps, loadingProps, errorLoadingProps };
};

export default useFetchScreenProps;
