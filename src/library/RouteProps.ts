import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { IDrawerScreenProps } from "./NavigatorScreenProps/DrawerScreenProps";
import { IStackScreenProps } from "./NavigatorScreenProps/StackScreenProps";
import { ITopTabScreenProps } from "./NavigatorScreenProps/TopTabScreenProps";
import { MediaTypes, TCollectionType } from "../typings";
// import { ITopTabScreenProps } from "./TopTabScreenProps";

// export default interface IRouteProps {
//   component: React.FunctionComponent<IStackScreenProps>;
//   name: string;

//   // component:
//   //   | React.FunctionComponent<IStackScreenProps>
//   //   | React.FunctionComponent<IDrawerScreenProps>;
//   // name: string;
// }

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
