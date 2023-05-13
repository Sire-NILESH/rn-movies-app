import { useLayoutEffect, memo } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import { View } from "react-native";
import useImageItemSetting from "../hooks/useImageItemSetting";

const TvShowsScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <View className="mr-2">
          <HeaderSearchButton searchCategory="tv" />
        </View>
      ),
    });
  }, []);

  return <ScreenBuilder screenType="tv" imgItemsSetting={imgItemsSetting} />;
};

export default memo(TvShowsScreen);
