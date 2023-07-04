import { ParamListBase, RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { Season } from "../../../types/typings";

export interface ITopTabEpisodeListScreenProps {
  name: string;
  navigation: MaterialTopTabNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
  tvMediaId: number;
  season: Season;
  tvMediaSeasons: Season[];
  tvMediaPosterPathOld: String;
  tvMediaName: string;
}
