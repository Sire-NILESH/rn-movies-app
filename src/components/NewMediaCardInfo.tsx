import { View, Text, Image, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import {
  MovieMedia,
  MovieMediaExtended,
  MovieMediaHybrid,
  TvMedia,
  TvMediaExtended,
  TvMediaHybrid,
} from "../../types/typings";
import {
  dateFormatter,
  isMovie,
  isMovieExtended,
  isMovieMediaHybrid,
  isTvExtended,
  isTvMediaHybrid,
  toHoursAndMinutes,
} from "../utils/helpers/helper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "./../utils/Colors";
import ImagePlaceholder from "./ui/ImagePlaceholder";

interface IProps {
  media: MovieMedia | TvMedia | MovieMediaHybrid | TvMediaHybrid;
  imgQuality?: string;
}

const NewMediaCardInfo: React.FC<IProps> = ({ media, imgQuality }) => {
  const posterImgQuality = imgQuality ? imgQuality : 400;

  const imageUrl = media.backdrop_path
    ? `https://image.tmdb.org/t/p/w${posterImgQuality}${media.backdrop_path}`
    : `https://image.tmdb.org/t/p/w${posterImgQuality}${media.poster_path}`;

  const mediaCertificate = useMemo(() => {
    let certification;

    if (isMovieMediaHybrid(media) && media.release_dates) {
      certification = media.release_dates.results
        .find((releaseDate) => releaseDate.iso_3166_1 === "US")
        ?.release_dates.find((rd) => rd.certification !== "")?.certification;
    } else if (isTvMediaHybrid(media) && media.content_ratings) {
      certification = media.content_ratings.results.find(
        (contentRating) => contentRating.iso_3166_1 === "US"
      )?.rating;
    }

    return certification;
  }, []);

  return (
    <View className="mt-5 mx-3 justify-between rounded-2xl border border-stone-800/80 overflow-hidden">
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
          // "rgba(0, 0, 0, 0)",
          // "rgba(0, 0, 0, 0)",

          "rgba(0, 0, 0, 0.5)",
          "rgba(0, 0, 0, 0.5)",
          "rgba(0, 0, 0, 0.4)",
          "rgba(0, 0, 0, 0.3)",
          "rgba(0, 0, 0, 0.1)",
        ]}
        start={{ x: 0.0, y: 1 }}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        className="absolute bg-stone-900/10 rounded-l-2xl py-2 flex-row items-center justify-between"
      >
        <View className="h-full justify-around items-start">
          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons name="star" size={18} color={Colors.yellow[300]} />
            <Text
              className="font-bold text-text_highLight tracking-widest"
              style={styles.textShadow}
            >
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
              name="calendar-outline"
              size={18}
              color={Colors.text_primary}
            />
            <Text
              className="text-text_highLight font-bold"
              style={styles.textShadow}
            >
              {isMovie(media)
                ? media.release_date
                  ? dateFormatter(media.release_date)
                  : null
                : dateFormatter(media.first_air_date)}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons
              name={"flag-outline"}
              size={18}
              color={Colors.text_primary}
            />
            <Text
              className="text-text_highLight font-bold"
              style={styles.textShadow}
            >
              {isMovieExtended(media)
                ? media.status
                : isTvExtended(media)
                ? media.status
                : "--"}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2 px-4">
            <MaterialCommunityIcons
              name="file-certificate-outline"
              size={22}
              color={Colors.text_primary}
            />
            <View className="min-w-[28px] border border-green-50 px-1 rounded-sm items-center">
              <Text
                className="text-xs text-text_highLight font-bold"
                style={styles.textShadow}
              >
                {mediaCertificate
                  ? mediaCertificate
                  : media.adult
                  ? "ADULT"
                  : "--"}
              </Text>
            </View>
          </View>

          {isMovieExtended(media) && (
            <View className="flex-row items-center space-x-2 px-4">
              <Ionicons
                name="time-outline"
                size={18}
                color={Colors.text_primary}
              />
              <Text
                className="text-text_highLight font-bold"
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
              />
              <Text
                className="text-text_highLight font-bold"
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

export default NewMediaCardInfo;

const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: Colors.stone[700],
    textShadowOffset: { height: 2, width: 0 },
    textShadowRadius: 3,
  },
});
