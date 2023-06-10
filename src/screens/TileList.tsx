import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { Colors } from "../utils/Colors";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import {
  IQueryParams,
  IUrlObject,
  MediaTypes,
  MovieMedia,
  TvMedia,
} from "../../types/typings";
import {
  isMovieArray,
  isTvArray,
  showErrorToast,
} from "../utils/helpers/helper";
import { getTileListScreenMedias } from "../utils/requests";
import GenreTags from "../components/GenreTags";
import TilesRenderedView from "../components/TilesRenderedView";
import NothingToShow from "../components/NothingToShow";
import MediaWizardModal from "../components/MediaWizardModal/MediaWizardModal";
import useImageItemSetting from "../hooks/useImageItemSetting";
import FilterTilesButton from "./../components/ui/FilterTilesButton";
import TilesFilterModal from "../components/TilesFilterModal";
import cloneDeep from "lodash.clonedeep";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/ui/Loader";
import { tileScreenCacheConfig } from "../config/requestCacheConfig";

const TileListScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [showGenresModal, setShowGenresModal] = useState<boolean>(false);
  const [userSelectedPlaylists, setUserSelectedPlaylists] = useState<
    IUrlObject[]
  >([]);

  const { navigation, route } = props;
  // @ts-ignore
  const {
    title,
    medias: mediaList,
    playlist: pastPlaylist,
    currentMediaType,
  }: {
    title: string;
    medias: MovieMedia[] | TvMedia[];
    playlist: IUrlObject;
    noMoreLoads?: boolean;
    currentMediaType?: MediaTypes;
  } = route.params;

  const [currentShowingPlaylists, setCurrentShowingPlaylists] = useState<
    IUrlObject[]
  >([pastPlaylist]);

  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>(
    mediaList ? mediaList : []
  );
  const [genreIds, setGenreIds] = useState<number[] | null>();
  const [genreIdsFromFilter, setGenreIdsFromFilter] = useState<
    number[] | null
  >();
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentShowingFilter, setCurrentShowingFilter] =
    useState<IQueryParams>({ page: pageNumber });

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const currentListType: MediaTypes = currentMediaType
    ? currentMediaType
    : isMovieArray(mediaList)
    ? "movie"
    : isTvArray(mediaList)
    ? "tv"
    : "multi";

  // thumbnail images quality
  const { imgItemsSetting: thumbnailQuality } =
    useImageItemSetting("thumbnail");

  const {
    data: moreMedias,
    status,
    refetch,
  } = useQuery({
    queryKey: ["requests", currentShowingPlaylists, currentShowingFilter],
    queryFn: async () =>
      getTileListScreenMedias(currentShowingPlaylists, currentShowingFilter),
    staleTime: tileScreenCacheConfig.staleTime,
    cacheTime: tileScreenCacheConfig.cacheTime,
    enabled: false,
  });

  // Setting the params for the request operation
  useEffect(() => {
    let filters: IQueryParams = {
      page: pageNumber,
    };

    const playlistsToFetch =
      userSelectedPlaylists.length > 0 ? userSelectedPlaylists : [pastPlaylist];

    setCurrentShowingPlaylists(playlistsToFetch);

    setCurrentShowingFilter(filters);
  }, [pageNumber, userSelectedPlaylists]);

  // Request operation
  useEffect(() => {
    refetch();
  }, [currentShowingPlaylists, currentShowingFilter]);

  // Request operation result management
  useEffect(() => {
    // if reached the end of the pages.
    if (pageNumber === moreMedias?.total_pages) {
      setBlockNewLoads(true);
    }

    // if we received some data, then page exists
    if (status === "success" && moreMedias?.medias.length > 0) {
      setMedias((prev) => [...prev, ...moreMedias?.medias]);
    }
  }, [moreMedias]);

  const onCloseGenresModal = () => {
    setShowGenresModal(false);
  };

  const onCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const onToggleGenresModal = () => {
    setShowGenresModal((prev) => (prev === true ? false : true));
  };

  const onToggleFilterModal = () => {
    setShowFilterModal((prev) => (prev === true ? false : true));
  };

  const onCloseWithConfirmGenresModal = (
    playlists: IUrlObject[]
    // langAndYearFilter: IQueryParams
  ) => {
    if (playlists.length > 0) {
      const playlistDeepCpy: IUrlObject[] = cloneDeep(playlists);

      // setError(null);
      setUserSelectedPlaylists(playlistDeepCpy);
      setPageNumber(1);
      setMedias([]);
      setGenreIdsFromFilter([]);
      setShowGenresModal(false);

      const genrelist = playlists[0].queryParams.with_genres
        ?.split(",")
        .map((g) => Number(g));

      if (genrelist && genrelist?.length > 0) {
        setGenreIds(genrelist);
      }

      // since we now have new set of playlists, we can unblock new loads
      setBlockNewLoads(false);
    }
  };

  const onCloseWithConfirmFiltersModal = (playlists: IUrlObject[]) => {
    if (playlists.length > 0) {
      // setError(null);
      setUserSelectedPlaylists(playlists);
      setPageNumber(1);
      setMedias([]);
      setShowFilterModal(false);

      const genrelist = playlists[0].queryParams.with_genres
        ?.split(",")
        .map((g) => Number(g));

      if (genrelist && genrelist?.length > 0) {
        setGenreIdsFromFilter(genrelist);
      } else {
        setGenreIdsFromFilter([]);
      }

      // since we now have new set of playlists, we can unblock new loads
      setBlockNewLoads(false);
    }
  };

  const loadMoreItem = useCallback(() => {
    // Increase the page number by 1 only if the load new medias is enabled
    if (!blockNewLoads && status !== "loading") {
      setPageNumber((prev) => prev + 1);
    }
  }, [blockNewLoads, status]);

  useEffect(() => {
    // Show alert on error
    if (status === "error") {
      showErrorToast("Error !", "Something went wrong while loading content.");
    }
  }, [showErrorToast, status]);

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.tertiary,
      },
      headerTitle: (props) => {
        return (
          <View className="w-full max-w-[225]">
            <Text
              className="text-xl"
              style={{
                color: props.tintColor,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {userSelectedPlaylists.length === 1
                ? userSelectedPlaylists[0].name
                : userSelectedPlaylists.length > 1
                ? "Custom Genres"
                : title}
            </Text>
          </View>
        );
      },
      headerRight: (props) => (
        <View className="flex-row items-center space-x-1 mr-2">
          {/* Search button */}
          <HeaderSearchButton
            searchCategory={currentMediaType ? currentMediaType : "multi"}
          />
          {/* Genre select button */}
          {route.path !== "Search" && (
            <View className="overflow-hidden rounded-full ">
              <Pressable
                className="p-2 items-center justify-center"
                android_ripple={{ color: "#eee" }}
                onPress={onToggleGenresModal}
              >
                <MaterialCommunityIcons
                  name="drama-masks"
                  size={24}
                  color={Colors.gray[50]}
                />
              </Pressable>
            </View>
          )}
        </View>
      ),
    });
  }, [userSelectedPlaylists]);

  return (
    <View className="relative flex-1 bg-secondary min-w-full w-full items-center">
      {/* Genre Tags Scrollable Row on top, if user selected some genres */}
      {genreIds && genreIds.length > 1 ? (
        <View className="w-full h-10 justify-start">
          <GenreTags genreIdList={genreIds} backgroundType="colored" />
        </View>
      ) : genreIdsFromFilter && genreIdsFromFilter.length > 0 ? (
        <View className="w-full h-10 justify-start">
          <GenreTags
            genreIdList={genreIdsFromFilter}
            backgroundType="colored"
          />
        </View>
      ) : null}

      {/* Genres selection modal for user */}
      {showGenresModal ? (
        <MediaWizardModal
          mediaListType={currentListType}
          isVisible={showGenresModal}
          onClose={onCloseGenresModal}
          closeWithConfirm={onCloseWithConfirmGenresModal}
        />
      ) : null}

      {showFilterModal ? (
        <TilesFilterModal
          isVisible={showFilterModal}
          closeModal={onCloseFilterModal}
          mediaListType={currentListType}
          // playlist={currentShowingPlaylists[0]}
          playlist={
            userSelectedPlaylists.length > 0
              ? userSelectedPlaylists[0]
              : pastPlaylist
          }
          closeWithConfirm={onCloseWithConfirmFiltersModal}
        />
      ) : null}

      {/* Tiles */}
      <View className="flex-1 w-full px-2">
        {status === "loading" && medias.length === 0 ? (
          //  Loader
          <Loader loading={status === "loading" ? true : false} />
        ) : null}

        {status === "error" && medias.length === 0 ? (
          <NothingToShow
            title={"Something went wrong while loading content"}
            problemType="error"
          />
        ) : medias?.length > 0 ? (
          <>
            <TilesRenderedView
              medias={medias}
              loadingNewMedias={status === "loading" ? true : false}
              loadMoreItem={loadMoreItem}
              thumbnailQuality={thumbnailQuality}
            />

            {currentShowingPlaylists[0].additionalFiltersUnsupported ? null : (
              <FilterTilesButton onShowFilterModal={onToggleFilterModal} />
            )}
          </>
        ) : status !== "loading" ? (
          <>
            <NothingToShow problemType="nothing" />

            {currentShowingPlaylists[0].additionalFiltersUnsupported ? null : (
              <FilterTilesButton onShowFilterModal={onToggleFilterModal} />
            )}
          </>
        ) : null}
      </View>
    </View>
  );
};

export default TileListScreen;
