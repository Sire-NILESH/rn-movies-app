import { ISearchResultsTopTabsProps } from "../RouteProps";
import SearchResultsTopTabScreen from "../../screens/SearchResultsTopTabScreen";

export const searchResultsTopTabRoutes: ISearchResultsTopTabsProps[] = [
  {
    name: "Movies",
    component: SearchResultsTopTabScreen,
    screenMediaType: "movie",
  },
  {
    name: "Tv Shows",
    component: SearchResultsTopTabScreen,
    screenMediaType: "tv",
  },
];
