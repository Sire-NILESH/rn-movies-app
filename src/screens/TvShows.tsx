import { useLayoutEffect, memo } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import { View } from "react-native";
import useImageItemSetting from "../hooks/useImageItemSetting";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const TvShowsScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <HeaderWrapper title={"TV Shows"} scrollY={scrollY}>
            <View className="">
              <HeaderSearchButton searchCategory="tv" />
            </View>
          </HeaderWrapper>
        );
      },
      headerTransparent: true,
    });
  }, [scrollY]);

  return (
    <ScreenBuilder
      screenType="tv"
      imgItemsSetting={imgItemsSetting}
      scrollHandler={scrollHandler}
    />
  );
};

export default memo(TvShowsScreen);
