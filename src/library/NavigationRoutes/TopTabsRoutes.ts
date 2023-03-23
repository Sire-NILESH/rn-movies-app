import { ITopTabsProps } from "../RouteProps";
import TVShowsTopTabScreen from "../../screens/TVShowsTopTabScreen";
import MoviesTopTabScreen from "../../screens/MoviesTopTabScreen";

export const topTabRoutes: ITopTabsProps[] = [
  {
    name: "Movies",
    component: MoviesTopTabScreen,
  },
  {
    name: "Tv Shows",
    component: TVShowsTopTabScreen,
  },
];
