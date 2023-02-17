import { View, Text, FlatList, Pressable } from "react-native";
import { useLayoutEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Colors } from "../utils/Colors";
import Thumbnail from "../components/Thumbnail";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import { MovieMedia, TvMedia } from "../typings";
import { isMovieArray } from "../utils/helpers/helper";
import GenereModal from "../components/GenereModal";

const TileListScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [showGenresModal, setShowGenresModal] = useState<boolean>(false);
  const [userSelectedGenres, setUserSelectedGenres] = useState<number[]>([]);
  const { navigation, route } = props;
  // @ts-ignore
  const {
    title,
    medias,
    genreId,
  }: { title: string; medias: MovieMedia[] | TvMedia[]; genreId?: number } =
    route.params;

  console.log("tile list screen, selected genres list", userSelectedGenres);
  console.log("genre to show", genreId);

  const onShowGenresModal = () => {
    setShowGenresModal(true);
  };

  const onCloseGenresModal = () => {
    setShowGenresModal(false);
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
      headerTitle: title,
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
  }, []);

  return (
    <View className="flex-1 bg-stone-900 px-2 py-2">
      {showGenresModal ? (
        <GenereModal
          setUserSelectedGenresHandler={setUserSelectedGenresHandler}
          isVisible={showGenresModal}
          onClose={onCloseGenresModal}
        />
      ) : null}
      {isMovieArray(medias) ? renderFlatList(medias) : renderFlatList(medias)}
    </View>
  );
};

export default TileListScreen;

function renderFlatList(medias: any) {
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
    />
  );
}
