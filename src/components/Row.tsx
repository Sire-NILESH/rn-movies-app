// import { DocumentData } from 'firebase/firestore'
// import { FlatList } from "react-native-gesture-handler";
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
  // When using firebase
  // movies: Movie[] | DocumentData[]
  medias: TvMedia[] | MovieMedia[];
  genreIdOfList: number;
}

function Row({ title, medias, genreIdOfList }: Props) {
  // const handleClick = (direction: string) => {};
  const navigation = useNavigation();

  return (
    <View className="h-40 space-y-1 mb-5">
      <View className="flex-row space-x-4 mb-2">
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
  const navigation = useNavigation();

  return (
    <>
      {medias && isMovieArray(medias) ? (
        <FlatList
          ListFooterComponent={renderFooterItemFunction(medias, title, genreId)}
          bounces
          className="ml-2 h-32"
          data={medias}
          renderItem={(media) => (
            <Thumbnail
              media={isMovie(media.item) ? media.item : media.item}
              orientation="landscape"
            />
          )}
          keyExtractor={(media) => {
            return String(media.id) + String(Math.random() * 20);
          }}
          horizontal
        />
      ) : (
        <FlatList
          ListFooterComponent={renderFooterItemFunction(medias, title, genreId)}
          bounces
          className="ml-2 h-32"
          data={medias}
          renderItem={(media) => (
            <Thumbnail
              media={isMovie(media.item) ? media.item : media.item}
              orientation="landscape"
            />
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
      className="w-14 h-14 my-auto rounded-full [elevation: 2] overflow-hidden mx-2"
      style={{ elevation: 2 }}
    >
      <Pressable
        className="w-14 h-14 rounded-full bg-stone-700 items-center justify-center"
        android_ripple={{ color: Colors.stone[600] }}
        onPress={() => {
          if (isMovieArray(medias)) {
            // @ts-ignore
            navigation.navigate("Tiles", { title, medias, genreId });
          } else {
            {
              // @ts-ignore
              navigation.navigate("Tiles", { title, medias, genreId });
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
