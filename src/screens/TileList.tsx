import { View, Pressable } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Colors } from "../utils/Colors";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { isMovieArray } from "../utils/helpers/helper";
import GenereModal from "../components/GenereModal";
import { getGenreMediasProps } from "../utils/requests";
import GenreTags from "../components/GenreTags";

import TilesRenderedView from "../components/TilesRenderedView";

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

  // const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>(mediaList);
  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>(
    mediaList ? mediaList : []
  );
  const [loadingNewMedias, setLoadingNewMedias] = useState<boolean>(false);
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const currentListType: MediaTypes = currentMediaType
    ? currentMediaType
    : isMovieArray(mediaList)
    ? "movie"
    : "tv";
  // const currentListType: MediaTypes =
  //   mediaList && isMovieArray(mediaList) ? "movie" : "tv";

  // Loading Data
  useEffect(() => {
    async function loadMedias() {
      if (!genreId) return;

      setLoadingNewMedias(true);
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
      setLoadingNewMedias(false);
    }
    loadMedias();
  }, [mediaList, pageNumber, userSelectedGenres, getGenreMediasProps, genreId]);

  // console.log(medias);
  // console.log("media length", medias.length);

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

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: userSelectedGenres.length > 0 ? "Custom Genres" : title,
      // ? `Custom Genres ${currentMediaType === "tv" ? "TV shows" : "Movies"}`
      // : `${title} ${currentMediaType === "tv" ? "TV shows" : "Movies"}`,
      headerRight: (props) => (
        <View className="flex-row">
          {/* Search button */}
          <HeaderSearchButton />
          {/* Genre select button */}
          {route.path !== "Search" && (
            <Pressable onPress={onShowGenresModal}>
              <MaterialCommunityIcons
                name="drama-masks"
                size={24}
                color={Colors.gray[50]}
                style={{ marginRight: 16 }}
              />
            </Pressable>
          )}
        </View>
      ),
    });
  }, [userSelectedGenres]);

  return (
    <View className="flex-1 bg-stone-900">
      {/* Genre Tags Scrollable Row on top, if user selected some genres */}
      {userSelectedGenres?.length > 0 ? (
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
        {medias?.length > 0 ? (
          <TilesRenderedView
            medias={medias}
            loadingNewMedias={loadingNewMedias}
            setPageNumber={setPageNumber}
            blockNewLoads={blockNewLoads}
          />
        ) : null}
      </View>
    </View>
  );
};

export default TileListScreen;
