import React from "react";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import LanguageDropdown from "../ui/LanguageDropdown";

const DefaultLangSettings = () => {
  return (
    <SettingsCardWrapper
      iconName="language"
      title="Default Language"
      subtitle={`Set a default language to find medias of that lanuage only.`}
    >
      <CardRow rowTitle="Select a Language">
        <LanguageDropdown saveMode="applicationWide" />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default DefaultLangSettings;
