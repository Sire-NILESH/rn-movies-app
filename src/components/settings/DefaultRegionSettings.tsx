import React, { useState } from "react";
import { ICountry } from "../../../types/typings";
import CountriesDropdown from "../ui/CountriesDropdown";
import { useDefaultRegionHooks } from "../../hooks/reduxHooks";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";

const DefaultRegionSettings = () => {
  const { setDefaultRegionHandler, defaultRegion } = useDefaultRegionHooks();
  const [currentDefaultRegion, setDefaultRegion] =
    useState<ICountry>(defaultRegion);

  // useEffect(() => {
  //   async function getDefaultRegion() {
  //     const region = await getdataFromACollection("current_region");
  //     setDefaultRegion(region.rows._array[0]);
  //   }
  //   getDefaultRegion();
  // }, []);

  function onSetDefaultRegion(country: ICountry) {
    setDefaultRegionHandler(country);
  }

  // DB method
  // async function setDefaultRegionHandler(country: ICountry) {
  //   await addRegion(country);
  // }

  return (
    <SettingsCardWrapper
      iconName="location-outline"
      title="Default region"
      subtitle={`A default region for the watch providers.`}
    >
      <CardRow rowTitle="Select a Language">
        <CountriesDropdown
          currentCountry={currentDefaultRegion}
          setCountryHandler={onSetDefaultRegion}
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default DefaultRegionSettings;
