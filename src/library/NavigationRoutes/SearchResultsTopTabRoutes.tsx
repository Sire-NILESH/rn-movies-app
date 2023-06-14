import { ISearchResultsTopTabsProps } from "../RouteProps";
import SearchResultsTopTabScreen from "../../screens/SearchResultsTopTabScreen";
import SearchResultsPersonTopTabScreen from "../../screens/SearchResultsPersonTopTabScreen";

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
  {
    name: "Persons",
    component: SearchResultsPersonTopTabScreen,
    screenMediaType: "multi",
    screenTitle: "Persons",
  },
];
