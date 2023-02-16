import { View, Text, FlatList } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Colors } from "../utils/Colors";
import Thumbnail from "../components/Thumbnail";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";
import { MovieMedia, TvMedia } from "../typings";
import { isMovieArray } from "../utils/helpers/helper";

const TileListScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  const { title, medias }: { title: string; medias: MovieMedia[] | TvMedia[] } =
    route.params;

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
      headerRight: (props) => <HeaderSearchButton />,
    });
  }, []);

  return (
    <View className="flex-1 bg-stone-900 px-2 py-2">
      {isMovieArray(medias) ? renderFlatList(medias) : renderFlatList(medias)}
      {/* <FlatList
        bounces
        className="h-32"
        data={medias}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        renderItem={(movie) => (
          <View className="space-x-2">
            <Thumbnail media={movie.item} orientation="portrait" />
          </View>
        )}
        keyExtractor={(movie) => {
          return String(movie.id);
        }}
        numColumns={3}
      /> */}
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
