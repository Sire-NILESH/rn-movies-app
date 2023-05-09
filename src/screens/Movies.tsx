import { useLayoutEffect, memo } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import { View } from "react-native";
import ScreenBuilderV2 from "../components/builders/ScreenBuilderV2";
import useImageItemSetting from "../hooks/useImageItemSetting";

// const MoviesScreen: React.FC<IStackScreenProps> = (props) => {
const MoviesScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <View className="mr-2">
          <HeaderSearchButton searchCategory="movie" />
        </View>
      ),
    });
  }, []);

  // return <ScreenBuilderV3 screenType="movie" />;
  // return <ScreenBuilderV2 screenType="movie" />;
  return <ScreenBuilder screenType="movie" imgItemsSetting={imgItemsSetting} />;
};

export default memo(MoviesScreen);
