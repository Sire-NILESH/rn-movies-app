import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { IDrawerScreenProps } from "./DrawerScreenProps";
import { IStackScreenProps } from "./StackScreenProps";
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
