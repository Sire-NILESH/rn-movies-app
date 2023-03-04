import { View, Text, Image } from "react-native";
import React from "react";
import { MovieMedia, TvMedia, TvMediaExtended } from "../typings";
import { isMovie, isTvExtended } from "../utils/helpers/helper";
import { isoLangs } from "../utils/helpers/isoLangs";

interface IProps {
  media: MovieMedia | TvMedia | TvMediaExtended;
}

const MediaCardInfo: React.FC<IProps> = ({ media }) => {
  return (
    <View className="mt-5 mx-3 flex-row justify-between max-h-[200]">
      <View className="flex-1 rounded-l-2xl">
        <Image
          source={
            media.backdrop_path || media.poster_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${
                    media.backdrop_path || media.poster_path
                  }`,
                }
              : require("../../assets/images/placeholders/posterPlaceHolder.webp")
          }
          className="rounded-l-2xl"
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>
      <View className=" bg-stone-800/50 border border-l-0 border-gray-800 flex-1 rounded-r-2xl py-6 space-y-4 justify-center">
        <Text className="text-green-100/50 px-4">
          Rating:{"  "}
          <Text className="text-green-100">
            {media.vote_average.toFixed(2)}/10
          </Text>
        </Text>
        <Text className="text-green-100/50 px-4">
          Media:{"  "}
          <Text className="text-green-100">
            {isMovie(media) ? "Movie" : "TV"}
          </Text>
        </Text>
        <Text className="text-green-100/50 px-4">
          Release:{"  "}
          <Text className="text-green-100">
            {isMovie(media) ? media.release_date : media.first_air_date}
          </Text>
        </Text>
        {isTvExtended(media) && (
          <Text className="text-green-100/50 px-4">
            Status:{"  "}
            <Text className="text-green-100">{media.status}</Text>
          </Text>
        )}

        {media.original_language ? (
          <Text className="text-green-100/50 px-4">
            Language:{"  "}
            <Text className="text-green-100">
              {/*  @ts-ignore */}
              {isoLangs[media.original_language]?.name
                ? // @ts-ignore
                  isoLangs[media.original_language]?.name
                : media.original_language}
            </Text>
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default MediaCardInfo;
