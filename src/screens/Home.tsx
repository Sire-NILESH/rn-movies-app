import React, { useLayoutEffect, memo } from "react";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import useImageItemSetting from "../hooks/useImageItemSetting";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import HomeHeader from "../components/Header/HomeHeader";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { View } from "react-native";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";

const HomeScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <HeaderWrapper title={"Maven"} scrollY={scrollY}>
            <View className="">
              <HeaderSearchButton searchCategory="multi" />
            </View>
          </HeaderWrapper>
          // <HeaderWrapper title="Maven" scrollY={scrollY}>
          //   <HomeHeader />
          // </HeaderWrapper>
        );
      },
      headerTransparent: true,
    });
  }, [scrollY.value]);

  return (
    <ScreenBuilder
      screenType="homescreen"
      imgItemsSetting={imgItemsSetting}
      scrollHandler={scrollHandler}
    />
  );
};

export default memo(HomeScreen);
