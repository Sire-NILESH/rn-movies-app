import { Switch } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";

interface IProps {
  toggleHandler: () => void;
  stateValue: boolean | undefined;
}

const CustomSwitch: React.FC<IProps> = (props) => {
  return (
    <Switch
      trackColor={{ false: "#767577", true: "#767577" }}
      thumbColor={props.stateValue === true ? Colors.blue[500] : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={props.toggleHandler}
      value={props.stateValue}
    />
  );
};

export default CustomSwitch;
