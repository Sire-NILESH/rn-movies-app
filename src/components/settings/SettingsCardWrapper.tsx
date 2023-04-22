import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

export default function SettingsCardWrapper(props: {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  // children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}) {
  return (
    <View className="w-full mt-6 bg-neutral-900 py-4 px-2 rounded-xl">
      <View className="flex-row space-x-2 items-center mb-2 mx-2">
        <Ionicons
          name={props.iconName}
          color={Colors.text_dark}
          size={24}
        ></Ionicons>
        <View className="w-[92%]">
          <Text className="text-text_highLight font-semibold mb-1">
            {props.title}
          </Text>
          <Text className="text-text_dark text-sm">{props.subtitle}</Text>
        </View>
      </View>

      {props.children}
    </View>
  );
}
