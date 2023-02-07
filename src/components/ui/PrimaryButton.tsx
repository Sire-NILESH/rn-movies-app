import React from "react";
import { View, Pressable, Text } from "react-native";
import { Colors } from "./../../utils/Colors";

interface IProps {
  method?: () => void;
  children?: React.ReactElement;
  shadow?: boolean;
}

const PrimaryButton: React.FC<IProps> = (props) => {
  return (
    <View
      className="overflow-hidden rounded-2xl bg-red-500"
      style={[props.shadow === true ? { elevation: 2 } : null]}
    >
      <Pressable
        onPress={props.method}
        className="w-36 h-14  items-center justify-center"
        android_ripple={{ color: Colors.red["300"] }}
        style={(pressed) => {
          return [pressed ? { opacity: 0.6, backgroundColor: "#333" } : null];
        }}
      >
        <Text className="text-xl font-semibold text-slate-50">Yeah</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;
