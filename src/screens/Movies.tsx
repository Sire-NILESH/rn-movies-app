import { useLayoutEffect } from "react";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/ScreenBuilder";
import IconButton from "../components/ui/IconButton";
import { IDrawerScreenProps } from "../library/DrawerScreenProps";

// const MoviesScreen: React.FC<IStackScreenProps> = (props) => {
const MoviesScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation, route } = props;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: "Movies",
      // drawerIcon: (props) => (
      //   <IconButton name="film-outline" color={props.color} size={props.size} />
      // ),
      headerRight: (props) => <HeaderSearchButton searchCategory="movie" />,
    });
  }, []);

  return <ScreenBuilder screenType="movie" />;
};

export default MoviesScreen;
