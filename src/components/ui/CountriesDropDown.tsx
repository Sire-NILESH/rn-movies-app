import React from "react";
import { countries } from "../../utils/helpers/helper";
import { ICountry } from "../../../types/typings";
import Dropdown from "./Dropdown";

interface IProps {
  currentCountry: ICountry;
  setCountryHandler: (country: ICountry) => void;
}

const CountriesDropdown: React.FC<IProps> = ({
  currentCountry,
  setCountryHandler,
}) => {
  return (
    <Dropdown
      borderRadius="full"
      currentSelected={currentCountry}
      listData={countries}
      setSelected={setCountryHandler}
    />
  );
};

export default CountriesDropdown;
