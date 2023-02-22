import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/ScreenBuilder";

const TvShowsScreen: React.FC<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => <HeaderSearchButton searchCategory="tv" />,
    });
  }, []);

  return <ScreenBuilder screenType="tv" />;
};

export default TvShowsScreen;
