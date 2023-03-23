import React from "react";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";

import TopTabsNavigator from "../navigators/TopTabsNavigator";

const FavoritesScreen: React.FC<IDrawerScreenProps> = (props) => {
  return <TopTabsNavigator collectionType="favourites" />;
};

export default FavoritesScreen;
