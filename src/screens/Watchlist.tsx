import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import { useAppSelector } from "../hooks/reduxHooks";
import { watchlistMedias } from "../store/watchlistSlice";

import TopTabsNavigator from "../navigators/TopTabsNavigator";

const WatchlistScreen: React.FC<IDrawerScreenProps> = (props) => {
  return <TopTabsNavigator collectionType="watchlist" />;
};

export default WatchlistScreen;
