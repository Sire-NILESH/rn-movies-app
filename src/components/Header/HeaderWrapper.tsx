import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";

type TProps = PropsWithChildren<{ title?: string }>;

const HeaderWrapper: React.FC<TProps> = (props) => {
  const navigation = useNavigation<DrawerNavigationOptions>();

  return (
    <LinearGradient
      colors={[
        "rgba(15, 15, 15, 0.7)",
        "rgba(15, 15, 15, 0.2)",
        "rgba(0,0,0,0)",
      ]}
      className="flex-row justify-between items-center w-[100%] px-4 h-[60]"
      // style={{ elevation: 1 }}
    >
      <View>
        {/* @ts-ignore */}
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="md-menu" size={28} color={Colors.text_primary} />
        </Pressable>
      </View>

      <View>
        <Text className="font-semibold text-text_primary text-xl ml-4">
          {props.title}
        </Text>
      </View>

      <View className="flex-row ">{props.children}</View>
    </LinearGradient>
  );
};

export default HeaderWrapper;
