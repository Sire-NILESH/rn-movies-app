import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/ScreenBuilder";
import { IDrawerScreenProps } from "../library/DrawerScreenProps";

// const TvShowsScreen: React.FC<IStackScreenProps> = (props) => {
const TvShowsScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation } = props;

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => <HeaderSearchButton searchCategory="tv" />,
    });
  }, []);

  return <ScreenBuilder screenType="tv" />;
};

export default TvShowsScreen;
