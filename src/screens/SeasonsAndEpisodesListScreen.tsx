import { View, Text, Pressable, Image, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { useLogging } from "../hooks/useLogging";
import { Season, SeasonDetails } from "../../types/typings";
import { fetchSeasonDetails } from "../utils/requests";
import { Colors } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import SeasonsHeader from "../components/SeasonsHeader";
import { LinearGradient } from "expo-linear-gradient";
import EpisodeInfoCard from "../components/EpisodeInfoCard";
import NothingToShow from "../components/NothingToShow";
import { dateFormatter, showErrorAlert } from "../utils/helpers/helper";
import Loader from "../components/ui/Loader";
import { useQuery } from "./../../node_modules/@tanstack/react-query";

const SeasonsAndEpisodesListScreen: React.FunctionComponent<
  IStackScreenProps
> = (props) => {
  const { navigation, route } = props;
  // @ts-ignore
  const {
    tvMediaId,
    tvMediaSeasons,
    tvMediaPosterPath: tvMediaPosterPathOld,
    tvMediaName,
  }: {
    tvMediaId: number;
    tvMediaSeasons: Season[];
    tvMediaPosterPath: String;
    tvMediaName: string;
  } = route.params;

  const [selectedSeason, setSelectedSeason] = useState<Season>(
    tvMediaSeasons[0]
  );

  const {
    isLoading: loadingProps,
    data: seasonDetails,
    error: errorLoadingProps,
  } = useQuery<SeasonDetails>({
    queryKey: ["tv/season", "tv", tvMediaId, selectedSeason?.season_number],
    queryFn: () => fetchSeasonDetails(tvMediaId, selectedSeason?.season_number),
    staleTime: 1000 * 60 * 60 * 1, //1hour
  });

  function setSelectedSeasonHandler(newSelectedSeason: Season) {
    setSelectedSeason(newSelectedSeason);
  }

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (props) => (
        <SeasonsHeader
          tvMediaId={tvMediaId}
          tvMediaSeasons={tvMediaSeasons}
          selectedSeason={selectedSeason}
          setNewSelectedSeason={setSelectedSeasonHandler}
        />
      ),
      headerLeft: (props) => {
        return (
          <View className="ml-4 mr-2">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors.text_primary}
              />
            </Pressable>
          </View>
        );
      },
    });
  }, [selectedSeason, tvMediaSeasons]);

  // Show alert on error
  if (errorLoadingProps && !loadingProps) {
    showErrorAlert(`Something went wrong while loading content.`);
  }

  /* if the season doesnt have a poster we use the old poster that was used in the MoreInfoScreeen which was passed here as tvMediaPosterPathOld */

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      {loadingProps && (
        <View className="h-full z-40">
          <Loader loading={loadingProps} />
        </View>
      )}

      {errorLoadingProps ? (
        <View className="flex-1">
          <NothingToShow
            title="Something went wrong while loading content"
            problemType="error"
          />
        </View>
      ) : (
        seasonDetails && (
          <View className="flex-1">
            <FlatList
              ListHeaderComponent={
                <>
                  <LinearGradient
                    colors={[
                      "rgba(22, 101, 52, 0.5)",
                      "rgba(22, 101, 52, 0.3)",
                      "rgba(28, 25, 23, 0.9)",
                      Colors.black,
                    ]}
                    className="flex-row px-4 pt-4 justify-between items-start mb-5"
                  >
                    <View
                      className="border border-stone-800 rounded-md overflow-hidden"
                      style={{ width: 133, aspectRatio: 2 / 3 }}
                    >
                      <Image
                        source={
                          tvMediaSeasons[selectedSeason.season_number]
                            ?.poster_path
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
                    <View className="w-[55%] justify-between">
                      {/* Title */}
                      <Text className="text-text_highLight text-2xl font-bold">
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
                    </View>
                  </LinearGradient>

                  {/* Overview */}
                  {seasonDetails.overview ? (
                    <View className="mb-2 px-4 space-y-2">
                      <Text className="text-text_primary font-bold">
                        Overview:{" "}
                      </Text>
                      <Text className="text-text_tertiary text-xs">
                        {seasonDetails.overview}
                      </Text>
                    </View>
                  ) : null}
                </>
              }
              data={seasonDetails.episodes}
              className=""
              keyExtractor={(episode) => String(episode.id)}
              maxToRenderPerBatch={4}
              initialNumToRender={4}
              ItemSeparatorComponent={() => (
                <View className="border border-b-stone-800 mx-10" />
              )}
              renderItem={(episodeObj) => (
                <EpisodeInfoCard episode={episodeObj.item} />
              )}
            />
          </View>
        )
      )}
    </View>
  );
};

export default SeasonsAndEpisodesListScreen;
