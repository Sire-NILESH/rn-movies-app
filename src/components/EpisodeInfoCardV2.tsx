import { View, Text, Image } from "react-native";
import React from "react";
import { Episode } from "../../types/typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import { dateFormatter } from "../utils/helpers/helper";

interface IProps {
  episode: Episode;
}

const EpisodeInfoCardV2: React.FC<IProps> = ({ episode }) => {
  return (
    <View className="border-y-[1px] border-stone-800 mt-3 mx-3 py-3 justify-between">
      {/* <View className="mt-5 mx-3 flex-1 bg-red-500 max-h-[300]"> */}
      {/* TITLE AND EPISODE NUMBER */}
      <View className="flex-row items-center space-x-2 mb-4">
        <View className="bg-white rounded-full h-8 w-8 items-center justify-center">
          {/* <View className="bg-white rounded-full h-5 w-5 h-8 w-8 items-center justify-center"> */}
          <Text className="text-text_darkest font-bold">
            {episode.episode_number}
          </Text>
        </View>
        <Text className="text-text_highLight w-[90%]">
          <Text className="text-lg">{episode.name}</Text>
        </Text>
      </View>

      {/* IMAGE CARD */}
      <View
        className="flex-1 rounded-xl border border-gray-800 overflow-hidden"
        style={{ width: "100%", aspectRatio: 16 / 9 }}
      >
        <Image
          source={
            episode.still_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${episode.still_path}`,
                }
              : require("../../assets/images/placeholders/posterPlaceHolder.png")
          }
          // className="rounded-2xl rounded-b-none"
          // style={{ width: "100%", height: 180, resizeMode: "cover" }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>
      <View className="flex-1  py-4 space-y-3 justify-center px-2">
        {/* STATS */}
        <View className="flex-row items-center space-x-5">
          <View>
            <DataElement
              text={`${episode.vote_average.toFixed(2)}/10`}
              iconName="star"
            />
          </View>
          <View>
            <DataElement
              text={dateFormatter(episode.air_date)}
              iconName="calendar"
            />
          </View>
          {episode.runtime ? (
            <View>
              <DataElement text={`${episode.runtime} mins`} iconName="time" />
            </View>
          ) : null}
        </View>
        {/* OVERVIEW */}
        <Text className="text-text_highLight">
          <Text className="text-text_dark text-xs">{episode.overview}</Text>
        </Text>
      </View>
    </View>
  );
};

export default EpisodeInfoCardV2;

function DataElement({
  text,
  iconName,
}: {
  text: string;
  iconName: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View className="flex-row space-x-2 items-center">
      <Ionicons name={iconName} color={Colors.stone[400]} size={16} />
      <Text className="text-text_highLight text-xs">{text}</Text>
    </View>
  );
}
