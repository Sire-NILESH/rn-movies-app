import { View, Text, Image } from "react-native";
import React, { useCallback } from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../utils/Colors";
import ThemeButton from "./ui/ThemeButton";
import useNavigateTo from "../hooks/useNavigateTo";
import {
  Episode,
  EpisodeCastAndCrew,
  Season,
  SeasonDetails,
} from "../../types/typings";
import { dateFormatter } from "../utils/helpers/helper";
import EpisodeInfoCard from "./EpisodeInfoCard";

interface IProps {
  tvMediaSeasons: Season[];
  selectedSeason: Season;
  tvMediaPosterPathOld: String;
  tvMediaName: string;
  seasonDetails: SeasonDetails;
  castandCrewModalHandler(castAndCrew: EpisodeCastAndCrew): void;
  listRef: any;
}

const EpisodeList: React.FC<IProps> = ({
  tvMediaSeasons,
  selectedSeason,
  tvMediaPosterPathOld,
  tvMediaName,
  seasonDetails,
  castandCrewModalHandler,
  listRef,
}) => {
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  const renderItem = useCallback(
    (episodeObj: ListRenderItemInfo<Episode>) => {
      if (seasonDetails) {
        return (
          <EpisodeInfoCard
            episode={episodeObj.item}
            seasonId={seasonDetails.id}
            // isWatched={
            //   watchedEpisodes[episodeObj.item.id] !== undefined
            //     ? true
            //     : false
            // }
            castandCrewModalHandler={castandCrewModalHandler}
            navigateTo={navigateTo}
            isLast={
              episodeObj.index === seasonDetails.episodes.length - 1
                ? true
                : false
            }
          />
        );
      }
      return null;
    },
    [seasonDetails]
  );
  //   key={seasonDetails.id}
  return (
    <View className="flex-1">
      <FlashList
        ListHeaderComponent={
          <View className="mb-8">
            <LinearGradient
              colors={[
                // "rgba(147, 51, 234, 0.5)",
                // "rgba(147, 51, 234, 0.3)",
                // Colors.black,
                "rgba(163, 163, 163, 0.5)",
                "rgba(163, 163, 163, 0.3)",
                Colors.black,
                // "rgba(22, 101, 52, 0.5)",
                // "rgba(22, 101, 52, 0.3)",
                // Colors.black,
              ]}
              className="flex-row px-4 pt-4 justify-between items-start mb-5"
            >
              <View
                className="border border-stone-700/40 rounded-lg overflow-hidden"
                style={{ width: "35%", aspectRatio: 2 / 3 }}
              >
                <Image
                  source={
                    tvMediaSeasons[selectedSeason.season_number]?.poster_path
                      ? {
                          uri: `https://image.tmdb.org/t/p/w500${
                            tvMediaSeasons[selectedSeason.season_number]
                              ?.poster_path
                          }`,
                        }
                      : tvMediaPosterPathOld
                      ? {
                          uri: `https://image.tmdb.org/t/p/w500${tvMediaPosterPathOld}`,
                        }
                      : require("../../assets/images/placeholders/posterPlaceHolder.png")
                  }
                  resizeMode="cover" //similar to web, "cover", "contain", etc.
                  style={{ width: "100%", height: "100%" }}
                ></Image>
              </View>
              <View className="w-[59%] justify-between">
                {/* Title */}
                <Text
                  className="text-text_highLight text-2xl font-bold"
                  numberOfLines={3}
                >
                  {tvMediaName}
                </Text>
                <View className="mt-2">
                  <Text className="text-text_secondary text-lg font-semibold">
                    Season{" "}
                    {seasonDetails.season_number === 0
                      ? "Extras"
                      : seasonDetails.season_number}
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center mt-auto">
                  <Text className="text-text_tertiary text">
                    {seasonDetails.episodes.length} Episodes,
                  </Text>
                  <Text className="text-text_tertiary text">
                    {dateFormatter(seasonDetails.air_date)}
                  </Text>
                </View>

                <View className="flex-1 justify-end w-28">
                  <ThemeButton
                    text={"Trailer"}
                    iconName={"md-logo-youtube"}
                    // /tv/{series_id}/season/{season_number}/videos
                    onPressHandler={() => {
                      navigateTo("Trailer", {
                        name: "Trailer Videos",
                        url: `/tv/${seasonDetails.episodes[0].show_id}/season/${seasonDetails.season_number}/videos`,
                        queryParams: {
                          language: "en-US",
                        },
                      });
                    }}
                  />
                </View>
              </View>
            </LinearGradient>

            {/* Overview */}
            {seasonDetails.overview ? (
              <View className="mb-2 px-4 space-y-2">
                <Text className="text-text_primary font-bold">Overview: </Text>
                <Text className="text-text_tertiary text-sm">
                  {seasonDetails.overview}
                </Text>
              </View>
            ) : null}
          </View>
        }
        data={seasonDetails.episodes}
        // @ts-ignore
        ref={listRef}
        keyExtractor={(episode) => String(episode.id)}
        estimatedItemSize={420}
        // ItemSeparatorComponent={() => (
        //   <View className="border border-b-stone-800 mx-10 my-4" />
        // )}
        renderItem={(episodeObj) => renderItem(episodeObj)}
        ListFooterComponent={() => <View className="mt-1 h-0 w-full" />}
      />
    </View>
  );
};

export default EpisodeList;