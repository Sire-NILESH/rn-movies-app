import React, { useLayoutEffect, memo } from "react";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import useImageItemSetting from "../hooks/useImageItemSetting";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import HomeHeader from "../components/Header/HomeHeader";
import HeaderWrapper from "../components/Header/HeaderWrapper";

const HomeScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <HeaderWrapper>
            <HomeHeader />
          </HeaderWrapper>
        );
      },
      headerTransparent: true,
    });
  }, []);

  return <ScreenBuilder screenType="home" imgItemsSetting={imgItemsSetting} />;
};

export default memo(HomeScreen);
