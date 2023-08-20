import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

interface IProps {
  linkURL: string;
  size?: "small" | "regular";
}

const LinkButton: React.FC<IProps> = ({ linkURL, size }) => {
  return (
    <CustomButton
      height={size === "small" ? 40 : 50}
      width={size === "small" ? 40 : 50}
      radius={100}
      color={"transparent"}
      method={() => {
        Linking.openURL(linkURL);
      }}
    >
      <View className="flex-row space-x-2 items-center">
        <Ionicons name="link" size={20} color={Colors.blue[500]} />
      </View>
    </CustomButton>
  );
};

export default LinkButton;
