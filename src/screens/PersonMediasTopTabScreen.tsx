import { View, Text } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { IPersonMediasTopTabsScreenProps } from "../library/NavigatorScreenProps/PersonMediasTopTabsScreenProps";
import PersonMediasScreenBuilder from "../components/builders/PersonMediasScreenBuilder";

const PersonMediasTopTabScreen: React.FC<IPersonMediasTopTabsScreenProps> = ({
  name,
  navigation,
  route,
  screenMediaType,
  urlObject,
}) => {
  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenMediaType === "movie" ? "Movies" : "TV Shows",
    });
  }, []);

  // useEffect(() => {
  //   const url = urlObject.url + `/${screenMediaType}_credits`;
  //   urlObject.url = url;
  // }, []);

  return (
    <PersonMediasScreenBuilder
      screenMediaType={screenMediaType}
      urlObject={urlObject}
    />
  );
};

export default PersonMediasTopTabScreen;
