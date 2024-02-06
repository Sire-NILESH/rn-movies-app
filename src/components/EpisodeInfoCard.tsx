import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Episode, EpisodeCastAndCrew } from "../../types/typings";
import { Colors } from "../utils/Colors";
import { dateFormatter } from "../utils/helpers/helper";
import ThemeButton from "./ui/ThemeButton";
import { Image } from "expo-image";
// import WatchedEpisodeButton from "./ui/WatchedEpisodeButton";

interface IProps {
  episode: Episode;
  seasonId: number;
  // isWatched: boolean;
  castandCrewModalHandler: (castAndCrew: EpisodeCastAndCrew) => void;
  navigateTo: (screen: string, paramOption: Object) => void;
  isLast: boolean;
}

const EpisodeInfoCard: React.FC<IProps> = ({
  episode,
  // seasonId,
  // isWatched,
  castandCrewModalHandler,
  navigateTo,
  isLast,
}) => {
  const directedBy = episode.crew
    .filter((c) => c.job === "Director")
    .slice(0, 5)
    .map((c) => c.name)
    .join(",  ");

  return (
    <View className="justify-between">
      {/* TITLE AND EPISODE NUMBER */}
      <View className="flex-row items-center mx-3 space-x-2 mb-3">
        <Text className="ml-2 text-text_highLight w-[90%] text-xl font-semibold ">
          {episode.episode_number}
          <Text className="text-text_dark">{" | "}</Text>
          {episode.name}
        </Text>
      </View>

      <View className="flex-row items-center space-x-4">
        {/* IMAGE CARD */}
        <View
          className="ml-4 rounded-xl border border-stone-800 overflow-hidden"
          style={{ width: "60%", aspectRatio: 16 / 9 }}
        >
          <Image
            key={episode.id}
            source={
              episode.still_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w500${episode.still_path}`,
                  }
                : require("../../assets/images/placeholders/posterPlaceHolderLandscape.png")
            }
            contentFit="cover"
            transition={100}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        {/* STATS */}
        <View className="items-start space-y-3">
          <View>
            <View className="flex-row space-x-2 items-center">
              <Ionicons name={"star"} color={Colors.yellow[400]} size={16} />
              <Text
                className="text-green-500 text-sm font-semibold"
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
              text={episode.air_date ? dateFormatter(episode.air_date) : "--"}
              iconName="calendar"
            />
          </View>
        </View>
      </View>

      {/* OVERVIEW */}
      <View className="px-4 pt-3">
        <Text className="text-text_dark text-sm">
          {episode.overview.length > 0
            ? episode.overview
            : "Overview unavailable"}
        </Text>
      </View>

      {/* DIRECTOR */}
      <View className="px-4 pt-3">
        <Text className="text-text_tertiary mb-1">Directed by:</Text>
        <Text className="text-text_highLight text-base font-normal">
          {directedBy.length > 0 ? directedBy : "--"}
        </Text>
      </View>

      {/* GUEST APPEARANCE */}
      <View className="px-4 pt-3">
        <Text className="text-text_tertiary mb-1">Guest appearances:</Text>
        <Text
          className="text-text_highLight text-sm font-normal"
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

        <View className="mt-3 flex-row space-x-2">
          {/* WATCHED BUTTON */}
          {/* <View className="w-28 justify-end">
            <WatchedEpisodeButton
              isWatched={isWatched}
              episode={episode}
              seasonId={seasonId}
            />
          </View> */}

          {/* TRAILER BUTTON */}
          <View className="">
            <ThemeButton
              text={"Trailer"}
              iconName={"logo-youtube"}
              onPressHandler={() => {
                navigateTo("Trailer", {
                  name: "Trailer Videos",
                  url: `/tv/${episode.show_id}/season/${episode.season_number}/episode/${episode.episode_number}/videos`,
                  queryParams: {
                    language: "en-US",
                  },
                });
              }}
            />
          </View>

          {/* SHOW MORE BUTTON */}
          <View>
            <ThemeButton
              text={"Credits Info"}
              iconName={"information-circle"}
              onPressHandler={() =>
                castandCrewModalHandler({
                  seasonNumber: episode.season_number,
                  episodeNumber: episode.episode_number,
                  cast: episode.guest_stars,
                  crew: episode.crew,
                  episdodeName: episode.name,
                })
              }
            />
          </View>
        </View>
      </View>

      {/* DIVIDER */}
      {
        <View
          className={`${!isLast ? "border border-b-stone-800" : ""} mx-10 my-6`}
        />
      }
    </View>
  );
};

export default React.memo(EpisodeInfoCard);

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
