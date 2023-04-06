import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { useDefaultYearHooks } from "../../hooks/reduxHooks";

interface IProps {
  saveMode: "local" | "applicationWide";
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
  };

  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  return (
    <Dropdown
      borderRadius="full"
      currentSelected={
        props.saveMode === "applicationWide" ? defaultYear : localYear
      }
      listData={arrayRange(
        Number(new Date(Date.now()).getFullYear()),
        1900,
        -1
      )}
      setSelected={
        props.saveMode === "applicationWide"
          ? setDefaultLanguageHandler
          : setLocalLanguageHandler
      }
    />
  );
};

export default YearsDropdown;
