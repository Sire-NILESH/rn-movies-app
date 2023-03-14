import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import ScreenBuilder from "../components/ScreenBuilder";
import IconButton from "../components/ui/IconButton";
import { IDrawerScreenProps } from "../library/DrawerScreenProps";

// const TvShowsScreen: React.FC<IStackScreenProps> = (props) => {
const TvShowsScreen: React.FC<IDrawerScreenProps> = (props) => {
  // const TvShowsScreen = (props) => {
  const { navigation, route } = props;

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      // drawerIcon: (props) => {
      //   return (
      //     <IconButton name="tv-outline" color={props.color} size={props.size} />
      //   );
      // },
      headerRight: (props) => <HeaderSearchButton searchCategory="tv" />,
    });
  }, []);

  return <ScreenBuilder screenType="tv" />;
};

export default TvShowsScreen;
