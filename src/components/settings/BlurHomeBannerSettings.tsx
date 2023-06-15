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
      title="Blur Homescreen Banner"
      subtitle={
        "Enable this if you have trouble reading texts on the banner or if you find the images too distracting."
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
