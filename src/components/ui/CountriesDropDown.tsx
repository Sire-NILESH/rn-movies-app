import { View, Text } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries } from "../../utils/helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import { ICountry } from "../../typings";
import { Colors } from "./../../utils/Colors";

interface IProps {
  currentCountry: ICountry;
  setCountryHandler: (country: ICountry) => void;
}

const CountriesDropDown: React.FC<IProps> = ({
  currentCountry,
  setCountryHandler,
}) => {
  return (
    <View className="flex-row items-center px-4">
      <SelectDropdown
        data={countries}
        //   search={true}
        renderDropdownIcon={(s) => (
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={Colors.gray[200]}
          />
        )}
        onSelect={(selectedCountry: ICountry, index) => {
          setCountryHandler(selectedCountry);
        }}
        buttonStyle={{
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          borderRadius: 10,
          width: 200,
          borderWidth: 0,
          borderBottomColor: "red",
        }}
        buttonTextStyle={{ color: Colors.green[100], fontSize: 14 }}
        rowStyle={{ borderBottomColor: Colors.stone[800] }}
        rowTextStyle={{ color: Colors.green[100], fontSize: 14 }}
        dropdownOverlayColor={"transparent"}
        dropdownStyle={{
          backgroundColor: Colors.stone[900],
          borderRadius: 10,
        }}
        searchInputStyle={{
          backgroundColor: Colors.stone[800],
          paddingHorizontal: 20,
        }}
        searchInputTxtColor={Colors.green[100]}
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

      {/* <Text className="text-gray-300 mx-4">Region</Text> */}
    </View>
  );
};

export default CountriesDropDown;
