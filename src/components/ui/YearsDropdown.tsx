import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { useDefaultYearHooks } from "../../hooks/reduxHooks";

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
  const [localYear, setLocalYear] = useState<number>(defaultYear);

  const setLocalLanguageHandler = (year: number) => {
    setLocalYear(year);
    if (props.localYearSetter) {
      props.localYearSetter(year);
    }
  };

  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const yearList = arrayRange(
    Number(new Date(Date.now()).getFullYear()),
    1900,
    -1
  );

  interface IDropdownYearsObj {
    [key: string]: number;
  }

  type TDropdownYearsArray = [{ "All Years": 0 } | IDropdownYearsObj];

  const currentYear = Number(new Date(Date.now()).getFullYear());

  function createArrayOfDateObjects() {
    let arr: TDropdownYearsArray = [{ "All Years": 0 }];
    for (let i = currentYear; i >= 1900; i--) {
      let obj: IDropdownYearsObj = {};
      obj[String(i)] = i;
      arr.push(obj);
    }
    return arr;
  }

  const yearsArr = createArrayOfDateObjects();
  console.log(yearsArr);

  // add a 0 as a year and that is treated as all years by the api
  yearList.unshift(0);

  return (
    <Dropdown
      borderRadius="full"
      currentSelected={
        props.saveMode === "applicationWide" ? defaultYear : localYear
      }
      listData={yearList}
      setSelected={
        props.saveMode === "applicationWide"
          ? setDefaultLanguageHandler
          : setLocalLanguageHandler
      }
    />
  );
};

export default YearsDropdown;
