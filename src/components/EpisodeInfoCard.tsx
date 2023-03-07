import { View, Text, Image } from "react-native";
import React from "react";
import { Episode } from "../typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";

interface IProps {
  episode: Episode;
}

const EpisodeInfoCard: React.FC<IProps> = ({ episode }) => {
  return (
    <View className="mt-5 mx-3 justify-between">
      {/* <View className="mt-5 mx-3 flex-1 bg-red-500 max-h-[300]"> */}
      <View className="flex-1 rounded-t-2xl border border-b-0 rounded-b-none border-gray-800">
        <Image
          source={
            episode.still_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${episode.still_path}`,
                }
              : require("../../assets/images/placeholders/posterPlaceHolder.webp")
          }
          className="rounded-2xl rounded-b-none"
          style={{ width: "100%", height: 180, resizeMode: "cover" }}
        />
      </View>
      {/* bg-stone-800/50 */}
      <View
        className="border border-t-0 border-gray-800 flex-1 rounded-2xl rounded-t-none py-4 space-y-3 justify-center px-4"
        style={{ backgroundColor: "rgb(21, 19, 18)" }}
      >
        <View className="flex-row items-center space-x-2">
          <View className="bg-white rounded-full h-8 w-8 items-center justify-center">
            {/* <View className="bg-white rounded-full h-5 w-5 h-8 w-8 items-center justify-center"> */}
            <Text className="text-stone-800 font-bold">
              {episode.episode_number}
            </Text>
          </View>
          <Text className="text-green-100 w-[90%]">
            <Text className="text-green-100 text-lg">{episode.name}</Text>
          </Text>
        </View>

        <Text className="text-green-100">
          <Text className="text-stone-400 text-xs">{episode.overview}</Text>
        </Text>
        <View className="flex-row items-center space-x-5">
          {/* <View className="flex-row space-x-2 items-center">
            <Ionicons name="star" color={Colors.stone[400]} size={16} />
            <Text className="text-green-100 text-xs">
              {episode.vote_average.toFixed(2)}/10
            </Text>
          </View> */}
          <View>
            <DataElement
              text={`${episode.vote_average.toFixed(2)}/10`}
              iconName="star"
            />
          </View>
          <View>
            <DataElement text={episode.air_date} iconName="calendar" />
          </View>
          {episode.runtime ? (
            <View>
              <DataElement text={`${episode.runtime} mins`} iconName="time" />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default EpisodeInfoCard;

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
      <Text className="text-green-100 text-xs">{text}</Text>
    </View>
  );
}
