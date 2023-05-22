import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { isIImageQuality, isSupportedLang } from "../../utils/helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import {
  IDropdownYearsObj,
  IImageQuality,
  ISOLang,
  ISupportedLang,
} from "../../../types/typings";
import { Colors } from "../../utils/Colors";

type TSupportedTypes = ISupportedLang | IDropdownYearsObj | IImageQuality;

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
          backgroundColor: Colors.accentLighter,
          borderRadius: radiusForDropdown[borderRadius],
          width: 150,
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
          isSupportedLang(currentSelected)
            ? currentSelected.english_name
            : isIImageQuality(currentSelected)
            ? currentSelected.quality
            : currentSelected.value
        }
        buttonTextAfterSelection={(selectedItem: T, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return isSupportedLang(selectedItem)
            ? selectedItem.english_name
            : isIImageQuality(selectedItem)
            ? selectedItem.quality
            : selectedItem.value;
        }}
        rowTextForSelection={(item: T, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return isSupportedLang(item)
            ? item.english_name
            : isIImageQuality(item)
            ? item.quality
            : item.value;
        }}
      />
    </>
  );
}
