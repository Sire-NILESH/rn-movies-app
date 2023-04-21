import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Dropdown from "./Dropdown";
// import { useDefaultImageQualityHooks } from "../../hooks/reduxHooks";
import {
  IImageItemSettingsValue,
  IImageQuality,
  IImgItemSettingsDB,
  ImageItemTypes,
} from "../../../types/typings";
import { storeObjectData } from "../../storage/asyncStorage";
import { showErrorAlert } from "../../utils/helpers/helper";
import useImgSettings from "../../hooks/useImgSettings";

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

  const { allImgItemsSettings, errorImgSettings, setImgItemQualitySettings } =
    useImgSettings();

  const [currentSelectedImageQuality, setCurrentSelectedImageQuality] =
    useState<IImageQuality>();

  useEffect(() => {
    if (allImgItemsSettings.length > 0) {
      const temp = allImgItemsSettings.find(
        (item) => item.name === props.imageItem
      );

      if (temp) {
        const imgSettingsTemp = {
          quality: temp.quality,
          value: temp.value,
        };
        setCurrentSelectedImageQuality(imgSettingsTemp);
      }
    }
  }, [allImgItemsSettings]);

  useEffect(() => {
    if (errorImgSettings) {
      showErrorAlert(
        "Failed",
        "Failed to set image quality. Please try again."
      );
    }
  }, []);

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
