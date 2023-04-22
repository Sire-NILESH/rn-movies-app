import { View, Text } from "react-native";
import React from "react";

interface IProps {
  rowTitle: string;
  children?: React.ReactNode;
}

const CardRow: React.FC<IProps> = (props) => {
  return (
    <View
      className="flex-row items-center justify-between px-2 mt-2 mx-2 bg-accent rounded-xl"
      style={{ backgroundColor: "rgb(4, 20, 10)" }}
    >
      <Text className="text-text_tertiary mx-4">{props.rowTitle} </Text>
      {props.children}
    </View>
  );
};

export default CardRow;
