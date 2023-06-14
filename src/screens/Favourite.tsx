import React from "react";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import TopTabsTileListNavigator from "../navigators/TopTabs/TopTabsTileListNavigator";

const FavouritesScreen: React.FC<IDrawerScreenProps> = (props) => {
  return <TopTabsTileListNavigator collectionType="favourites" />;
};

export default FavouritesScreen;
