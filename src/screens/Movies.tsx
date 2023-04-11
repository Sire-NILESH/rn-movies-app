import { useLayoutEffect, memo } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import { View } from "react-native";
import ScreenBuilderV2 from "../components/builders/ScreenBuilderV2";

// const MoviesScreen: React.FC<IStackScreenProps> = (props) => {
const MoviesScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation } = props;

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

  return <ScreenBuilderV2 screenType="movie" />;
  // return <ScreenBuilder screenType="movie" />;
};

export default memo(MoviesScreen);
