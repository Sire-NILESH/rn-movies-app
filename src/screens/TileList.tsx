import { View, Pressable } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { Colors } from "../utils/Colors";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import {
  idToGenresMapped,
  isMovieArray,
  showErrorAlert,
} from "../utils/helpers/helper";
import GenereModal from "../components/GenereModal";
import { getGenreMediasProps } from "../utils/requests";
import GenreTags from "../components/GenreTags";
import TilesRenderedView from "../components/TilesRenderedView";
import NothingToShow from "../components/NothingToShow";

const TileListScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [showGenresModal, setShowGenresModal] = useState<boolean>(false);
  const [userSelectedGenres, setUserSelectedGenres] = useState<number[]>([]);
  const { navigation, route } = props;
  // @ts-ignore
  const {
    title,
    medias: mediaList,
    genreId,
    currentMediaType,
  }: {
    title: string;
    medias: MovieMedia[] | TvMedia[];
    genreId?: number;
    noMoreLoads?: boolean;
    currentMediaType?: MediaTypes;
  } = route.params;

  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>(
    mediaList ? mediaList : []
  );
  const [loadingNewMedias, setLoadingNewMedias] = useState<boolean>(false);
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);

  const currentListType: MediaTypes = currentMediaType
    ? currentMediaType
    : isMovieArray(mediaList)
    ? "movie"
    : "tv";

  // Loading Data
  useEffect(() => {
    async function loadMedias() {
      if (!genreId) return;

      setLoadingNewMedias(true);
      try {
        const genreMediasToFetch =
          userSelectedGenres.length > 0 ? userSelectedGenres : [genreId];

        const moreMedias = await getGenreMediasProps(
          genreMediasToFetch,
          currentListType,
          pageNumber
        );
        // if we received some data, then page exists.
        if (moreMedias.length > 0) {
          setMedias((prev) => [...prev, ...moreMedias]);
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
  }, [mediaList, pageNumber, userSelectedGenres, getGenreMediasProps, genreId]);

  const onShowGenresModal = () => {
    setShowGenresModal(true);
  };

  const onCloseGenresModal = () => {
    setShowGenresModal(false);
  };

  const onCloseWithConfirmGenresModal = (genresIdList: number[]) => {
    if (genresIdList.length > 0) {
      setUserSelectedGenres(genresIdList);
      setPageNumber(1);
      setMedias([]);
      setShowGenresModal(false);
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
      headerTitle:
        userSelectedGenres.length === 1
          ? idToGenresMapped[String(userSelectedGenres[0])]
          : userSelectedGenres.length > 1
          ? "Custom Genres"
          : title,
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
  }, [userSelectedGenres]);

  // Footer loader component
  // const RenderLoader = () => {
  //   return loadingNewMedias ? (
  //     <View className="w-full justify-center my-2">
  //       <ActivityIndicator size="small" color="#aaa" />
  //     </View>
  //   ) : null;
  // };

  return (
    <View className="flex-1 bg-tertiary">
      {/* Genre Tags Scrollable Row on top, if user selected some genres */}
      {userSelectedGenres?.length > 1 ? (
        <View className="w-full">
          <GenreTags
            genreIdList={userSelectedGenres}
            backgroundType="colored"
          />
        </View>
      ) : null}

      {/* Genres selection modal for user */}
      {showGenresModal ? (
        <GenereModal
          mediaListType={currentListType}
          isVisible={showGenresModal}
          onClose={onCloseGenresModal}
          closeWithConfirm={onCloseWithConfirmGenresModal}
        />
      ) : null}

      {/* Tiles */}
      <View className="flex-1 items-center relative">
        {error && medias.length === 0 ? (
          <NothingToShow title={"Something went wrong while loading content"} />
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
          !loadingNewMedias && <NothingToShow />
        )}
      </View>
    </View>
  );
};

export default TileListScreen;
