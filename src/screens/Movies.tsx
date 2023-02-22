import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/ScreenBuilder";

const MoviesScreen: React.FC<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Movies",
      headerRight: (props) => <HeaderSearchButton searchCategory="movie" />,
    });
  }, []);

  return <ScreenBuilder screenType="movie" />;
};

export default MoviesScreen;
