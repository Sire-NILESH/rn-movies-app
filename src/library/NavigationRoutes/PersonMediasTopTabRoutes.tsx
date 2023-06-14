import { IPersonMediasTopTabsProps } from "../RouteProps";
import PersonMediasTopTabScreen from "../../screens/PersonMediasTopTabScreen";

export const personMediasTopTabRoutes: IPersonMediasTopTabsProps[] = [
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
