import { IPlaylist, MovieMedia, TvMedia } from "../../types/typings";
import Thumbnail from "./Thumbnail";
import { Text, View, FlatList } from "react-native";
import IconButton from "./ui/IconButton";
import { Colors } from "./../utils/Colors";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDeviceDimensions, isMovieArray } from "../utils/helpers/helper";
import { isMovie } from "./../utils/helpers/helper";
import { getTileListScreenMedias } from "../utils/requests";
import { useEffect } from "react";

interface Props {
  title: string;
  medias: TvMedia[] | MovieMedia[];
  playlist: IPlaylist;
}

function Row({ title, medias, playlist }: Props) {
  return (
    <View className="space-y-1 mb-5">
      <View className="flex-row space-x-4 mb-1">
        <Text className="pl-5 text-sm font-semibold text-text_primary">
          {title}
        </Text>
      </View>

      {isMovieArray(medias)
        ? renderFlatList(medias as MovieMedia[], title, playlist)
        : renderFlatList(medias as TvMedia[], title, playlist)}
    </View>
  );
}

export default Row;

function renderFlatList(
  medias: MovieMedia[] | TvMedia[],
  title: string,
  playlist: IPlaylist
) {
  const navigation = useNavigation();

  // Navigation handler for child components like thumbnail and jumpTo button.
  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  // Calculate and pass the dimensioins from the parent(here) to the thumbnails.
  // So every thumbnail wont have to calculate them separately.
  const windowWidth = getDeviceDimensions("window").width;

  return (
    <>
      {medias && isMovieArray(medias) ? (
        <FlatList
          initialNumToRender={5}
          ListFooterComponent={renderFooterItemFunction(
            medias,
            title,
            playlist,
            navigateTo
          )}
          bounces
          className="pl-2 py-1"
          // className="ml-2 h-32"
          data={medias}
          renderItem={(media) => (
            <View className="ml-1 bg-tertiary rounded-md">
              <Thumbnail
                media={isMovie(media.item) ? media.item : media.item}
                orientation="portrait"
                navigateTo={navigateTo}
                windowWidth={windowWidth}
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
          ListFooterComponent={renderFooterItemFunction(
            medias,
            title,
            playlist,
            navigateTo
          )}
          bounces
          className="px-2 py-1"
          // className="ml-2 h-32"
          data={medias}
          renderItem={(media) => (
            <View className="ml-1 bg-tertiary rounded-md">
              <Thumbnail
                media={isMovie(media.item) ? media.item : media.item}
                orientation="portrait"
                navigateTo={navigateTo}
                windowWidth={windowWidth}
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
  playlist: IPlaylist,
  navigateTo: (screen: string, paramOption: Object) => void
) {
  return (
    <View
      className="w-14 h-14 my-auto rounded-full [elevation: 2] overflow-hidden mx-5"
      style={{ elevation: 2 }}
    >
      <Pressable
        className="w-14 h-14 rounded-full bg-stone-700 items-center justify-center"
        android_ripple={{ color: Colors.tertiary }}
        onPress={() => {
          if (isMovieArray(medias)) {
            navigateTo("Tiles", {
              title,
              playlist,
              currentMediaType: "movie",
            });
          } else {
            {
              navigateTo("Tiles", {
                title,
                playlist,
                currentMediaType: "tv",
              });
            }
          }
        }}
      >
        <IconButton
          name="arrow-forward"
          color={Colors.text_primary}
          size={18}
        ></IconButton>
      </Pressable>
    </View>
  );
}

// `/discover/${mediaType}`, {
//   with_genres: commaSeparatedGenres,
//   page: pageNumber,
// })
