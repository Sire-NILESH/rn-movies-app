import { View, Text } from "react-native";
import React from "react";
import { MovieMedia, TvMedia, TvMediaExtended } from "../typings";
import {
  dateFormatter,
  isMovie,
  isMovieExtended,
  isTvExtended,
  toHoursAndMinutes,
} from "../utils/helpers/helper";
import { isoLangs } from "../utils/helpers/isoLangs";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./../utils/Colors";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import ImageCached from "./ui/ImageCached";
import { useFavouriteMediaListHooks } from "../hooks/reduxHooks";

interface IProps {
  media: MovieMedia | TvMedia | TvMediaExtended;
}

const NewMediaCardInfo: React.FC<IProps> = ({ media }) => {
  const {
    addMediaToFavouriteHandler,
    removeMediaFromFavouriteHandler,
    isMediaFavourite,
  } = useFavouriteMediaListHooks();

  const imageUrl = media.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${media.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${media.poster_path}`;

  // h-[200px]
  return (
    <View className="mt-5 mx-3 justify-between border border-stone-800 rounded-2xl overflow-hidden">
      <View
        className="relative flex-1 rounded-2xl overflow-hidden"
        style={{ width: "100%", aspectRatio: 16 / 9 }}
      >
        {imageUrl ? (
          <ImageCached
            imageURL={imageUrl}
            cacheKey={`${media.id}-${isMovie(media) ? "movie" : "tv"}-backdrop`}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </View>

      <LinearGradient
        colors={[
          "rgba(15, 15, 15, 0.9)",
          "rgba(15, 15, 15, 0.7)",
          "rgba(15, 15, 15, 0.6)",
          "rgba(15, 15, 15, 0.4)",
          "rgba(0,0,0,0)",
        ]}
        start={{ x: 0.0, y: 1 }}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        className="absolute rounded-l-2xl py-6 flex-row items-center justify-between"
      >
        <View className="space-y-4">
          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons name="star" size={18} color={Colors.yellow[300]} />
            <Text className="font-bold text-text_highLight tracking-widest">
              <Text
                className="font-bold"
                style={{
                  color:
                    media.vote_average > 4.0
                      ? Colors.green[500]
                      : Colors.red[400],
                }}
              >
                {media.vote_average.toFixed(2)}
              </Text>
              /10
            </Text>
          </View>

          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons
              name={isMovie(media) ? "film-outline" : "tv-outline"}
              size={18}
              color={Colors.text_primary}
            />
            <Text className="text-text_highLight">
              {isMovie(media) ? "Movie" : "TV"}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons
              name="calendar-outline"
              size={18}
              color={Colors.text_primary}
            />
            <Text className="text-text_highLight">
              {isMovie(media)
                ? media.release_date
                  ? dateFormatter(media.release_date)
                  : null
                : dateFormatter(media.first_air_date)}
            </Text>
          </View>

          {media.original_language ? (
            <View className="flex-row items-center space-x-2 px-4">
              <Ionicons
                name="language-outline"
                size={18}
                color={Colors.text_primary}
              />
              <Text className="text-text_highLight">
                {/*  @ts-ignore */}
                {isoLangs[media.original_language]?.name
                  ? // @ts-ignore
                    isoLangs[media.original_language]?.name
                  : media.original_language}
              </Text>
            </View>
          ) : null}

          {isMovieExtended(media) && (
            <View className="flex-row items-center space-x-2 px-4">
              <Ionicons
                name="time-outline"
                size={18}
                color={Colors.text_primary}
              />
              <Text className="text-text_highLight">
                <Text className="text-text_highLight">
                  {toHoursAndMinutes(media.runtime)}
                  {/* { toHoursAndMinutes(media.runtime)} minutes */}
                </Text>
              </Text>
            </View>
          )}

          {isTvExtended(media) && (
            <View className="flex-row items-center space-x-2 px-4">
              <Ionicons name="bookmark" size={18} color={Colors.text_primary} />
              <Text className="text-text_highLight">
                <Text className="text-text_highLight">{media.status}</Text>
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default NewMediaCardInfo;
