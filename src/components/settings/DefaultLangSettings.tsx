import React from "react";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import LanguageDropdown from "../ui/LanguageDropdown";

const DefaultLangSettings = () => {
  return (
    <SettingsCardWrapper
      iconName="language"
      title="Default Language"
      subtitle={`Set a default language to find medias of that language only.`}
    >
      <CardRow rowTitle="Select a Language">
        <LanguageDropdown saveMode="applicationWide" bgColor={"transparent"} />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default DefaultLangSettings;
