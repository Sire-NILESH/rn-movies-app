import React from "react";
import ImageQualityDropdown from "../ui/ImageQualityDropdown";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";

const ImgQualitySettings = () => {
  return (
    //   {/* Set Default Image Quality */}
    <SettingsCardWrapper
      iconName="image-outline"
      title="Default Image Quality"
      subtitle={`Set a lower image quality for faster loading and reduced cache storage.`}
    >
      <CardRow rowTitle="Thumbnail">
        <ImageQualityDropdown imageItem="thumbnail" />
      </CardRow>

      <CardRow rowTitle="Banner">
        <ImageQualityDropdown imageItem="banner" />
      </CardRow>

      <CardRow rowTitle="Watch providers">
        <ImageQualityDropdown imageItem="watchProviders" />
      </CardRow>

      <CardRow rowTitle="Tv Networks/Producers">
        <ImageQualityDropdown imageItem="companies" />
      </CardRow>

      <CardRow rowTitle="Tv Networks/Producers">
        <ImageQualityDropdown imageItem="companies" />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default ImgQualitySettings;
