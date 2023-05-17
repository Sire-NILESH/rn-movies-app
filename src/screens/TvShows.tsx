import { useLayoutEffect, memo } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import { View } from "react-native";
import useImageItemSetting from "../hooks/useImageItemSetting";
import HeaderWrapper from "../components/Header/HeaderWrapper";

const TvShowsScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <HeaderWrapper title={"TV Shows"}>
            <View className="mr-2">
              <HeaderSearchButton searchCategory="tv" />
            </View>
          </HeaderWrapper>
        );
      },
      headerTransparent: true,
    });
  }, []);

  return <ScreenBuilder screenType="tv" imgItemsSetting={imgItemsSetting} />;
};

export default memo(TvShowsScreen);
