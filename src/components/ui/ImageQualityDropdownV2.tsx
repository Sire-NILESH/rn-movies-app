import React from "react";
import Dropdown from "./Dropdown";
import { useDefaultImageQualityHooks } from "../../hooks/reduxHooks";
import { IImageQuality } from "../../../types/typings";

interface IProps {
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

 * @returns A Dropdown instance for selecting Years
 */
const ImageQualityDropdownV2: React.FC<IProps> = (props) => {
  const { setDefaultImgQualityHandler, defaultImgQuality } =
    useDefaultImageQualityHooks();

  const setDefaultImgQualityOfHook = (item: IImageQuality) => {
    //  setDefaultImgQualityHandler(item);
  };

  //   console.log(defaultImgQuality);

  return (
    <Dropdown
      borderRadius="full"
      currentSelected={defaultImgQuality}
      listData={imgQualities}
      setSelected={setDefaultImgQualityOfHook}
    />
  );
};

export default ImageQualityDropdownV2;
