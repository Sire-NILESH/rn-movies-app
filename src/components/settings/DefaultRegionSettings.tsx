import React, { useState } from "react";
import { ICountry } from "../../../types/typings";
import { useDefaultRegionHooks } from "../../hooks/reduxHooks";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import CountriesDropdown from "../ui/CountriesDropdown";

const DefaultRegionSettings = () => {
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
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default DefaultRegionSettings;
