import React from "react";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import { useBlurHomeScreenBannerHooks } from "../../hooks/reduxHooks";
import CustomSwitch from "../ui/CustomSwitch";

const BlurHomeBannerSettings = () => {
  const { toggleBlurHomeScreenBannerHandler, isHomeScreenBannerBlur } =
    useBlurHomeScreenBannerHooks();

  const toggleSwitch = () => toggleBlurHomeScreenBannerHandler();

  return (
    <SettingsCardWrapper
      iconName="image"
      title="Blur Banner Image"
      subtitle={
        "Adds a blur effect on top of the image banner of Home, Movies and TV Shows screen."
      }
    >
      <CardRow rowTitle="Enable Blur">
        <CustomSwitch
          stateValue={isHomeScreenBannerBlur.blur}
          toggleHandler={toggleSwitch}
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default BlurHomeBannerSettings;
