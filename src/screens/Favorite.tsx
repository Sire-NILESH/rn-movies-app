import React from "react";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import TopTabsTileListNavigator from "../navigators/TopTabsTileListNavigator";

const FavoritesScreen: React.FC<IDrawerScreenProps> = (props) => {
  return <TopTabsTileListNavigator collectionType="favourites" />;
};

export default FavoritesScreen;
