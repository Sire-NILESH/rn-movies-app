import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import IconButton from "./IconButton";
import { Colors } from "./../../utils/Colors";
import { Movie } from "../../typings";
import { IStackScreenProps } from "../../library/StackScreenProps";

interface IProps {
  gotoList?: boolean;
  movies?: Movie[];
  title?: string | null;
  searchCategory?: string | null;
}

export default function HeaderSearchButton({
  gotoList,
  title,
  movies,
  searchCategory,
}: IProps) {
  const navigation = useNavigation();

  function onPressHandler() {
    if (gotoList === true) {
      navigation.navigate("Tiles", { title, movies });
    } else {
      navigation.navigate("Search Screen", { searchCategory: searchCategory });
    }
  }

  return (
    <Pressable onPress={onPressHandler} className="mr-4">
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
