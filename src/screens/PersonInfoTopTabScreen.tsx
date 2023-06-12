import React from "react";
import { IPersonMediasTopTabsScreenProps } from "../library/NavigatorScreenProps/PersonMediasTopTabsScreenProps";
import PersonMediasScreenBuilder from "../components/builders/PersonMediasScreenBuilder";

const PersonInfoTopTabScreen: React.FC<IPersonMediasTopTabsScreenProps> = ({
  screenMediaType,
  urlObject,
}) => {
  return (
    <PersonMediasScreenBuilder
      screenMediaType={screenMediaType}
      urlObject={urlObject}
    />
  );
};

export default PersonInfoTopTabScreen;
