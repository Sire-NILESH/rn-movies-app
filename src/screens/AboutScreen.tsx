import React from "react";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { View } from "react-native";

const AboutScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "About",
    });
  }, []);

  return <View className="flex-1 bg-secondary"></View>;
};

export default AboutScreen;
