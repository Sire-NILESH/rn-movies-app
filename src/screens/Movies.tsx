import { useLayoutEffect } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/builders/ScreenBuilder";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";

// const MoviesScreen: React.FC<IStackScreenProps> = (props) => {
const MoviesScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation } = props;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => <HeaderSearchButton searchCategory="movie" />,
    });
  }, []);

  return <ScreenBuilder screenType="movie" />;
};

export default MoviesScreen;
