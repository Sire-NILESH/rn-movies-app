import React, { useLayoutEffect, memo } from "react";
import { useLogging } from "../hooks/useLogging";
import Header from "./../components/Header";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import useImageItemSetting from "../hooks/useImageItemSetting";
import ScreenBuilderV3 from "../components/builders/ScreenBuilderV3";
import ScreenBuilder from "../components/builders/ScreenBuilder";

// const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
const HomeScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  const [logging] = useLogging("Home Screen");
  const { navigation } = props;
  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return <Header />;
      },
      // drawerIcon: (props) => (
      //   <IconButton name="home-outline" color={props.color} size={props.size} />
      // ),
      headerTransparent: true,
    });
  }, []);

  // return (
  //   <ScreenBuilderV3 screenType="home" imgItemsSetting={imgItemsSetting} />
  // );
  return <ScreenBuilder screenType="home" imgItemsSetting={imgItemsSetting} />;
  // return <ScreenBuilderV2 screenType="home" />;
};

export default memo(HomeScreen);
