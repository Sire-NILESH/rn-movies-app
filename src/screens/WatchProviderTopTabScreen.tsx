import React, { useLayoutEffect } from "react";
import { WatchProviderTopTabsScreenProps } from "../library/NavigatorScreenProps/WatchProviderTopTabsScreenProps";
import WatchProviderScreenBuilder from "../components/builders/WatchProviderScreenBuilder";

const WatchProviderTopTabScreen: React.FC<WatchProviderTopTabsScreenProps> = ({
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
    <WatchProviderScreenBuilder
      screenMediaType={screenMediaType}
      urlObject={urlObject}
    />
  );
};

export default WatchProviderTopTabScreen;
