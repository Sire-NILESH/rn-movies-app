import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { StatusBar, View } from "react-native";
import { EpisodeCastAndCrew, SeasonDetails } from "../../types/typings";
import EpisodeList from "../components/EpisodeList";
import NothingToShow from "../components/NothingToShow";
import CastAndCrewModal from "../components/ui/CastAndCrewModal";
import Loader from "../components/ui/Loader";
import { episodesScreenCacheConfig } from "../config/requestCacheConfig";
import { ITopTabEpisodeListScreenProps } from "../library/NavigatorScreenProps/TopTabEpisodeListScreenProps";
import { Colors } from "../utils/Colors";
import { showErrorToast } from "../utils/helpers/helper";
import { fetchSeasonDetails } from "../utils/requests";

const TopTabEpisodeListScreen: React.FC<ITopTabEpisodeListScreenProps> = ({
  // name,
  // navigation,
  // route,
  tvMediaId,
  season: selectedSeason,
  tvMediaSeasons,
  tvMediaPosterPathOld,
  tvMediaName,
  // castandCrewModalHandler,
}) => {
  // const [watchedEpisodes, setWatchedEpisodes] = useState<
  //   IWatchedEpisodesLookup | undefined
  // >(undefined);
  // const [isLoadingWatchedEps, setIsLoadingWatchedEps] =
  // useState<boolean>(false);
  const [castAndCrewForModal, setcastAndCrewForModal] =
    useState<EpisodeCastAndCrew>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const listRef = useRef<LegacyRef<FlashList<Episode>> | undefined>(null);

  function castandCrewModalHandler(castAndCrew: EpisodeCastAndCrew) {
    setIsModalOpen((prev) => (prev === true ? false : true));
    setcastAndCrewForModal(castAndCrew);
  }

  function modalHandler(state: boolean) {
    setIsModalOpen(state);
  }

  // const scrollToTopList = () => {
  //   if (listRef !== undefined) {
  //     // @ts-ignore
  //     listRef.current?.scrollToOffset({ offset: 0 });
  //     // listRef.current?.scrollToOffset({ animated: true, offset: 0 });
  //   }
  // };

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

  // React.useEffect(() => {
  //   scrollToTopList();
  // }, [seasonDetails]);

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

  // Show alert on error
  if (errorLoadingProps && !loadingProps) {
    showErrorToast("Error !", "Something went wrong while loading content.");
  }

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
            <EpisodeList
              seasonDetails={seasonDetails}
              selectedSeason={selectedSeason}
              tvMediaName={tvMediaName}
              tvMediaPosterPathOld={tvMediaPosterPathOld}
              tvMediaSeasons={tvMediaSeasons}
              castandCrewModalHandler={castandCrewModalHandler}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default TopTabEpisodeListScreen;
