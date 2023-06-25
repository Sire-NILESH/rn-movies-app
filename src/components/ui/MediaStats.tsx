import { View, Text } from "react-native";
import React from "react";
import { formatCurrencyNumbers, isMovie } from "../../utils/helpers/helper";
import { Colors } from "../../utils/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../../../types/typings";
import { by639_1 } from "iso-language-codes";

interface IProps {
  media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended;
}

const MediaStats: React.FC<IProps> = ({ media }) => {
  return (
    <View className="mx-10 mb-2 mt-4 flex-row items-center justify-between space-x-2 divide-x-[3px] divide-tertiary">
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

      {/* STAT 2 */}
      <View className="flex-1 items-center py-2">
        <Text className="text-text_secondary text-lg font-bold text-center">
          {isMovie(media) ? "Movie" : "TV Show"}
        </Text>
        <View className="mt-1 flex-row items-center space-x-2 justify-center">
          <Ionicons
            name={isMovie(media) ? "film-outline" : "tv-outline"}
            size={14}
            color={Colors.text_dark}
          />

          <Text className="text-text_dark text-center">Media</Text>
        </View>
      </View>

      {/* STAT 3 */}
      <View className="flex-1 items-center py-2">
        <Text className="text-text_secondary text-lg font-bold text-center">
          {by639_1[media.original_language]?.name
            ? by639_1[media.original_language]?.name
            : media.original_language}
        </Text>
        <View className="mt-1 flex-row items-center space-x-2 justify-center">
          <Ionicons
            name="language-outline"
            size={14}
            color={Colors.text_dark}
          />

          <Text className="text-text_dark text-center">{"Language"}</Text>
        </View>
      </View>
    </View>
  );
};

export default MediaStats;
