import React from "react";
import Dropdown from "./Dropdown";
import { useDefaultImageQualityHooks } from "../../hooks/reduxHooks";
import { IDropdownYearsObj, IImageQuality } from "../../../types/typings";

interface IProps {
  //   saveMode: "local" | "applicationWide";
  //   localYearSetter?: (year: number) => void;
}

const currentYear = new Date(Date.now()).getFullYear();

function createArrayOfDateObjects() {
  let arr: IDropdownYearsObj[] = [
    {
      year: 0,
      value: "All Years",
    },
  ];
  for (let i = currentYear; i >= 1900; i--) {
    let obj: IDropdownYearsObj = {
      year: i,
      value: String(i),
    };

    arr.push(obj);
  }
  return arr;
}

// const yearsArr = createArrayOfDateObjects();

const imgQualities: IImageQuality[] = [
  { quality: "Very high", value: "500" },
  { quality: "High", value: "400" },
  { quality: "Medium", value: "300" },
  { quality: "Low", value: "200" },
];

/**
 * A React component that displays a dropdown for selecting Image Qualities.
 * @param saveMode - Can be `applicationWide`(A default setter for application wide) or `local`(a local state)
 * @returns A Dropdown instance for selecting Years
 */
const ImageQualityDropdown: React.FC<IProps> = (props) => {
  const { setDefaultImgQualityHandler, defaultImgQuality } =
    useDefaultImageQualityHooks();

  const setDefaultImgQualityOfHook = (item: IImageQuality) => {
    setDefaultImgQualityHandler(item);
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

export default ImageQualityDropdown;
