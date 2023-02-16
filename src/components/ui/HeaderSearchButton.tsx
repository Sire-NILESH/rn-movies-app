import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import IconButton from "./IconButton";
import { Colors } from "./../../utils/Colors";
import { Movie, MovieMedia, TvMedia } from "../../typings";
import { IStackScreenProps } from "../../library/StackScreenProps";

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
      navigation.navigate("Tiles", { title, medias });
    } else {
      navigation.navigate("Search Screen", { searchCategory: searchCategory });
    }
  }

  // if (disabled && disabled === true) return <></>;

  return (
    <Pressable
      onPress={disabled && disabled === true ? null : onPressHandler}
      className="mr-4"
    >
      <IconButton
        name="search-outline"
        size={24}
        color={Colors.gray[100]}
        // method={onPressHandler}
      />
    </Pressable>
  );
}
// export default HeaderSearchButton;
