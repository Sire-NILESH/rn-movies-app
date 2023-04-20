import { View } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { isIImageQuality, isISOLang } from "../../utils/helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import {
  IDropdownYearsObj,
  IImageQuality,
  ISOLang,
} from "../../../types/typings";
import { Colors } from "../../utils/Colors";

type TSupportedTypes = ISOLang | IDropdownYearsObj | IImageQuality;

interface IProps<T extends TSupportedTypes> {
  listData: T[];
  currentSelected: T;
  setSelected: (item: T) => void;
  borderRadius: "medium" | "full";
}

export default function Dropdown<T extends TSupportedTypes>({
  listData,
  currentSelected,
  borderRadius,
  setSelected,
}: IProps<T>) {
  const radiusForDropdown = {
    medium: 10,
    full: 1000,
  };

  return (
    <>
      <SelectDropdown
        data={listData}
        // search={true}
        // searchInputStyle={{
        //   backgroundColor: Colors.stone[800],
        //   //  borderRadius: radiusForDropdown[borderRadius],
        //   borderBottomColor: Colors.accentLighter,
        //   paddingHorizontal: 16,
        // }}
        // searchInputTxtColor={Colors.text_primary}
        //   searchPlaceHolder={"Search"}
        //   searchPlaceHolderColor={Colors.text_dark}
        renderDropdownIcon={(s) => (
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={Colors.text_secondary}
          />
        )}
        onSelect={(selectedItem: T, _index) => {
          setSelected(selectedItem);
        }}
        buttonStyle={{
          // backgroundColor: "transparent",
          backgroundColor: Colors.accentLighter,
          // backgroundColor: "rgb(7, 38, 19)",
          borderRadius: radiusForDropdown[borderRadius],
          width: 150,
          // height: 20,
          borderWidth: 0,
          borderBottomColor: "red",
        }}
        buttonTextStyle={{ color: Colors.text_primary, fontSize: 14 }}
        rowStyle={{ borderBottomColor: Colors.accentLighter }}
        rowTextStyle={{ color: Colors.text_primary, fontSize: 14 }}
        dropdownOverlayColor={"transparent"}
        dropdownStyle={{
          backgroundColor: Colors.tertiary,
          borderRadius: 10,
        }}
        defaultButtonText={
          isISOLang(currentSelected)
            ? currentSelected.name
            : isIImageQuality(currentSelected)
            ? currentSelected.quality
            : currentSelected.value
        }
        buttonTextAfterSelection={(selectedItem: T, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return isISOLang(selectedItem)
            ? selectedItem.name
            : isIImageQuality(selectedItem)
            ? selectedItem.quality
            : selectedItem.value;
        }}
        rowTextForSelection={(item: T, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return isISOLang(item)
            ? item.name
            : isIImageQuality(item)
            ? item.quality
            : item.value;
        }}
      />
    </>
  );
}
