import { ITopTabsProps } from "../RouteProps";
import CollectionTopTabScreen from "../../screens/CollectionTopTabScreen";

export const topTabRoutes: ITopTabsProps[] = [
  {
    name: "Movies",
    component: CollectionTopTabScreen,
    screenMediaType: "movie",
  },
  {
    name: "Tv Shows",
    component: CollectionTopTabScreen,
    screenMediaType: "tv",
  },
];
