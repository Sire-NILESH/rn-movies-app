import { MovieMedia, TvMedia } from "../typings";
import Thumbnail from "./Thumbnail";
import { Text, View, FlatList } from "react-native";
import IconButton from "./ui/IconButton";
import { Colors } from "./../utils/Colors";
import { Pressable } from "react-native";
import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { isMovieArray } from "../utils/helpers/helper";
import { isMovie } from "./../utils/helpers/helper";

interface Props {
  title: string;
  medias: TvMedia[] | MovieMedia[];
  genreIdOfList: number;
}

function Row({ title, medias, genreIdOfList }: Props) {
  const navigation = useNavigation();

  return (
    <View className="space-y-1 mb-5">
      <View className="flex-row space-x-4 mb-1">
        <Text className="pl-5 text-sm font-semibold text-[#e5e5e5]">
          {title}
        </Text>
      </View>

      {isMovieArray(medias)
        ? renderFlatList(medias as MovieMedia[], title, genreIdOfList)
        : renderFlatList(medias as TvMedia[], title, genreIdOfList)}
    </View>
  );
}

export default memo(Row);

function renderFlatList(
  medias: MovieMedia[] | TvMedia[],
  title: string,
  genreId: number
) {
  // const navigation = useNavigation();

  return (
    <>
      {medias && isMovieArray(medias) ? (
        <FlatList
          initialNumToRender={20}
          ListFooterComponent={renderFooterItemFunction(medias, title, genreId)}
          bounces
          className="pl-2 py-1"
          // className="ml-2 h-32"
          data={medias}
          renderItem={(media) => (
            <View className="ml-1">
              <Thumbnail
                media={isMovie(media.item) ? media.item : media.item}
                orientation="portrait"
                // orientation="landscape"
              />
            </View>
          )}
          keyExtractor={(media) => {
            return String(media.id) + String(Math.random() * 20);
          }}
          horizontal
        />
      ) : (
        <FlatList
          initialNumToRender={20}
          ListFooterComponent={renderFooterItemFunction(medias, title, genreId)}
          bounces
          className="px-2 py-1"
          // className="ml-2 h-32"
          data={medias}
          renderItem={(media) => (
            <View className="ml-1">
              <Thumbnail
                media={isMovie(media.item) ? media.item : media.item}
                orientation="portrait"
                // orientation="landscape"
              />
            </View>
          )}
          keyExtractor={(media) => {
            return String(media.id) + String(Math.random() * 20);
          }}
          horizontal
        />
      )}
    </>
  );
}

function renderFooterItemFunction(
  medias: MovieMedia[] | TvMedia[],
  title: string,
  genreId: number
) {
  const navigation = useNavigation();

  return (
    <View
      className="w-14 h-14 my-auto rounded-full [elevation: 2] overflow-hidden mx-5"
      style={{ elevation: 2 }}
    >
      <Pressable
        className="w-14 h-14 rounded-full bg-stone-700 items-center justify-center"
        android_ripple={{ color: Colors.stone[600] }}
        onPress={() => {
          if (isMovieArray(medias)) {
            // @ts-ignore
            navigation.navigate("Tiles", { title, genreId });
          } else {
            {
              // @ts-ignore
              navigation.navigate("Tiles", { title, genreId });
            }
          }
        }}
      >
        <IconButton
          name="arrow-forward"
          color={Colors.gray[100]}
          size={18}
        ></IconButton>
      </Pressable>
    </View>
  );
}
