import { View, Text, Image } from "react-native";
import React from "react";
import { Episode } from "../../types/typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import { dateFormatter } from "../utils/helpers/helper";

interface IProps {
  episode: Episode;
}

const EpisodeInfoCard: React.FC<IProps> = ({ episode }) => {
  return (
    <View className="py-3 justify-between">
      {/* TITLE AND EPISODE NUMBER */}
      <View className="flex-row items-center mx-3 space-x-2 mb-3">
        <Text className="ml-2 text-text_highLight w-[90%]">
          <Text className="text-xl font-bold">{`EP ${episode.episode_number}: ${episode.name}`}</Text>
        </Text>
      </View>

      <View className="flex-row items-center space-x-2">
        {/* IMAGE CARD */}
        <View
          className="mx-4 rounded-xl border border-stone-800 overflow-hidden"
          style={{ width: "60%", aspectRatio: 16 / 9 }}
        >
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

        {/* STATS */}
        <View className="items-start space-y-3">
          <View>
            <View className="flex-row space-x-2 items-center">
              <Ionicons name={"star"} color={Colors.yellow[400]} size={16} />
              <Text
                className="text-green-500 text-sm"
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
              text={"Ep. " + String(episode.episode_number)}
              iconName="list"
            />
          </View>
          {episode.runtime ? (
            <View>
              <DataElement text={`${episode.runtime} mins`} iconName="time" />
            </View>
          ) : null}
          <View>
            <DataElement
              text={dateFormatter(episode.air_date)}
              iconName="calendar"
            />
          </View>
        </View>
      </View>

      {/* OVERVIEW */}
      <View className="px-4 pt-3">
        <Text className="text-text_tertiary text-xs">
          {episode.overview.length > 0
            ? episode.overview
            : "Overview unavailable"}
        </Text>
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
      <Text className="text-text_primary text-sm">{text}</Text>
    </View>
  );
}
