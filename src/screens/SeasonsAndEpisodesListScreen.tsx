import { View, Text, Pressable, Image, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { useLogging } from "../hooks/useLogging";
import { Season, SeasonDetails } from "../../types/typings";
import useFetcher from "../hooks/useFetcher";
import REQUESTS, { fetchSeasonDetails } from "../utils/requests";
import { Colors } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import SeasonsHeader from "../components/SeasonsHeader";
import { LinearGradient } from "expo-linear-gradient";
import EpisodeInfoCard from "../components/EpisodeInfoCard";
import NothingToShow from "../components/NothingToShow";
import { dateFormatter, showErrorAlert } from "../utils/helpers/helper";
import Loader from "../components/ui/Loader";

const SeasonsAndEpisodesListScreen: React.FunctionComponent<
  IStackScreenProps
> = (props) => {
  const [logging] = useLogging("Contact Screen");
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
    screenProps: seasonDetails,
    errorLoadingProps,
    loadingProps,
  }: {
    screenProps: SeasonDetails;
    errorLoadingProps: Error | null;
    loadingProps: boolean;
  } = useFetcher(fetchSeasonDetails, [
    tvMediaId,
    selectedSeason?.season_number,
  ]);

  function setSelectedSeasonHandler(newSelectedSeason: Season) {
    setSelectedSeason(newSelectedSeason);
  }

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      // headerTitle: tvMediaName,
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
    <View className="flex-1 bg-secondary pb-4">
      {/* Loader */}
      {loadingProps && (
        <View className="h-full z-40">
          <Loader loading={loadingProps} />
        </View>
      )}

      {errorLoadingProps ? (
        <View className="flex-1">
          <NothingToShow title="Something went wrong while loading content" />
        </View>
      ) : (
        /* {seasonDetails && tvMediaSeasons[selectedSeason.season_number] && ( */
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
                    className="flex-row px-4 pt-4 justify-between items-start mb-10"
                  >
                    {/* Season Poster  h-[200] w-[133] */}
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
                            : require("../../assets/images/placeholders/posterPlaceHolder.webp")
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
                        {/* <Text className="text-text_tertiary text">
                          Has {seasonDetails.episodes.length} episodes
                        </Text> */}

                        {/* <Text className="text-text_tertiary text-xs mt-1">
                          {seasonDetails.air_date}
                        </Text> */}
                      </View>
                      <View className="flex-row space-x-2 items-center mt-auto">
                        <Text className="text-text_tertiary text">
                          {seasonDetails.episodes.length} Episodes,
                        </Text>
                        <Text className="text-text_tertiary text">
                          {dateFormatter(seasonDetails.air_date)}
                          {/* {new Date(seasonDetails.air_date)
                            .toDateString()
                            .split(" ")
                            .splice(1)
                            .join(" ")} */}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  {/* Overview */}
                  {seasonDetails.overview ? (
                    <View className="mb-10 px-4 space-y-2">
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
              keyExtractor={(episode) => String(episode.id)}
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
