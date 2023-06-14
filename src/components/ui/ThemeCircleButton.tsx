import { View, Text, Pressable } from "react-native";
import React from "react";

interface IProps {
  text: string;
  onPressHandler: () => void;
}

const ThemeCircleButton: React.FC<IProps> = ({ text, onPressHandler }) => {
  return (
    <View className="bg-tertiary h-8 rounded-full w-[100] overflow-hidden">
      <Pressable
        className="h-full w-full flex justify-center items-center"
        android_ripple={{ color: "#eee" }}
        onPress={onPressHandler}
      >
        <Text
          className="text-text_highLight text-xs font-bold"
          numberOfLines={2}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default ThemeCircleButton;
