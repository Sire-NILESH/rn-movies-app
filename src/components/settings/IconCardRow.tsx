import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

interface IProps {
  rowTitle: string;
  rowIcon?: keyof typeof Ionicons.glyphMap;
  rowIconNode?: React.ReactNode;
  children?: React.ReactNode;
}

const IconCardRow: React.FC<IProps> = (props) => {
  return (
    <View
      className="flex-row items-center justify-between px-2 mt-2 mx-2 bg-accent rounded-xl"
      style={{ backgroundColor: "rgb(4, 20, 10)" }}
    >
      <View className="flex-row space-x-2 items-center mx-4">
        {props.rowIcon !== undefined ? (
          <Ionicons
            name={props.rowIcon}
            size={18}
            color={Colors.text_primary}
          />
        ) : (
          props.rowIconNode
        )}
        <Text className="text-text_tertiary mx-4">{props.rowTitle}</Text>
      </View>

      {props.children}
    </View>
  );
};

export default IconCardRow;
