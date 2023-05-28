import React, { useState } from "react";
import { ICountry } from "../../../types/typings";
import { useDefaultRegionHooks } from "../../hooks/reduxHooks";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import CountriesDropdown from "../ui/CountriesDropdown";

interface IProps {
  dropdownBgColor?: string;
}

const DefaultRegionSettings: React.FC<IProps> = ({ dropdownBgColor }) => {
  const { setDefaultRegionHandler, defaultRegion } = useDefaultRegionHooks();
  const [currentDefaultRegion, setDefaultRegion] =
    useState<ICountry>(defaultRegion);

  function onSetDefaultRegion(country: ICountry) {
    setDefaultRegionHandler(country);
  }

  return (
    <SettingsCardWrapper
      iconName="location-outline"
      title="Default region"
      subtitle={`A default region for the watch providers.`}
    >
      <CardRow rowTitle="Select a Country">
        <CountriesDropdown
          currentCountry={currentDefaultRegion}
          setCountryHandler={onSetDefaultRegion}
          bgColor={dropdownBgColor}
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default DefaultRegionSettings;
