import { ITopTabsProps } from "../RouteProps";
import TopTabsTileListScreen from "../../screens/TopTabsTileListScreen";

export const topTabRoutesTileList: ITopTabsProps[] = [
  {
    name: "Movies",
    component: TopTabsTileListScreen,
    screenMediaType: "movie",
    screenTitle: "Movies",
  },
  {
    name: "Tv Shows",
    component: TopTabsTileListScreen,
    screenMediaType: "tv",
    screenTitle: "TV Shows",
  },
];
