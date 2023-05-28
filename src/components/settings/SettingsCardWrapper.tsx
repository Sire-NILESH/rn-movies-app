import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

export default function SettingsCardWrapper(props: {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <View className="w-full bg-neutral-900 py-6 px-2 border-y">
      <View className="flex-row space-x-2 items-center mb-2 mx-2">
        <View className="h-full">
          <Ionicons
            name={props.iconName}
            color={Colors.text_dark}
            size={20}
          ></Ionicons>
        </View>
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
