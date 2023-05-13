import { View, Text, Image } from "react-native";
import React from "react";
import { Episode } from "../../types/typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import { dateFormatter } from "../utils/helpers/helper";
import { LinearGradient } from "expo-linear-gradient";

interface IProps {
  episode: Episode;
}

const EpisodeInfoCard: React.FC<IProps> = ({ episode }) => {
  return (
    <LinearGradient
      className="mt-5 mx-3 py-3 rounded-2xl border border-stone-800 justify-between"
      colors={[
        "rgba(28, 25, 23, 0.8)",
        "rgba(41, 37, 36, 1)",
        "rgba(41, 37, 36, 1)",
        "rgba(28, 25, 23, 1)",
        "rgba(28, 25, 23, 0.7)",
        "rgba(0, 0, 0, 1)",
      ]}
      start={{ x: 0.1, y: 0.5 }}
    >
      {/* TITLE AND EPISODE NUMBER */}
      <View className="flex-row items-center mx-3 space-x-2 mb-3">
        <View className="bg-white rounded-full h-8 w-8 items-center justify-center">
          <Text className="text-text_darkest font-bold">
            {episode.episode_number}
          </Text>
        </View>
        <Text className="text-text_highLight w-[90%]">
          <Text className="text-lg">{episode.name}</Text>
        </Text>
      </View>

      {/* IMAGE CARD */}
      <View className="flex-1 " style={{ width: "100%", aspectRatio: 16 / 9 }}>
        <Image
          source={
            episode.still_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${episode.still_path}`,
                }
              : require("../../assets/images/placeholders/posterPlaceHolder.png")
          }
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>

      <View className="flex-1 py-4 space-y-3 justify-center px-4">
        {/* STATS */}
        <View className="flex-row items-center space-x-5">
          <View>
            <View className="flex-row space-x-2 items-center">
              <Ionicons name={"star"} color={Colors.yellow[400]} size={16} />
              <Text
                className="text-green-500 text-xs"
                style={{
                  color:
                    Number(episode.vote_average.toFixed(2)) > 4
                      ? Colors.green[500]
                      : Colors.red[400],
                }}
              >
                {`${episode.vote_average.toFixed(2)}`}
                <Text className="text-text_primary">/10</Text>
              </Text>
            </View>
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
          <Text className="text-text_tertiary text-xs">{episode.overview}</Text>
        </Text>
      </View>
    </LinearGradient>
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
      <Text className="text-text_primary text-xs">{text}</Text>
    </View>
  );
}
