import { Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import IconButton from "./IconButton";
import { Colors } from "./../../utils/Colors";
import { MovieMedia, TvMedia } from "../../typings";

interface IProps {
  gotoList?: boolean;
  medias?: MovieMedia[] | TvMedia[];
  title?: string | null;
  searchCategory?: string | null;
  disabled?: boolean;
}

export default function HeaderSearchButton({
  gotoList,
  title,
  medias,
  searchCategory,
  disabled,
}: IProps) {
  const navigation = useNavigation();

  function onPressHandler() {
    if (gotoList === true) {
      // @ts-ignore
      navigation.push("Tiles", { title, medias });
    } else {
      // @ts-ignore
      navigation.navigate("Search Screen", { searchCategory: searchCategory });
    }
  }

  return (
    <Pressable
      onPress={disabled && disabled === true ? null : onPressHandler}
      className="mr-4"
    >
      <IconButton name="search-outline" size={24} color={Colors.gray[100]} />
    </Pressable>
  );
}
