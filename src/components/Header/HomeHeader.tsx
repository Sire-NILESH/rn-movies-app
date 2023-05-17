import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  buildGenrePlaylist,
  buildTrendingPlaylist,
} from "../../utils/helpers/helper";
import HeaderWrapperV2 from "./HeaderWrapper";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationOptions } from "@react-navigation/drawer";

const HomeHeader = () => {
  const navigation = useNavigation<DrawerNavigationOptions>();

  const headerLinksScreenParams = [
    {
      name: "Search",
      navigateTo: () => {
        // @ts-ignore
        navigation.navigate("Search", { searchCategory: "multi" });
      },
    },
    {
      name: "Movies",
      navigateTo: () => {
        // @ts-ignore
        navigation.push("Tiles", {
          title: "Trending Movies",
          playlist: buildTrendingPlaylist("Trending", "movie"),
          currentMediaType: "movie",
        });
      },
    },
    {
      name: "TV Shows",
      navigateTo: () => {
        // @ts-ignore
        navigation.push("Tiles", {
          title: "Sci-Fi & Fantasy",
          playlist: buildGenrePlaylist("tv", {
            id: 10765,
            name: "Sci-Fi & Fantasy",
          }),
          currentMediaType: "tv",
        });
      },
    },
  ];

  function RenderHeaderLink(props: {
    link: { name: string; navigateTo: () => void };
  }) {
    return (
      <View className="rounded-full overflow-hidden">
        <Pressable
          android_ripple={{ color: "#eee" }}
          className="py-2 px-1"
          onPress={props.link.navigateTo}
        >
          <Text className="text-text_primary text text-center font-semibold px-1">
            {props.link.name}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    //  <HeaderWrapperV2>
    <>
      {headerLinksScreenParams.map((link, index) => (
        <RenderHeaderLink key={`${link.name}-${index}`} link={link} />
      ))}
    </>
    //  </HeaderWrapperV2>
  );
};

export default HomeHeader;
