import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import TopTabsPersonMediasNavigator from "../navigators/TopTabsPersonMediasNavigator";

const PersonMediasStackScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;

  // @ts-ignore
  const urlObjectReceived = route.params.urlObject;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      title: urlObjectReceived.name,
    });
  }, []);

  return <TopTabsPersonMediasNavigator urlObject={urlObjectReceived} />;
};

export default PersonMediasStackScreen;
