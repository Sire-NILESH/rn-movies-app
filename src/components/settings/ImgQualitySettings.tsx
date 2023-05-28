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
        <ImageQualityDropdown
          imageItem="thumbnail"
          dropdownBgColor={"transparent"}
        />
      </CardRow>

      <CardRow rowTitle="Banner">
        <ImageQualityDropdown
          imageItem="banner"
          dropdownBgColor={"transparent"}
        />
      </CardRow>

      <CardRow rowTitle="Watch providers">
        <ImageQualityDropdown
          imageItem="watchProviders"
          dropdownBgColor={"transparent"}
        />
      </CardRow>

      <CardRow rowTitle="Tv Networks/Producers">
        <ImageQualityDropdown
          imageItem="companies"
          dropdownBgColor={"transparent"}
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default ImgQualitySettings;
