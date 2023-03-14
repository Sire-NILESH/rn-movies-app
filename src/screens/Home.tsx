import React, { useLayoutEffect } from "react";
import { useLogging } from "../hooks/useLogging";
import Header from "./../components/Header";
import ScreenBuilder from "../components/ScreenBuilder";
import IconButton from "../components/ui/IconButton";
import { IDrawerScreenProps } from "../library/DrawerScreenProps";

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

  return <ScreenBuilder screenType="home" />;
};

export default HomeScreen;
