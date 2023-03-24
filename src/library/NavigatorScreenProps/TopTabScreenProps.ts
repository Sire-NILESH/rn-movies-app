import { ParamListBase, RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { MediaTypes, TCollectionType } from "../../typings";

export interface ITopTabScreenProps {
  name: string;
  navigation: MaterialTopTabNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
  collectionType: TCollectionType;
  screenMediaType: MediaTypes;
}
