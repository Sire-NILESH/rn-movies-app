import { StatusBar } from "expo-status-bar";
import React, { memo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../hooks/reduxHooks";
import { watchlistMedias } from "../store/watchlistSlice";
import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { collectionTypeToReduxCollection } from "../utils/helpers/helper";
import { RootState } from "../store/store";

const MoviesTopTabScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, route, collectionType } = props;

  const reduxCollection = collectionTypeToReduxCollection[collectionType];

  // REDUX TOOLKIT HOOKS
  const medias = useAppSelector((state) => state[reduxCollection]);

  const movieMedias = Object.values(medias).filter(
    (media) => media.mediaType === "movie"
  );
  //   console.log("WATCHLISTED MOVIES", movieMedias);

  return (
    <View className="flex-1 items-center justify-center bg-stone-800">
      <Text className="text-2xl font-bold text-text_primary">Movies</Text>
      {movieMedias.map((movie) => (
        <Text key={movie.mediaId} className="font-semibold text-yellow-300">
          {movie.mediaTitle}
        </Text>
      ))}
    </View>
  );
};

export default memo(MoviesTopTabScreen);
