import { ISearchResultsTopTabsProps } from "../RouteProps";
import SearchResultsTopTabScreen from "../../screens/SearchResultsTopTabScreen";

export const searchResultsTopTabRoutes: ISearchResultsTopTabsProps[] = [
  {
    name: "Movies",
    component: SearchResultsTopTabScreen,
    screenMediaType: "movie",
    screenTitle: "Movies",
  },
  {
    name: "Tv Shows",
    component: SearchResultsTopTabScreen,
    screenMediaType: "tv",
    screenTitle: "TV SHows",
  },
];
