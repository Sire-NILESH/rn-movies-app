import React, { useLayoutEffect, memo } from "react";
import { useLogging } from "../hooks/useLogging";
import Header from "./../components/Header";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import ScreenBuilderV2 from "../components/builders/ScreenBuilderV2";

// const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
const HomeScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  const [logging] = useLogging("Home Screen");
  const { navigation, route } = props;

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

  // return <ScreenBuilder screenType="home" />;
  return <ScreenBuilderV2 screenType="home" />;
};

export default memo(HomeScreen);
