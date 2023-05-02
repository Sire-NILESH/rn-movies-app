import { ParamListBase, RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { IUrlObject, MediaTypes } from "../../../types/typings";

export interface WatchProviderTopTabsScreenProps {
  name: string;
  navigation: MaterialTopTabNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
  screenMediaType: MediaTypes;
  urlObject: IUrlObject;
}
