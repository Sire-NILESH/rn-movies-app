import { View, Text } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries } from "../../utils/helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import { ICountry } from "../../typings";
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
    <View
      className="flex-row  items-center justify-between px-4 mt-2] rounded-xl mx-2"
      style={{ backgroundColor: "rgb(4, 20, 10)" }}
    >
      <Text className="text-gray-300 mx-4">Watch providers for this in </Text>
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
          // backgroundColor: "transparent",
          backgroundColor: "rgb(7, 38, 19)",
          borderRadius: 100,
          width: 150,
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
    </View>
  );
};

export default CountriesDropdown;
