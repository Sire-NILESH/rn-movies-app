import React, { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { useLogging } from "../hooks/useLogging";
import Header from "./../components/Header";
import ScreenBuilder from "../components/ScreenBuilder";

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging("Home Screen");
  const { navigation, route } = props;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return <Header />;
      },
      headerTransparent: true,
    });
  }, []);

  return <ScreenBuilder screenType="home" />;
};

export default HomeScreen;
