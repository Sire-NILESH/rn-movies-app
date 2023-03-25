import { ParamListBase, RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { MediaTypes } from "../../typings";

export interface SearchResultsTopTabScreenProps {
  name: string;
  navigation: MaterialTopTabNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
  screenMediaType: MediaTypes;
  searchQuery: string;
}
