import { ITopTabsProps } from "../RouteProps";
import CollectionTopTabScreen from "../../screens/CollectionTopTabScreen";

export const topTabRoutes: ITopTabsProps[] = [
  {
    name: "Collection Movies",
    component: CollectionTopTabScreen,
    screenMediaType: "movie",
    screenTitle: "Movies",
  },
  {
    name: "Collection Shows",
    component: CollectionTopTabScreen,
    screenMediaType: "tv",
    screenTitle: "TV Shows",
  },
];
