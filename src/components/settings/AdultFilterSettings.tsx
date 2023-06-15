import React from "react";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import { useAllowNsfwContentHooks } from "../../hooks/reduxHooks";
import CustomSwitch from "../ui/CustomSwitch";

const AdultFilterSettings = () => {
  const { toggleAllowNsfwContentHandler, allowNsfwContent } =
    useAllowNsfwContentHooks();

  const toggleSwitch = () => toggleAllowNsfwContentHandler();

  return (
    <SettingsCardWrapper
      iconName="funnel-outline"
      title="Adult Content"
      subtitle={`Allow NSFW contents to be shown in search results. \nWhen disabled, will filter out most but not all.`}
    >
      <CardRow rowTitle="Include adult content in search results">
        <CustomSwitch
          stateValue={allowNsfwContent.nsfw}
          toggleHandler={toggleSwitch}
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default AdultFilterSettings;
