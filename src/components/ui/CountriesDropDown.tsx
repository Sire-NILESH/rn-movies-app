import { View } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries } from "../../utils/helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import { ICountry } from "../../../types/typings";
import { Colors } from "../../utils/Colors";

interface IProps {
  currentCountry: ICountry;
  setCountryHandler: (country: ICountry) => void;
}

const CountriesDropdown: React.FC<IProps> = ({
  currentCountry,
  setCountryHandler,
}) => {
  return (
    <View className="" style={{ backgroundColor: "rgb(4, 20, 10)" }}>
      <SelectDropdown
        data={countries}
        //   search={true}
        renderDropdownIcon={(s) => (
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={Colors.text_secondary}
          />
        )}
        onSelect={(selectedCountry: ICountry, index) => {
          setCountryHandler(selectedCountry);
        }}
        buttonStyle={{
          backgroundColor: Colors.accentLighter,
          borderRadius: 100,
          width: 150,
          height: 45,
          borderWidth: 0,
          borderBottomColor: "red",
        }}
        buttonTextStyle={{ color: Colors.text_primary, fontSize: 14 }}
        rowStyle={{ borderBottomColor: Colors.accentLighter }}
        rowTextStyle={{ color: Colors.text_primary, fontSize: 14 }}
        dropdownOverlayColor={"transparent"}
        dropdownStyle={{
          backgroundColor: Colors.stone[900],
          borderRadius: 10,
        }}
        defaultButtonText={currentCountry.name}
        buttonTextAfterSelection={(selectedCountry: ICountry, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedCountry.name;
        }}
        rowTextForSelection={(country, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return country.name;
        }}
      />
    </View>
  );
};

export default CountriesDropdown;
