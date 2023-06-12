import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

interface IProps {
  text: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPressHandler: () => void;
}

const ThemeButton: React.FC<IProps> = ({ text, iconName, onPressHandler }) => {
  return (
    <View className="border border-stone-800/90 rounded-lg bg-stone-900 mt-3 overflow-hidden">
      <Pressable
        className="h-8 px-3 items-center justify-center"
        onPress={onPressHandler}
        android_ripple={{ color: "#eee" }}
      >
        <View className="flex-row gap-1 items-center">
          <Ionicons
            name={iconName}
            size={iconName === "md-logo-youtube" ? 15 : 18}
            color={Colors.stone[400]}
          />
          <Text className="font-bold text-text_highLight">{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ThemeButton;
