import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import {
  MovieMedia,
  MovieMediaHybrid,
  TvMedia,
  TvMediaHybrid,
} from "../../types/typings";
import {
  dateFormatter,
  isMovie,
  isMovieExtended,
  isTvExtended,
  toHoursAndMinutes,
} from "../utils/helpers/helper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import { by639_1 } from "iso-language-codes";

interface IProps {
  media: MovieMedia | TvMedia | MovieMediaHybrid | TvMediaHybrid;
  imgQuality?: string;
}

const MediaCardInfo: React.FC<IProps> = ({ media, imgQuality }) => {
  const posterImgQuality = imgQuality ? imgQuality : 400;

  const imageUrl = media.backdrop_path
    ? `https://image.tmdb.org/t/p/w${posterImgQuality}${media.backdrop_path}`
    : `https://image.tmdb.org/t/p/w${posterImgQuality}${media.poster_path}`;

  return (
    <View className="justify-between rounded-2xl border border-stone-800/80 overflow-hidden">
      <View
        className="relative h-full w-full "
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
          "rgba(0, 0, 0, 0.5)",
          "rgba(0, 0, 0, 0.5)",
          "rgba(0, 0, 0, 0.4)",
          "rgba(0, 0, 0, 0.3)",
          "rgba(0, 0, 0, 0.1)",
        ]}
        start={{ x: 0.0, y: 1 }}
        // style={{ width: "100%", aspectRatio: 16 / 9 }}
        className="absolute w-full h-full bg-stone-900/10 rounded-l-2xl py-2 flex-row items-center justify-between"
      >
        <View className="h-full justify-around items-start flex-wrap">
          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons
              name="star"
              size={18}
              color={Colors.yellow[300]}
              style={styles.textShadow}
            />
            <Text
              className="text-sm font-semibold text-text_highLight tracking-widest"
              style={styles.textShadow}
            >
              <Text
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
              name="calendar-outline"
              size={18}
              color={Colors.text_primary}
              style={styles.textShadow}
            />
            <Text
              className="text-text_highLight text-sm font-semibold"
              style={styles.textShadow}
            >
              {isMovie(media)
                ? media.release_date
                  ? dateFormatter(media.release_date)
                  : "--"
                : media.first_air_date
                ? dateFormatter(media.first_air_date)
                : "--"}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons
              name={"flag-outline"}
              size={18}
              color={Colors.text_primary}
              style={styles.textShadow}
            />
            <Text
              className="text-text_highLight text-sm font-semibold"
              style={styles.textShadow}
            >
              {isMovieExtended(media)
                ? media.status
                : isTvExtended(media)
                ? media.status.toLowerCase() === "ended"
                  ? `${media.status} ${
                      media.last_episode_to_air.air_date
                        ? `(${
                            dateFormatter(
                              media.last_episode_to_air.air_date
                            ).split(" ")[2]
                          })`
                        : ""
                    }`
                  : media.status
                : "--"}
            </Text>
          </View>

          {media.original_language ? (
            <View className="flex-row items-center space-x-2 px-4">
              <Ionicons
                name="language-outline"
                size={18}
                color={Colors.text_primary}
                style={styles.textShadow}
              />
              <Text
                className="text-text_highLight text-sm font-semibold"
                style={styles.textShadow}
              >
                {media.original_language === "cn"
                  ? "Cantonese"
                  : media.original_language === "zh"
                  ? "Mandarin"
                  : by639_1[media.original_language]?.name
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
                style={styles.textShadow}
              />
              <Text
                className="text-text_highLight text-sm font-semibold"
                style={styles.textShadow}
              >
                {toHoursAndMinutes(media.runtime)}
              </Text>
            </View>
          )}

          {isTvExtended(media) && (
            <View className="flex-row items-center space-x-2 px-4">
              <Ionicons
                name="document-text-outline"
                size={18}
                color={Colors.text_primary}
                style={styles.textShadow}
              />
              <Text
                className="text-text_highLight text-sm font-semibold"
                style={styles.textShadow}
              >
                {media.type}
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default MediaCardInfo;

const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: Colors.stone[700],
    textShadowOffset: { height: 1, width: 0 },
    textShadowRadius: 5,
  },
});
