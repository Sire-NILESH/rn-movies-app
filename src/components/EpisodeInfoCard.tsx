import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Episode, EpisodeCastAndCrew } from "../../types/typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import { dateFormatter } from "../utils/helpers/helper";

interface IProps {
  episode: Episode;
  castandCrewModalHandler: (castAndCrew: EpisodeCastAndCrew) => void;
}

const EpisodeInfoCard: React.FC<IProps> = ({
  episode,
  castandCrewModalHandler,
}) => {
  const directedBy = episode.crew
    .filter((c) => c.job === "Director")
    .slice(0, 5)
    .map((c) => c.name)
    .join(",  ");

  return (
    <View className="py-3 justify-between">
      {/* TITLE AND EPISODE NUMBER */}
      <View className="flex-row items-center mx-3 space-x-2 mb-3">
        <Text className="ml-2 text-text_highLight w-[90%]">
          <Text className="text-xl font-semibold">{`EP ${episode.episode_number}: ${episode.name}`}</Text>
        </Text>
      </View>

      <View className="flex-row items-center space-x-4">
        {/* IMAGE CARD */}
        <View
          className="ml-4 rounded-xl border border-stone-800 overflow-hidden"
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
                <Text className="text-text_primary"> / 10</Text>
              </Text>
            </View>
          </View>

          <View>
            <DataElement
              text={"Episode " + String(episode.episode_number)}
              iconName="list"
            />
          </View>

          {episode.runtime ? (
            <View>
              <DataElement
                text={`${episode.runtime} minutes`}
                iconName="time"
              />
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
        <Text className="text-text_tertiary text-sm">
          {episode.overview.length > 0
            ? episode.overview
            : "Overview unavailable"}
        </Text>
      </View>

      {/* DIRECTOR */}
      <View className="px-4 pt-3">
        <Text className="text-text_tertiary mb-1">Directed by:</Text>
        <Text className="text-text_highLight text-base font-semibold">
          {directedBy.length > 0 ? directedBy : "--"}
        </Text>
      </View>

      {/* GUEST APPEARANCE */}
      <View className="px-4 pt-3">
        <Text className="text-text_tertiary mb-1">Guest appearances:</Text>
        <Text
          className="text-text_highLight text-sm font-semibold"
          style={{ lineHeight: 24 }}
        >
          {episode.guest_stars?.length > 0
            ? episode.guest_stars
                .slice(0, 5)
                .map((g) => g.name)
                .join(",  ")
                .concat(episode.guest_stars?.length > 5 ? "..." : " ")
            : "--"}
        </Text>

        {/* SHOW MORE BUTTON */}
        <View className="mt-3 w-[150] rounded-lg overflow-hidden">
          <Pressable
            className="px-[1px] items-center justify-center bg-transparent w-[150px] h-[30px]"
            onPress={() =>
              castandCrewModalHandler({
                seasonNumber: episode.season_number,
                episodeNumber: episode.episode_number,
                cast: episode.guest_stars,
                crew: episode.crew,
                episdodeName: episode.name,
              })
            }
            android_ripple={{ color: "#eee" }}
          >
            <View className="flex-row gap-1 items-center">
              <Ionicons
                name="information-circle"
                size={18}
                color={Colors.stone[400]}
              />
              <Text className="font-bold text-blue-400">Show more credits</Text>
            </View>
          </Pressable>
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
      <Text className="text-text_primary text-sm">{text}</Text>
    </View>
  );
}
