import { Pressable, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import IconButton from "./IconButton";
import { Colors } from "./../../utils/Colors";
import { MediaTypes, MovieMedia, TvMedia } from "../../typings";

interface IProps {
  gotoList?: boolean;
  medias?: MovieMedia[] | TvMedia[];
  title?: string | null;
  searchCategory?: MediaTypes;
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
      navigation.push("Search Tiles", { title, medias, searchCategory });
    } else {
      // @ts-ignore
      navigation.navigate("Search", { searchCategory: searchCategory });
    }
  }

  return (
    <View className="mr-4 rounded-full overflow-hidden">
      <Pressable
        onPress={disabled && disabled === true ? null : onPressHandler}
        android_ripple={{ color: "#eee" }}
      >
        <IconButton name="search-outline" size={24} color={Colors.gray[100]} />
      </Pressable>
    </View>
  );
}
