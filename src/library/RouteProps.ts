import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { IDrawerScreenProps } from "./NavigatorScreenProps/DrawerScreenProps";
import { IStackScreenProps } from "./NavigatorScreenProps/StackScreenProps";
import { ITopTabScreenProps } from "./NavigatorScreenProps/TopTabScreenProps";
import { MediaTypes } from "../../types/typings";
import { SearchResultsTopTabScreenProps } from "./NavigatorScreenProps/SearchResultsTopTabScreenProps";
import { IPersonMediasTopTabsScreenProps } from "./NavigatorScreenProps/PersonMediasTopTabsScreenProps";
import { WatchProviderTopTabsScreenProps } from "./NavigatorScreenProps/WatchProviderTopTabsScreenProps";

export interface IStackRouteProps {
  component:
    | React.FunctionComponent<IStackScreenProps>
    | React.FunctionComponent<IDrawerScreenProps>;
  name: string;
}

export interface IDrawerRouteProps {
  component: React.FunctionComponent<IDrawerScreenProps>;
  name: string;
  options: DrawerNavigationOptions;
}

export interface ITopTabsProps {
  component: React.FunctionComponent<ITopTabScreenProps>;
  name: string;
  screenMediaType: MediaTypes;
}

export interface ISearchResultsTopTabsProps {
  component: React.FunctionComponent<SearchResultsTopTabScreenProps>;
  name: string;
  screenMediaType: MediaTypes;
}

export interface IPersonMediasTopTabsProps {
  component: React.FunctionComponent<IPersonMediasTopTabsScreenProps>;
  name: string;
  screenMediaType: MediaTypes;
}

export interface IWatchProviderTopTabsProps {
  component: React.FunctionComponent<WatchProviderTopTabsScreenProps>;
  name: string;
  screenMediaType: MediaTypes;
}
