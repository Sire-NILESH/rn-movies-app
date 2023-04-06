import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { ICountry } from "../../../types/typings";
import { addRegion, getdataFromACollection } from "../../database/database";
import CountriesDropdown from "../ui/CountriesDropdown";

const DefaultRegionSettings = () => {
  const [defaultRegion, setDefaultRegion] = useState<ICountry>({
    code: "",
    name: "",
  });

  useEffect(() => {
    async function getDefaultRegion() {
      const region = await getdataFromACollection("current_region");
      setDefaultRegion(region.rows._array[0]);
    }
    getDefaultRegion();
  }, []);

  async function setDefaultRegionHandler(country: ICountry) {
    await addRegion(country);
  }

  return (
    <View
      className="flex-row items-center justify-between px-2 mt-2 mx-2 bg-accent rounded-xl"
      style={{ backgroundColor: "rgb(4, 20, 10)" }}
    >
      <Text className="text-text_tertiary mx-4">Select a country </Text>

      <CountriesDropdown
        currentCountry={defaultRegion}
        setCountryHandler={setDefaultRegionHandler}
      />
    </View>
  );
};

export default DefaultRegionSettings;
