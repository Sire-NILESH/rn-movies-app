import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren, memo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../utils/Colors";

type TProps = PropsWithChildren<{
  scrollY: SharedValue<number>;
  title?: string;
}>;

const HEADER_HEIGHT: number = 60;

const HeaderWrapper: React.FC<TProps> = (props) => {
  const navigation = useNavigation<DrawerNavigationOptions>();

  const progress = useDerivedValue(() => {
    return props.scrollY.value > HEADER_HEIGHT ? withTiming(1) : withTiming(0);
  }, [props.scrollY.value]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.transparent, Colors.tertiary]
    );

    return { backgroundColor };
  });

  return (
    <Animated.View className={`flex-1 h-[${HEADER_HEIGHT}]`} style={[rStyle]}>
      <LinearGradient
        colors={[
          "rgba(23, 23, 23, 0.7)",
          "rgba(23, 23, 23, 0.2)",
          "rgba(0,0,0,0)",
          // "rgba(0,0,0,0)",
        ]}
        className="flex-row justify-between items-center w-[100%] px-4 h-[60]"
        // style={{ elevation: 1 }}
      >
        <View className="flex-1">
          {/* @ts-ignore */}
          <Pressable onPress={() => navigation.toggleDrawer()}>
            <Ionicons
              name="menu-outline"
              size={28}
              color={Colors.text_primary}
            />
          </Pressable>
        </View>

        <View className="flex-1">
          <Text
            className="font-semibold text-text_highLight text-xl text-center"
            allowFontScaling={false}
          >
            {props.title}
          </Text>
        </View>

        <View className="flex-1 flex-row justify-end">{props.children}</View>
      </LinearGradient>
    </Animated.View>
  );
};

export default memo(HeaderWrapper);
