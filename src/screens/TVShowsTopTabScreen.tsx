import { StatusBar } from "expo-status-bar";
import React, { memo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../hooks/reduxHooks";
import { watchlistMedias } from "../store/watchlistSlice";
import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { collectionTypeToReduxCollection } from "../utils/helpers/helper";

const TVShowsTopTabScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, route, collectionType } = props;

  const reduxCollection = collectionTypeToReduxCollection[collectionType];

  // REDUX TOOLKIT HOOKS
  const medias = useAppSelector((state) => state[reduxCollection]);

  const tvMedias = Object.values(medias).filter(
    (media) => media.mediaType === "tv"
  );

  // console.log("WATCHLISTED TV SHOWS", tvMedias);

  return (
    <View className="flex-1 items-center justify-center bg-stone-800">
      <Text className="text-2xl font-bold text-text_primary">TV Shows</Text>
      {tvMedias.map((tv) => (
        <Text key={tv.mediaId} className="font-semibold text-yellow-300">
          {tv.mediaTitle}
        </Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
};

export default memo(TVShowsTopTabScreen);
