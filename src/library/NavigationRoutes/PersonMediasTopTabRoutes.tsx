import { IPersonMediasTopTabsProps, ITopTabsProps } from "../RouteProps";
import CollectionTopTabScreen from "../../screens/CollectionTopTabScreen";
import PersonMediasTopTabScreen from "../../screens/PersonMediasTopTabScreen";

export const personMediasTopTabRoutes: IPersonMediasTopTabsProps[] = [
  {
    name: "Person Movies",
    component: PersonMediasTopTabScreen,
    screenMediaType: "movie",
  },
  {
    name: "Person Tv Shows",
    component: PersonMediasTopTabScreen,
    screenMediaType: "tv",
  },
];
