import { IPersonMediasTopTabsProps } from "../RouteProps";
import PersonMediasTopTabScreen from "../../screens/PersonMediasTopTabScreen";
import PersonInfoTopTabScreen from "../../screens/PersonInfoTopTabScreen";

export const personMediasTopTabRoutes: IPersonMediasTopTabsProps[] = [
  {
    name: "Person Info",
    component: PersonInfoTopTabScreen,
    screenMediaType: "movie",
    screenTitle: "Bio",
  },
  {
    name: "Person Movies",
    component: PersonMediasTopTabScreen,
    screenMediaType: "movie",
    screenTitle: "Movies",
  },
  {
    name: "Person TV Shows",
    component: PersonMediasTopTabScreen,
    screenMediaType: "tv",
    screenTitle: "TV Shows",
  },
];
