import { View, Text, Image } from "react-native";
import React from "react";
import { MovieMedia, TvMedia, TvMediaExtended } from "../typings";
import { isMovie, isTvExtended } from "../utils/helpers/helper";
import { isoLangs } from "../utils/helpers/isoLangs";
// @ts-ignore, there is no types module available for this package online.
import ExpoFastImage from "expo-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./../utils/Colors";

interface IProps {
  media: MovieMedia | TvMedia | TvMediaExtended;
}

const NewMediaCardInfo: React.FC<IProps> = ({ media }) => {
  const imageUrl = media.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${media.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${media.poster_path}`;
  // const imageUrl =
  //   (media.poster_path || media.backdrop_path) &&
  //   `https://image.tmdb.org/t/p/w500${
  //     media.backdrop_path || media.poster_path
  //   }`;

  return (
    <View className="mt-5 mx-3 justify-between border border-stone-800/30 rounded-2xl">
      <View className="relative flex-1 rounded-2xl h-[200px] overflow-hidden">
        {imageUrl ? (
          <ExpoFastImage
            // source={
            //   imageUrl
            //     ? { uri: imageUrl }
            //     : require("../../assets/images/placeholders/posterPlaceHolder.webp")
            // }
            uri={imageUrl}
            cacheKey={media.id + "backdrop"}
            resizeMode={"cover"}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/placeholders/posterPlaceHolder.webp")}
            resizeMode={"cover"}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </View>

      <LinearGradient
        colors={[
          "rgba(28, 25, 23, 0.9)",
          "rgba(28, 25, 23, 0.8)",
          "rgba(28, 25, 23, 0.6)",
          "rgba(28, 25, 23, 0.5)",
          "rgba(28, 25, 23, 0.2)",
          "rgba(0,0,0,0)",
        ]}
        start={{ x: 0.0, y: 1 }}
        className="absolute h-[200px] w-[100%] rounded-l-2xl py-6 space-y-4 justify-center"
      >
        <View className="flex-row items-center space-x-2 px-4">
          <Ionicons name="star" size={18} color={Colors.yellow[300]} />
          <Text className="font-bold text-stone-200">
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
            color={Colors.stone[100]}
          />
          <Text className="text-green-100">
            {isMovie(media) ? "Movie" : "TV"}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2 px-4">
          <Ionicons
            name="calendar-outline"
            size={18}
            color={Colors.stone[100]}
          />
          <Text className="text-green-100">
            {isMovie(media) ? media.release_date : media.first_air_date}
          </Text>
        </View>

        {media.original_language ? (
          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons
              name="language-outline"
              size={18}
              color={Colors.stone[100]}
            />
            <Text className="text-green-100">
              {/*  @ts-ignore */}
              {isoLangs[media.original_language]?.name
                ? // @ts-ignore
                  isoLangs[media.original_language]?.name
                : media.original_language}
            </Text>
          </View>
        ) : null}

        {isTvExtended(media) && (
          <View className="flex-row items-center space-x-2 px-4">
            <Ionicons name="bookmark" size={18} color={Colors.stone[100]} />
            <Text className="text-green-100">
              <Text className="text-green-100">{media.status}</Text>
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default NewMediaCardInfo;
