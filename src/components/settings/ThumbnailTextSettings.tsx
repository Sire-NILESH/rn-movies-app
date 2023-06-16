import React from "react";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import {
  useBlurHomeScreenBannerHooks,
  useThumbnailTextSettingHooks,
} from "../../hooks/reduxHooks";
import CustomSwitch from "../ui/CustomSwitch";

const ThumbnailTextSettings = () => {
  const { toggleThumbnailTextHandler, isThumbnailText } =
    useThumbnailTextSettingHooks();

  const toggleSwitch = () => toggleThumbnailTextHandler();

  return (
    <SettingsCardWrapper
      iconName="text"
      title="Thumbnail Text"
      subtitle={
        "Option to disable media name and year that appears on thumbnails."
      }
    >
      <CardRow rowTitle="Disable texts from thumbnails">
        <CustomSwitch
          stateValue={isThumbnailText.disable}
          toggleHandler={toggleSwitch}
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default ThumbnailTextSettings;
