import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { useDefaultYearHooks } from "../../hooks/reduxHooks";
import {
  IDropdownYearsObj,
  TDropdownYearsArrayObj,
} from "../../../types/typings";

interface IProps {
  saveMode: "local" | "applicationWide";
  localYearSetter?: (year: number) => void;
}

/**
 * A React component that displays a dropdown for selecting Years with search.
 * @param saveMode - Can be `applicationWide`(A default setter for application wide) or `local`(a local state)
 * @returns A Dropdown instance for selecting Years
 */
const YearsDropdown: React.FC<IProps> = (props) => {
  const { setDefaultLanguageHandler, defaultYear } = useDefaultYearHooks();
  const [localYear, setLocalYear] = useState<number>(0);

  const setLocalLanguageHandler = (item: IDropdownYearsObj) => {
    setLocalYear(item.year);
    if (props.localYearSetter) {
      props.localYearSetter(item.year);
    }
  };

  const setDefaultYearOfHook = (item: IDropdownYearsObj) => {
    setDefaultLanguageHandler(item.year);
  };

  const currentYear = new Date(Date.now()).getFullYear();

  function createArrayOfDateObjects() {
    let arr: TDropdownYearsArrayObj[] = [
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

  const yearsArr = createArrayOfDateObjects();

  return (
    <Dropdown
      borderRadius="full"
      currentSelected={
        props.saveMode === "applicationWide"
          ? { year: defaultYear, value: String(defaultYear) }
          : { year: 0, value: "All Years" }
      }
      listData={yearsArr}
      setSelected={
        props.saveMode === "applicationWide"
          ? setDefaultYearOfHook
          : setLocalLanguageHandler
      }
    />
  );
};

export default YearsDropdown;
