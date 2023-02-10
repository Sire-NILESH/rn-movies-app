import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  //   method: () => void;
}

const IconButton: React.FC<IProps> = (props) => {
  return (
    <View>
      {/* <Pressable onPress={props.method}> */}
      <Ionicons name={props.name} color={props.color} size={props.size} />
      {/* </Pressable> */}
    </View>
  );
};

export default IconButton;
