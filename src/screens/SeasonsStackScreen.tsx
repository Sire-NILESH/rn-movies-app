import React, { memo, useCallback, useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { Season } from "../../types/typings";
import { Colors } from "./../utils/Colors";
import TopTabEpisodeListScreen from "./TopTabEpisodeListScreen";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TopTabs = createMaterialTopTabNavigator();

const TAB_WIDTH = 128;
const BACK_BTN_WIDTH = 44;

const SeasonsStackScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;
  // @ts-ignore
  const {
    tvMediaId,
    tvMediaSeasons,
    tvMediaPosterPath: tvMediaPosterPathOld,
    tvMediaName,
  }: {
    tvMediaId: number;
    tvMediaSeasons: Season[];
    tvMediaPosterPath: String;
    tvMediaName: string;
  } = route.params;

  const GoBackButton = useCallback(() => {
    return (
      <View className="absolute top-[1] left-0 z-10 bg-secondary w-[BACK_BTN_WIDTH] h-12 overflow-hidden border-b border-b-neutral-800">
        <Pressable
          className="flex-1 justify-center pl-4 pr-1"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.gray[50]} />
        </Pressable>
      </View>
    );
  }, []);

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 relative">
      <GoBackButton />
      <TopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "600",
            letterSpacing: 2,
            // lineHeight: 16,
          },
          tabBarScrollEnabled: true,
          tabBarStyle: {
            marginLeft: BACK_BTN_WIDTH,
            backgroundColor: Colors.secondary,
            borderBottomWidth: 1,
            borderBottomColor: Colors.neutral[800],
          },
          tabBarActiveTintColor: Colors.green[50],
          tabBarInactiveTintColor: Colors.text_dark,
          tabBarAndroidRipple: { borderless: false },
          tabBarPressColor: "#e9e9e9",
          tabBarItemStyle: { width: TAB_WIDTH },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.neutral[100],
          },
          lazy: true,
          lazyPreloadDistance: 1,
        }}
      >
        {/* Laying out all the TopTabs screens from routes */}
        {tvMediaSeasons.map((s, i) => {
          // decided to not show the extras screen.
          if (s.season_number === 0) {
            return null;
          }

          const seasonName =
            s.season_number === 0 ? "Extras" : `Season ${s.season_number}`;

          return (
            <TopTabs.Screen
              key={i}
              name={seasonName}
              options={{
                title: seasonName,
              }}
            >
              {(props) => {
                return (
                  <TopTabEpisodeListScreen
                    name={seasonName}
                    tvMediaId={tvMediaId}
                    season={tvMediaSeasons[i]}
                    tvMediaSeasons={tvMediaSeasons}
                    tvMediaPosterPathOld={tvMediaPosterPathOld}
                    tvMediaName={tvMediaName}
                    {...props}
                  />
                );
              }}
            </TopTabs.Screen>
          );
        })}
      </TopTabs.Navigator>
    </View>
  );
};

export default memo(SeasonsStackScreen);
