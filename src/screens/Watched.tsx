import React from "react";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import TopTabsNavigator from "../navigators/TopTabs/TopTabsNavigator";

const WatchedScreen: React.FC<IDrawerScreenProps> = (props) => {
  return <TopTabsNavigator collectionType="watched" />;
};

export default WatchedScreen;
