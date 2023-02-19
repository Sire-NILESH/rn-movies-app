import { View, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Colors } from "../utils/Colors";
import Thumbnail from "../components/Thumbnail";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { isMovieArray } from "../utils/helpers/helper";
import GenereModal from "../components/GenereModal";
import { getMediasProps } from "../utils/requests";
import GenreTags from "../components/GenreTags";

const TileListScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [showGenresModal, setShowGenresModal] = useState<boolean>(false);
  const [userSelectedGenres, setUserSelectedGenres] = useState<number[]>([]);
  const { navigation, route } = props;
  // @ts-ignore
  const {
    title,
    medias: mediaList,
    genreId,
    noMoreLoads,
  }: {
    title: string;
    medias: MovieMedia[] | TvMedia[];
    genreId?: number;
    noMoreLoads?: boolean;
  } = route.params;

  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>(mediaList);
  const [loadingNewMedias, setLoadingNewMedias] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const currentListType: MediaTypes =
    mediaList && isMovieArray(mediaList) ? "movie" : "tv";
  console.log(currentListType);

  useEffect(() => {
    async function loadMedias() {
      if (!genreId) return;
      setLoadingNewMedias(true);
      const genreMediasToFetch =
        userSelectedGenres.length > 0 ? userSelectedGenres : [genreId];
      const moreMedias = await getMediasProps(
        genreMediasToFetch,
        currentListType,
        pageNumber
      );
      setMedias((prev) => [...prev, ...moreMedias]);
      setLoadingNewMedias(false);
    }
    loadMedias();
  }, [mediaList, pageNumber, userSelectedGenres]);

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
    }
  };

  function setUserSelectedGenresHandler(genresIdList: number[]) {
    setUserSelectedGenres(genresIdList);
  }

  // console.log(showGenresModal, "---Tiles screen");

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.stone[900],
      },
      headerTitle: userSelectedGenres.length > 0 ? "Custom Genres" : title,
      headerTitleAlign: "center",
      headerTintColor: Colors.gray[100],
      headerShown: true,
      headerShadowVisible: false,
      headerRight: (props) => (
        <View className="flex-row">
          <HeaderSearchButton />
          {/* <Pressable onPress={() => setShowGenresModal((prev) => !prev)}> */}
          <Pressable onPress={onShowGenresModal}>
            <MaterialCommunityIcons
              name="drama-masks"
              size={24}
              color={Colors.gray[50]}
              style={{ marginRight: 16 }}
            />
          </Pressable>
        </View>
      ),
    });
  }, [userSelectedGenres]);

  return (
    <View className="flex-1 bg-stone-900 px-2 py-2">
      {userSelectedGenres.length > 0 ? (
        <GenreTags genreIdList={userSelectedGenres} />
      ) : null}
      {showGenresModal ? (
        <GenereModal
          mediaListType={currentListType}
          isVisible={showGenresModal}
          onClose={onCloseGenresModal}
          closeWithConfirm={onCloseWithConfirmGenresModal}
        />
      ) : null}
      <View className="flex-1 relative">
        {medias && medias.length > 0 && isMovieArray(medias)
          ? renderFlatList(medias, loadingNewMedias, setPageNumber)
          : renderFlatList(medias, loadingNewMedias, setPageNumber)}
      </View>
    </View>
  );
};

export default TileListScreen;

function renderFlatList(
  medias: any,
  loadingNewMedias: boolean,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
) {
  const loadMoreItem = () => {
    setPageNumber((prev) => prev + 1);
  };

  // Footer loader component
  const renderLoader = () => {
    return loadingNewMedias ? (
      <View className="items-center my-2">
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      bounces
      className="h-32"
      data={medias}
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      renderItem={(media) => (
        <View className="space-x-2">
          <Thumbnail media={media.item} orientation="portrait" />
        </View>
      )}
      keyExtractor={(media) => {
        return String(media.id);
      }}
      numColumns={3}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
    />
  );
}
