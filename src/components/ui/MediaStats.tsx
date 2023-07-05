import { View, Text } from "react-native";
import React, { useMemo } from "react";
import {
  formatCurrencyNumbers,
  isMovie,
  isMovieMediaHybrid,
  isTvMediaHybrid,
} from "../../utils/helpers/helper";
import { Colors } from "../../utils/Colors";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../../../types/typings";

interface IProps {
  media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended;
}

const MediaStats: React.FC<IProps> = ({ media }) => {
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
    <View className="mx-12 mt-4 flex-row items-center justify-evenly">
      {/* STAT 1 */}
      <View className="flex-1 items-center py-2">
        <Text className="text-lg font-bold text-text_highLight tracking-widest">
          <Text
            className="font-bold"
            style={{
              color:
                media.popularity > 100
                  ? Colors.green[500]
                  : Colors.text_primary,
            }}
          >
            {formatCurrencyNumbers(Number(media.popularity.toFixed(2)))}
          </Text>
        </Text>
        <View className="mt-1 flex-row items-center space-x-2 justify-center">
          {/* <Ionicons name="people" size={14} color={Colors.yellow[300]} /> */}
          <FontAwesome name="line-chart" size={14} color={Colors.yellow[300]} />
          <Text className="text-text_dark text-center">Popularity</Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View className="h-[80%] w-[3px] bg-neutral-800 rounded-full mx-2" />

      {/* STAT 2 */}
      <View className="flex-1 items-center py-2">
        <Text className="text-text_secondary text-lg font-bold text-center">
          {isMovie(media) ? "Movie" : "TV Show"}
        </Text>
        <View className="mt-1 flex-row items-center space-x-2 justify-center">
          <Ionicons
            name={isMovie(media) ? "film-outline" : "tv-outline"}
            size={16}
            color={Colors.text_dark}
          />

          <Text className="text-text_dark text-center">Media</Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View className="h-[80%] w-[3px] bg-neutral-800 rounded-full mx-2" />

      {/* STAT 3 */}
      <View className="flex-1 items-center py-2">
        <View className="min-w-[20px] border border-neutral-500 my-1 px-2 rounded-sm items-center">
          <Text className="text-sm text-text_secondary font-bold">
            {mediaCertificate ? mediaCertificate : media.adult ? "ADULT" : "--"}
          </Text>
        </View>
        <View className="mt-1 flex-row items-center space-x-1 justify-center">
          <MaterialCommunityIcons
            name="file-certificate-outline"
            size={18}
            color={Colors.text_dark}
          />

          <Text className="text-text_dark text-center">{"Certificate"}</Text>
        </View>
      </View>
    </View>
  );
};

export default MediaStats;
