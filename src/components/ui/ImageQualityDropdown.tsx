import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import {
  IImageItemSettingsValue,
  IImageQuality,
  ImageItemTypes,
} from "../../../types/typings";
import { showErrorAlert } from "../../utils/helpers/helper";
import useImageItemSetting from "../../hooks/useImageItemSetting";

interface IProps {
  imageItem: ImageItemTypes;
  //   saveMode: "local" | "applicationWide";
  //   localYearSetter?: (year: number) => void;
}

const imgQualities: IImageQuality[] = [
  { quality: "Very high", value: "500" },
  { quality: "High", value: "400" },
  { quality: "Medium", value: "300" },
  { quality: "Low", value: "200" },
];

/**
 * A React component that displays a dropdown for selecting Image Qualities.

 * @returns A Dropdown instance for selecting Image qualities.
 */
const ImageQualityDropdown: React.FC<IProps> = (props) => {
  // const { setDefaultImgQualityHandler, defaultImgItemQualities } =
  //   useDefaultImageQualityHooks();

  const { imgItemsSetting, errorImgSettings, setImgItemQualitySettings } =
    useImageItemSetting(props.imageItem);

  const [currentSelectedImageQuality, setCurrentSelectedImageQuality] =
    useState<IImageQuality>();

  useEffect(() => {
    if (imgItemsSetting !== undefined) {
      const imgSettingsTemp: IImageQuality = {
        quality: imgItemsSetting.quality,
        value: imgItemsSetting.value,
      };
      setCurrentSelectedImageQuality(imgSettingsTemp);
    }
  }, [imgItemsSetting]);

  if (errorImgSettings) {
    showErrorAlert("Failed", "Failed to set image quality. Please try again.");
  }

  const setDefaultImgQualityOfDB = (item: IImageQuality) => {
    const newCurrSelectedImgSetting: IImageItemSettingsValue = {
      key: props.imageItem,
      imgQuality: {
        quality: item.quality,
        value: item.value,
      },
    };

    setImgItemQualitySettings(newCurrSelectedImgSetting);
  };

  return (
    <>
      {currentSelectedImageQuality !== undefined ? (
        <Dropdown
          borderRadius="full"
          currentSelected={currentSelectedImageQuality}
          // currentSelected={defaultImgItemQualities[props.imageItem].imgQuality}
          listData={imgQualities}
          setSelected={setDefaultImgQualityOfDB}
        />
      ) : null}
    </>
  );
};

export default ImageQualityDropdown;
