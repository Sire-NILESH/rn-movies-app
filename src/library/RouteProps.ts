import { IStackScreenProps } from "./StackScreenProps";
// import { ITopTabScreenProps } from "./TopTabScreenProps";

export default interface IRouteProps {
  component: React.FunctionComponent<IStackScreenProps>;
  name: string;

  // component:
  //   | React.FunctionComponent<IStackScreenProps>
  //   | React.FunctionComponent<ITopTabScreenProps>;
  // name: string;
}
