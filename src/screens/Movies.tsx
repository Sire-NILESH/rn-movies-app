import { useLayoutEffect, memo } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import { View } from "react-native";
import useImageItemSetting from "../hooks/useImageItemSetting";
import ScreenBuilder from "../components/builders/ScreenBuilder";

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

  return <ScreenBuilder screenType="movie" imgItemsSetting={imgItemsSetting} />;
  // return <ScreenBuilderV2 screenType="movie" />;
};

export default memo(MoviesScreen);
