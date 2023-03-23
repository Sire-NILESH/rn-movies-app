import { ParamListBase, RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export interface IDrawerScreenProps {
  name: string;
  navigation: DrawerNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
}
