import { useLayoutEffect, memo } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import { View } from "react-native";
import useImageItemSetting from "../hooks/useImageItemSetting";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const MoviesScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerRight: (props) => (
      //   <View className="mr-2">
      //     <HeaderSearchButton searchCategory="movie" />
      //   </View>
      // ),

      header: () => {
        // return <Header translateY={translateY} />;
        return (
          <HeaderWrapper title={"Movies"} scrollY={scrollY}>
            <View className="">
              <HeaderSearchButton searchCategory="movie" />
            </View>
          </HeaderWrapper>
        );
      },
      headerTransparent: true,
    });
  }, [scrollY]);

  return (
    <ScreenBuilder
      screenType="movie"
      imgItemsSetting={imgItemsSetting}
      scrollHandler={scrollHandler}
    />
  );
  // return <ScreenBuilderV2 screenType="movie" />;
};

export default memo(MoviesScreen);
