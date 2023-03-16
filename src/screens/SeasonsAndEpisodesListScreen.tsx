import { View, Text, Pressable, Image, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { useLogging } from "../hooks/useLogging";
import { Season, SeasonDetails } from "../typings";
import useFetcher from "../hooks/useFetcher";
import { fetchSeasonDetails } from "../utils/requests";
import { Colors } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import SeasonsHeader from "../components/SeasonsHeader";
import { LinearGradient } from "expo-linear-gradient";
import EpisodeInfoCard from "../components/EpisodeInfoCard";

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
      headerStyle: {
        backgroundColor: Colors.red[600],
      },
      headerLeft: (props) => {
        return (
          <View className="ml-4 mr-2">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={Colors.gray[50]} />
            </Pressable>
          </View>
        );
      },
    });
  }, [selectedSeason, tvMediaSeasons]);

  /* if the season doesnt have a poster we use the old poster that was used in the MoreInfoScreeen which was passed here as tvMediaPosterPathOld */

  return (
    <View className="flex-1 bg-black pb-4">
      <View className="flex-1">
        {seasonDetails && tvMediaSeasons[selectedSeason.season_number] && (
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
                  <View className="w-[55%] space-y-2">
                    {/* Title */}
                    <Text className="text-green-100 text-2xl font-bold">
                      {tvMediaName}
                    </Text>
                    <View className="flex">
                      <Text className="text-stone-200 text-lg font-semibold">
                        Season{" "}
                        {seasonDetails.season_number === 0
                          ? "Extras"
                          : seasonDetails.season_number}
                      </Text>
                      <Text className="text-stone-300 text">
                        Total {seasonDetails.episodes.length} episodes
                      </Text>
                    </View>
                  </View>
                </LinearGradient>

                {/* Overview */}
                {seasonDetails.overview ? (
                  <View className="mb-10 px-4 space-y-2">
                    <Text className="text-gray-200">Overview: </Text>
                    <Text className="text-gray-200 text-xs">
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
        )}
      </View>
    </View>
  );
};

export default SeasonsAndEpisodesListScreen;
