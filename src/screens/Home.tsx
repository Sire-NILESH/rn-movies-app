import React, { useLayoutEffect, memo } from "react";
import { useLogging } from "../hooks/useLogging";
import Header from "./../components/Header";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import useImageItemSetting from "../hooks/useImageItemSetting";
import ScreenBuilder from "../components/builders/ScreenBuilder";

const HomeScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return <Header />;
      },
      headerTransparent: true,
    });
  }, []);

  return <ScreenBuilder screenType="home" imgItemsSetting={imgItemsSetting} />;
};

export default memo(HomeScreen);
