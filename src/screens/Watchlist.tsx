import React from "react";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";

import TopTabsNavigator from "../navigators/TopTabsNavigator";

const WatchlistScreen: React.FC<IDrawerScreenProps> = (props) => {
  return <TopTabsNavigator collectionType="watchlist" />;
};

export default WatchlistScreen;
