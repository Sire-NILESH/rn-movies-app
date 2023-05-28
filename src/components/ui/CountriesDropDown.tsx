import React from "react";
import { countries } from "../../utils/helpers/helper";
import { ICountry } from "../../../types/typings";
import Dropdown from "./Dropdown";

interface IProps {
  currentCountry: ICountry;
  setCountryHandler: (country: ICountry) => void;
  bgColor?: string;
}

const CountriesDropdown: React.FC<IProps> = ({
  currentCountry,
  setCountryHandler,
  bgColor,
}) => {
  return (
    <Dropdown
      borderRadius="full"
      currentSelected={currentCountry}
      listData={countries}
      setSelected={setCountryHandler}
      bgColor={bgColor}
    />
  );
};

export default CountriesDropdown;
