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
      className="h-24 rounded-xl overflow-hidden border border-stone-800/80"
      colors={[
        "rgba(28, 25, 23, 0.2)",
        "rgba(41, 37, 36, 0.4)",
        "rgba(28, 25, 23, 0.6)",
        "rgba(28, 25, 23, 0.2)",
      ]}
      start={{ x: 0.6, y: -0.4 }}
    >
      <Pressable
        className="flex-1 px-4 justify-center gap-y-2"
        onPress={() => props.onPressHandler()}
        android_ripple={{ color: "#eee" }}
      >
        <View className="flex-row items-center gap-x-2">
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
