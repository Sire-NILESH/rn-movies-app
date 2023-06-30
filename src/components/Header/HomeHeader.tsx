import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  buildGenrePlaylist,
  buildTrendingPlaylist,
} from "../../utils/helpers/helper";
import HeaderWrapperV2 from "./HeaderWrapper";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

interface Link {
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
  navigateTo: () => void;
}

const HomeHeader = () => {
  const navigation = useNavigation<DrawerNavigationOptions>();

  const headerLinksScreenParams: Link[] = [
    {
      name: "Search",
      iconName: "search",
      navigateTo: () => {
        // @ts-ignore
        navigation.navigate("Search", { searchCategory: "multi" });
      },
    },
    {
      name: "Movies",
      iconName: "film-outline",
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
      iconName: "tv-outline",
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
    link: {
      name: string;
      iconName: keyof typeof Ionicons.glyphMap;
      navigateTo: () => void;
    };
  }) {
    return (
      <View className="rounded-full overflow-hidden">
        <Pressable
          android_ripple={{ color: "#eee" }}
          className="py-2 px-2 flex-row space-x-1 items-center"
          onPress={props.link.navigateTo}
        >
          <Ionicons
            name={props.link.iconName}
            size={18}
            color={Colors.text_secondary}
          />
          {/* <Text className="text-text_tertiary text text-center font-semibold px-1">
            {props.link.name}
          </Text> */}
        </Pressable>
      </View>
    );
  }

  return (
    <View className="space-x-1 flex-row items-center">
      {headerLinksScreenParams.map((link, index) => (
        <View key={`${link.name}-${index}`}>
          <RenderHeaderLink link={link} />
        </View>
      ))}
    </View>
  );
};

export default HomeHeader;
