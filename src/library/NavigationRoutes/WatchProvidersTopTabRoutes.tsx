import { IWatchProviderTopTabsProps } from "../RouteProps";
import WatchProviderTopTabScreen from "../../screens/WatchProviderTopTabScreen";

export const watchProvidersTopTabRoutes: IWatchProviderTopTabsProps[] = [
  {
    name: "Provider Movies",
    component: WatchProviderTopTabScreen,
    screenMediaType: "movie",
    screenTitle: "Movies",
  },
  {
    name: "Provider TV Shows",
    component: WatchProviderTopTabScreen,
    screenMediaType: "tv",
    screenTitle: "TV Shows",
  },
];
