import React from "react";
import { WatchProviderTopTabsScreenProps } from "../library/NavigatorScreenProps/WatchProviderTopTabsScreenProps";
import WatchProviderScreenBuilder from "../components/builders/WatchProviderScreenBuilder";

const WatchProviderTopTabScreen: React.FC<WatchProviderTopTabsScreenProps> = ({
  screenMediaType,
  urlObject,
}) => {
  return (
    <WatchProviderScreenBuilder
      screenMediaType={screenMediaType}
      urlObject={urlObject}
    />
  );
};

export default WatchProviderTopTabScreen;
