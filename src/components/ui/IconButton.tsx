import { View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
}

const IconButton: React.FC<IProps> = (props) => {
  return (
    <View>
      <Ionicons name={props.name} color={props.color} size={props.size} />
    </View>
  );
};

export default IconButton;
