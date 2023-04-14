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
  idToGenresMapped,
  isMovieArray,
  showErrorAlert,
} from "../utils/helpers/helper";
import GenereModal from "../components/GenereModal";
import {
  getGenreMediasProps,
  getTileListScreenMedias,
} from "../utils/requests";
import GenreTags from "../components/GenreTags";
import TilesRenderedView from "../components/TilesRenderedView";
import NothingToShow from "../components/NothingToShow";
import MediaWizardModal from "../components/MediaWizardModal";

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
    playlist?: IUrlObject;
    noMoreLoads?: boolean;
    currentMediaType?: MediaTypes;
  } = route.params;

  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>(
    mediaList ? mediaList : []
  );
  const [langAndYearFilter, setLangAndYearFilter] =
    useState<IQueryParams | null>();
  const [loadingNewMedias, setLoadingNewMedias] = useState<boolean>(false);
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);

  const currentListType: MediaTypes = currentMediaType
    ? currentMediaType
    : isMovieArray(mediaList)
    ? "movie"
    : "tv";

  // const filters: IQueryParams = { page: pageNumber };

  // Loading Data
  useEffect(() => {
    async function loadMedias() {
      if (!pastPlaylist) return;

      let filters: IQueryParams = {
        page: pageNumber,
        // primary_release_year: langAndYearFilter?.primary_release_year,
        // with_original_language: langAndYearFilter?.with_original_language,
      };

      // only discover url supports language filter
      // if (langAndYearFilter && pastPlaylist.url.startsWith("/discover")) {
      //   filters = {
      //     ...filters,
      //     with_original_language: langAndYearFilter.with_original_language,
      //   };
      // }

      console.log(filters);

      setLoadingNewMedias(true);
      try {
        const playlistsToFetch =
          userSelectedPlaylists.length > 0
            ? userSelectedPlaylists
            : [pastPlaylist];

        // prepare the filters
        playlistsToFetch.map((p) => {
          const currentQueryParams = p.queryParams;

          // language filter
          currentQueryParams.with_original_language === undefined &&
          langAndYearFilter?.with_original_language
            ? (currentQueryParams.with_original_language =
                langAndYearFilter?.with_original_language)
            : null;

          // release year filter
          currentQueryParams.primary_release_year === undefined &&
          langAndYearFilter?.primary_release_year
            ? (currentQueryParams.primary_release_year =
                langAndYearFilter?.primary_release_year)
            : null;

          return p;
        });

        const moreMedias = await getTileListScreenMedias(
          playlistsToFetch,
          filters
        );
        // if we received some data, then page exists.
        if (moreMedias.medias.length > 0) {
          setMedias((prev) => [...prev, ...moreMedias.medias]);
        }
        // else, no more pages to fetch. Block any further new loads.
        else {
          setBlockNewLoads(true);
        }
      } catch (err) {
        setBlockNewLoads(true);
        setError(err as Error);
      }
      setLoadingNewMedias(false);
    }
    loadMedias();
  }, [mediaList, pageNumber, userSelectedPlaylists]);
  // }, [mediaList, pageNumber, userSelectedPlaylists, pastPlaylist]);

  const onShowGenresModal = () => {
    setLangAndYearFilter({});
    setShowGenresModal(true);
  };

  const onCloseGenresModal = () => {
    setShowGenresModal(false);
  };

  const onCloseWithConfirmGenresModal = (
    playlists: IUrlObject[],
    langAndYearFilter: IQueryParams
  ) => {
    if (playlists.length > 0) {
      setError(null);
      setUserSelectedPlaylists(playlists);
      setPageNumber(1);
      setMedias([]);
      setShowGenresModal(false);
      // set the year and lang filter
      setLangAndYearFilter(langAndYearFilter);
      // since we now have new set of Genres, we can unblock new loads
      setBlockNewLoads(false);
    }
  };

  useEffect(() => {
    // Show alert on error
    if (error && !loadingNewMedias) {
      showErrorAlert("Something went wrong while loading content.");
    }
  }, [showErrorAlert, error, loadingNewMedias]);

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => {
        return (
          <Text
            className="text-xl"
            style={{ color: props.tintColor }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {userSelectedPlaylists.length === 1
              ? userSelectedPlaylists[0].name
              : userSelectedPlaylists.length > 1
              ? "Custom Genres"
              : title}
          </Text>
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
                onPress={onShowGenresModal}
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

  // Footer loader component
  // const RenderLoader = () => {
  //   return loadingNewMedias ? (
  //     <View className="w-full justify-center my-2">
  //       <ActivityIndicator size="small" color="#aaa" />
  //     </View>
  //   ) : null;
  // };

  return (
    <View className="flex-1 bg-secondary min-w-full w-full items-center">
      {/* Genre Tags Scrollable Row on top, if user selected some genres */}
      {userSelectedPlaylists?.length > 1 ? (
        <View className="w-full">
          <GenreTags
            genreNames={userSelectedPlaylists}
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
      ) : // <GenereModal
      //   mediaListType={currentListType}
      //   isVisible={showGenresModal}
      //   onClose={onCloseGenresModal}
      //   closeWithConfirm={onCloseWithConfirmGenresModal}
      // />
      null}

      {/* Tiles */}
      <View className="flex-1 relative w-full px-2">
        {error && medias.length === 0 ? (
          <NothingToShow
            title={"Something went wrong while loading content"}
            problemType="error"
          />
        ) : medias?.length > 0 ? (
          <>
            <TilesRenderedView
              medias={medias}
              loadingNewMedias={loadingNewMedias}
              setPageNumber={setPageNumber}
              blockNewLoads={blockNewLoads}
            />
            {/* <RenderLoader /> */}
          </>
        ) : (
          !loadingNewMedias && <NothingToShow problemType="nothing" />
        )}
      </View>
    </View>
  );
};

export default TileListScreen;
