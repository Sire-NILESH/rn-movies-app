import { View, Text, Image } from "react-native";
import React from "react";
import { MovieMedia, TvMedia, TvMediaExtended } from "../../types/typings";
import {
  dateFormatter,
  isMovie,
  isMovieExtended,
  isTvExtended,
  toHoursAndMinutes,
} from "../utils/helpers/helper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./../utils/Colors";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import { by639_1 } from "iso-language-codes";

interface IProps {
  media: MovieMedia | TvMedia | TvMediaExtended;
  imgQuality?: string;
}

const NewMediaCardInfo: React.FC<IProps> = ({ media, imgQuality }) => {
  const posterImgQuality = imgQuality ? imgQuality : 400;

  const imageUrl = media.backdrop_path
    ? `https://image.tmdb.org/t/p/w${posterImgQuality}${media.backdrop_path}`
    : `https://image.tmdb.org/t/p/w${posterImgQuality}${media.poster_path}`;

  return (
    <View className="mt-5 mx-3 justify-between rounded-2xl border border-stone-800 overflow-hidden">
      <View
        className="relative flex-1 "
        style={{
          width: "100%",
          aspectRatio: 16 / 9,
          // height: 250,
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            resizeMode="cover"
            className="h-full w-full rounded-2xl"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </View>

      <LinearGradient
        colors={[
          "rgba(15, 15, 15, 0.4)",
          "rgba(15, 15, 15, 0.5)",
          "rgba(15, 15, 15, 0.4)",
          "rgba(15, 15, 15, 0.3)",
          "rgba(15, 15, 15, 0.3)",
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
                {by639_1[media.original_language]?.name
                  ? by639_1[media.original_language]?.name
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
