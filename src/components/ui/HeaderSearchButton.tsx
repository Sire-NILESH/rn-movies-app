import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, View } from "react-native";
import { ISearchHistoryItem, MediaTypes } from "../../../types/typings";
import { Colors } from "./../../utils/Colors";
import IconButton from "./IconButton";

interface IProps {
  gotoList?: boolean;
  title?: string | null;
  searchCategory?: MediaTypes;
  disabled?: boolean;
  addSearchHistoryItemHandler?: (seachHistoryItem: ISearchHistoryItem) => void;
  clearSearchQueryHandler?: () => void;
}

export default function HeaderSearchButton({
  gotoList,
  title,
  searchCategory,
  disabled,
  addSearchHistoryItemHandler,
  clearSearchQueryHandler,
}: IProps) {
  const navigation = useNavigation();

  function onPressHandler() {
    if (gotoList === true) {
      // add to the search history
      if (addSearchHistoryItemHandler) {
        addSearchHistoryItemHandler({
          id: title ? title : "",
          itemName: title ? title : "",
          itemType: "searchHistory",
        });
      }

      // @ts-ignore
      navigation.push("Search Tiles", {
        title,
        searchCategory,
        clearSearchQueryHandler,
      });
    } else {
      // @ts-ignore
      navigation.navigate("Search", { searchCategory: searchCategory });
    }
  }

  return (
    <View className="h-10 w-10 rounded-full overflow-hidden">
      <Pressable
        className="h-full w-full items-center justify-center"
        onPress={disabled && disabled === true ? null : onPressHandler}
        android_ripple={{ color: "#eee" }}
      >
        <IconButton name="search-outline" size={24} color={Colors.gray[100]} />
      </Pressable>
    </View>
  );
}
