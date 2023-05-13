import React, { useLayoutEffect } from "react";
import { WatchProviderTopTabsScreenProps } from "../library/NavigatorScreenProps/WatchProviderTopTabsScreenProps";
import WatchProviderScreenBuilder from "../components/builders/WatchProviderScreenBuilder";

const WatchProviderTopTabScreen: React.FC<WatchProviderTopTabsScreenProps> = ({
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
    <WatchProviderScreenBuilder
      screenMediaType={screenMediaType}
      urlObject={urlObject}
    />
  );
};

export default WatchProviderTopTabScreen;
