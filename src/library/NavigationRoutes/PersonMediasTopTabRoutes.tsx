import { IPersonMediasTopTabsProps } from "../RouteProps";
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
