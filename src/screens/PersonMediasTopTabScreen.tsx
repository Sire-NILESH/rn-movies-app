import React, { useLayoutEffect } from "react";
import { IPersonMediasTopTabsScreenProps } from "../library/NavigatorScreenProps/PersonMediasTopTabsScreenProps";
import PersonMediasScreenBuilder from "../components/builders/PersonMediasScreenBuilder";

const PersonMediasTopTabScreen: React.FC<IPersonMediasTopTabsScreenProps> = ({
  navigation,
  screenMediaType,
  urlObject,
}) => {
  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenMediaType === "movie" ? "Movies" : "TV Shows",
    });
  }, []);

  return (
    <PersonMediasScreenBuilder
      screenMediaType={screenMediaType}
      urlObject={urlObject}
    />
  );
};

export default PersonMediasTopTabScreen;
