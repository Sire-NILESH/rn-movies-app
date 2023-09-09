import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../utils/Colors";
import FloatingButton from "./FloatingButton";

interface IProps {
  scrollY: SharedValue<number>;
  //   children: React.ReactNode;
  onClickHandler: () => void;
}

const HIDE_SCROLL_HEIGHT = 200;

const AutoHideOnScrollFloatingBtn: React.FC<IProps> = ({
  scrollY,
  onClickHandler,
}) => {
  const scrollProgress = useDerivedValue(() => {
    return scrollY.value < HIDE_SCROLL_HEIGHT ? withTiming(1) : withTiming(0);
  }, [scrollY.value]);

  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollProgress.value, [0, 1], [0, 1]);

    const display = scrollY.value < HIDE_SCROLL_HEIGHT ? "flex" : "none";

    return { opacity, display };
  });
  return (
    <Animated.View style={[rStyle, { elevation: 5 }]}>
      <FloatingButton onClickHandler={onClickHandler}>
        <MaterialCommunityIcons
          style={{
            transform: [{ rotateZ: "90deg" }],
          }}
          name="rotate-3d-variant"
          size={24}
          color={Colors.gray[200]}
        />
      </FloatingButton>
    </Animated.View>
  );
};

export default AutoHideOnScrollFloatingBtn;
