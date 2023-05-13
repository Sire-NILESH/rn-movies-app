import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../utils/Colors";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  onPressHandler: () => void;
  title: string;
  subtitle: string;
}

const MoreInfoFooterButton: React.FC<IProps> = (props) => {
  return (
    <LinearGradient
      className="h-32 rounded-xl overflow-hidden border border-stone-800"
      colors={[
        "rgba(28, 25, 23, 0.4)",
        "rgba(41, 37, 36, 0.5)",
        "rgba(28, 25, 23, 0.8)",
        "rgba(28, 25, 23, 0.5)",
        Colors.black,
      ]}
      start={{ x: 0.1, y: 0.2 }}
    >
      <Pressable
        className="flex-1 px-4 py-4 justify-between"
        onPress={() => props.onPressHandler()}
        android_ripple={{ color: "#eee" }}
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-2xl text-text_highLight">{props.title}</Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={Colors.text_primary}
          />
        </View>
        <Text className="text-text_tertiary text-sm">{props.subtitle}</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default MoreInfoFooterButton;
