import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import {
  isICountry,
  isIDropdownYear,
  isIImageQuality,
  isSupportedLang,
} from "../../utils/helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ICountry,
  IDropdownYearsObj,
  IGenreSortBy,
  IImageQuality,
  ISupportedLang,
} from "../../../types/typings";
import { Colors } from "../../utils/Colors";

type TSupportedTypes =
  | ISupportedLang
  | IDropdownYearsObj
  | IImageQuality
  | ICountry
  | IGenreSortBy;

interface IProps<T extends TSupportedTypes> {
  listData: T[];
  currentSelected: T;
  setSelected: (item: T) => void;
  borderRadius: "medium" | "full";
  bgColor?: string;
  dropdownWidth?: number;
}

export default function Dropdown<T extends TSupportedTypes>({
  listData,
  currentSelected,
  borderRadius,
  setSelected,
  bgColor,
  dropdownWidth,
}: IProps<T>) {
  const radiusForDropdown = {
    medium: 10,
    full: 1000,
  };

  return (
    <>
      <SelectDropdown
        data={listData}
        renderDropdownIcon={(isOpened) => {
          return isOpened ? (
            <MaterialIcons
              name="arrow-drop-up"
              size={24}
              color={Colors.text_secondary}
            />
          ) : (
            <MaterialIcons
              name="arrow-drop-down"
              size={24}
              color={Colors.text_secondary}
            />
          );
        }}
        onSelect={(selectedItem: T, _index) => {
          setSelected(selectedItem);
        }}
        buttonStyle={{
          backgroundColor: bgColor ? bgColor : Colors.accentLighter,
          borderRadius: radiusForDropdown[borderRadius],
          width: dropdownWidth ? dropdownWidth : 150,
          borderWidth: 0,
          borderBottomColor: "red",
        }}
        buttonTextStyle={{ color: Colors.text_primary, fontSize: 14 }}
        rowStyle={{ borderBottomColor: Colors.stone[800] }}
        rowTextStyle={{ color: Colors.text_primary, fontSize: 14 }}
        dropdownOverlayColor={"transparent"}
        dropdownStyle={{
          backgroundColor: Colors.stone[800],
          borderWidth: 1,
          borderTopWidth: 1,
          borderRadius: 10,
          borderColor: "rgba(23, 23, 23, 0.3)",
          marginTop: -24,
          // width: 150,
        }}
        defaultButtonText={
          isSupportedLang(currentSelected)
            ? currentSelected.english_name
            : isIImageQuality(currentSelected)
            ? currentSelected.quality
            : isICountry(currentSelected)
            ? currentSelected.name
            : isIDropdownYear(currentSelected)
            ? currentSelected.value
            : currentSelected.key
        }
        buttonTextAfterSelection={(selectedItem: T, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return isSupportedLang(selectedItem)
            ? selectedItem.english_name
            : isIImageQuality(selectedItem)
            ? selectedItem.quality
            : isICountry(selectedItem)
            ? selectedItem.name
            : isIDropdownYear(selectedItem)
            ? selectedItem.value
            : selectedItem.key;
        }}
        rowTextForSelection={(item: T, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return isSupportedLang(item)
            ? item.english_name
            : isIImageQuality(item)
            ? item.quality
            : isICountry(item)
            ? item.name
            : isIDropdownYear(item)
            ? item.value
            : item.key;
        }}
      />
    </>
  );
}
