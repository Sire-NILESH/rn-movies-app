import { IWatchProviderTopTabsProps } from "../RouteProps";
import WatchProviderTopTabScreen from "../../screens/WatchProviderTopTabScreen";

export const watchProvidersTopTabRoutes: IWatchProviderTopTabsProps[] = [
  {
    name: "Person Movies",
    component: WatchProviderTopTabScreen,
    screenMediaType: "movie",
  },
  {
    name: "Person Tv Shows",
    component: WatchProviderTopTabScreen,
    screenMediaType: "tv",
  },
];
