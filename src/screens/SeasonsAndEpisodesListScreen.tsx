import { useCallback } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import React, { useLayoutEffect, useState, useRef } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import {
  Episode,
  EpisodeCastAndCrew,
  // IWatchedEpisodesLookup,
  Season,
  SeasonDetails,
} from "../../types/typings";
import { fetchSeasonDetails } from "../utils/requests";
import { Colors } from "../utils/Colors";
import SeasonsHeader from "../components/SeasonsHeader";
import { LinearGradient } from "expo-linear-gradient";
import EpisodeInfoCard from "../components/EpisodeInfoCard";
import NothingToShow from "../components/NothingToShow";
import { dateFormatter, showErrorToast } from "../utils/helpers/helper";
import Loader from "../components/ui/Loader";
import { useQuery } from "./../../node_modules/@tanstack/react-query";
import CastAndCrewModal from "../components/ui/CastAndCrewModal";
import useNavigateTo from "../hooks/useNavigateTo";
import { episodesScreenCacheConfig } from "../config/requestCacheConfig";
import ThemeButton from "../components/ui/ThemeButton";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
// import { getAllWatchedEpisoesOfShowsSeason } from "../storage/database";

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
  // const [watchedEpisodes, setWatchedEpisodes] = useState<
  //   IWatchedEpisodesLookup | undefined
  // >(undefined);
  // const [isLoadingWatchedEps, setIsLoadingWatchedEps] =
  // useState<boolean>(false);
  const [castAndCrewForModal, setcastAndCrewForModal] =
    useState<EpisodeCastAndCrew>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const listRef = useRef<LegacyRef<FlashList<Episode>> | undefined>(null);
  const listRef = useRef<React.LegacyRef<FlashList<Episode>> | undefined>(
    undefined
  );

  function castandCrewModalHandler(castAndCrew: EpisodeCastAndCrew) {
    setIsModalOpen((prev) => (prev === true ? false : true));
    setcastAndCrewForModal(castAndCrew);
  }

  function modalHandler(state: boolean) {
    setIsModalOpen(state);
  }

  const scrollToTopList = () => {
    if (listRef !== undefined) {
      // @ts-ignore
      listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const {
    isLoading: loadingProps,
    data: seasonDetails,
    error: errorLoadingProps,
    status,
  } = useQuery<SeasonDetails>({
    queryKey: ["tv/season", "tv", tvMediaId, selectedSeason?.season_number],
    queryFn: () => fetchSeasonDetails(tvMediaId, selectedSeason?.season_number),
    staleTime: episodesScreenCacheConfig.staleTime,
    cacheTime: episodesScreenCacheConfig.cacheTime,
  });

  function setSelectedSeasonHandler(newSelectedSeason: Season) {
    setSelectedSeason(newSelectedSeason);
  }

  // FETCHING ALL WATCHED EPISODES OF A SEASON IN BULK
  // useEffect(() => {
  //   const loadWatchedEpisodes = async () => {
  //     setIsLoadingWatchedEps(true);
  //     try {
  //       const data = await getAllWatchedEpisoesOfShowsSeason(
  //         tvMediaId,
  //         selectedSeason.id
  //       );

  //       setWatchedEpisodes((_prev) => {
  //         return data.rows._array.reduce((acc, watchedEpisode) => {
  //           acc[watchedEpisode.episodeId] = watchedEpisode;
  //           return acc;
  //         }, {});
  //       });
  //     } catch (err) {
  //       showErrorToast("Something went wrong while loading watched episodes");
  //     }
  //     setIsLoadingWatchedEps(false);
  //   };

  //   loadWatchedEpisodes();
  // }, [selectedSeason]);

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (props) => (
        <SeasonsHeader
          tvMediaId={tvMediaId}
          tvMediaSeasons={tvMediaSeasons}
          selectedSeason={selectedSeason}
          setScrollToTop={scrollToTopList}
          setNewSelectedSeason={setSelectedSeasonHandler}
        />
      ),
    });
  }, [selectedSeason, tvMediaSeasons]);

  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  // Show alert on error
  if (errorLoadingProps && !loadingProps) {
    showErrorToast("Error !", "Something went wrong while loading content.");
  }

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
          />
        );
      }
      return null;
    },
    [seasonDetails]
  );

  /* if the season doesnt have a poster we use the old poster that was used in the MoreInfoScreeen which was passed here as tvMediaPosterPathOld */

  return (
    <>
      <StatusBar animated={true} backgroundColor={Colors.secondary} />

      <View className="flex-1 bg-secondary">
        {/* Loader */}
        {loadingProps ? (
          <View className="h-full z-40">
            <Loader loading={loadingProps} />
          </View>
        ) : null}

        {errorLoadingProps ? (
          <View className="flex-1">
            <NothingToShow
              title="Something went wrong while loading content"
              problemType="error"
            />
          </View>
        ) : status === "success" ? (
          <View className="flex-1">
            <CastAndCrewModal
              isVisible={isModalOpen}
              closeModal={() => {
                setcastAndCrewForModal(undefined);
                modalHandler(false);
              }}
              tvShowName={tvMediaName}
              castAndCrew={castAndCrewForModal}
            />
            <FlashList
              ListHeaderComponent={
                <View className="mb-5">
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
                    <View className="w-[61%] justify-between">
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
                      <Text className="text-text_primary font-bold">
                        Overview:{" "}
                      </Text>
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
              ItemSeparatorComponent={() => (
                <View className="border border-b-stone-800 mx-10 my-4" />
              )}
              renderItem={(episodeObj) => renderItem(episodeObj)}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default SeasonsAndEpisodesListScreen;
