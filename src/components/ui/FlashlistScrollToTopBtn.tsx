import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../utils/Colors";
import { getDeviceDimensions } from "../../utils/helpers/helper";

interface IProps {
  listRef: React.MutableRefObject<any>;
  scrollY: SharedValue<number>;
  scrollDirection: SharedValue<number>;
}

const SHOW_TOP_SCROLL_HEIGHT = 420 * 14;
// const SHOW_TOP_SCROLL_HEIGHT = 120;
const windowWidth = getDeviceDimensions("window").width;

const FlashlistScrollToTopBtn: React.FC<IProps> = ({
  listRef,
  scrollY,
  scrollDirection,
}) => {
  const translateXValue = Math.ceil(windowWidth / 2 - 160 / 2) + 10;

  function scrollToTop() {
    // @ts-ignore
    listRef.current?.scrollToOffset({ offset: 0 });
    // listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  const scrollProgress = useDerivedValue(() => {
    return scrollY.value > SHOW_TOP_SCROLL_HEIGHT && scrollDirection.value < 0
      ? withTiming(1)
      : withTiming(0);
  }, [scrollY.value]);

  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollProgress.value, [0, 1], [0, 1]);

    const display =
      scrollY.value > SHOW_TOP_SCROLL_HEIGHT && scrollDirection.value < 0
        ? "flex"
        : "none";

    return { opacity, display };
  });

  // function scrollToBottom() {
  //   // @ts-ignore
  //   listRef.current?.scrollToEnd();
  // }

  return (
    <Animated.View
      className={`absolute top-3 right-1/2 translate-x-[80px] z-50 w-40 rounded-full overflow-hidden bg-neutral-800`}
      style={[rStyle, { elevation: 5 }]}
    >
      <Pressable
        className="flex-row h-10 items-center justify-center gap-x-2"
        onPress={scrollToTop}
        android_ripple={{ color: "#eee" }}
      >
        <Ionicons name="arrow-up" size={20} color={Colors.neutral[100]} />
        <Text className="font-medium text-text_primary">{"Scroll to top"}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default FlashlistScrollToTopBtn;
