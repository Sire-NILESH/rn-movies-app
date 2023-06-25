import React, { useCallback } from "react";
import {
  IImgItemSettingsDB,
  IPlaylist,
  MovieMedia,
  TvMedia,
} from "../../types/typings";
import Thumbnail from "./Thumbnail";
import { Text, View, FlatList, ListRenderItemInfo } from "react-native";
import IconButton from "./ui/IconButton";
import { Colors } from "./../utils/Colors";
import { Pressable } from "react-native";
import { getDeviceDimensions, isMovieArray } from "../utils/helpers/helper";
import { isMovie } from "./../utils/helpers/helper";
import useNavigateTo from "../hooks/useNavigateTo";
import { useThumbnailTextSettingHooks } from "../hooks/reduxHooks";

interface Props {
  title: string;
  medias: TvMedia[] | MovieMedia[];
  playlist: IPlaylist;
  thumbnailQualitySettings?: IImgItemSettingsDB;
}

// Calculate and pass the dimensions from the parent(here) to the thumbnails.
// So every thumbnail wont have to calculate them separately.
const windowWidth = getDeviceDimensions("window").width;

const rowItemWidth = windowWidth * 0.31 + 4;

function Row({ title, medias, playlist, thumbnailQualitySettings }: Props) {
  return (
    <View className="space-y-1 mb-5">
      <View className="flex-row space-x-4 mb-1">
        <Text className="pl-5 text-sm font-semibold text-text_primary">
          {title}
        </Text>
      </View>

      {isMovieArray(medias)
        ? renderFlatList(
            medias as MovieMedia[],
            title,
            playlist,
            thumbnailQualitySettings
          )
        : renderFlatList(
            medias as TvMedia[],
            title,
            playlist,
            thumbnailQualitySettings
          )}
    </View>
  );
}

export default Row;

function renderFlatList(
  medias: MovieMedia[] | TvMedia[],
  title: string,
  playlist: IPlaylist,
  thumbnailQualitySettings?: IImgItemSettingsDB
) {
  const { isThumbnailText } = useThumbnailTextSettingHooks();

  // Navigation handler for child components like thumbnail and jumpTo button.
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  const renderItem = useCallback(
    (media: ListRenderItemInfo<MovieMedia | TvMedia>) => (
      <View className="ml-1 bg-tertiary rounded-md">
        <Thumbnail
          media={isMovie(media.item) ? media.item : media.item}
          orientation="portrait"
          navigateTo={navigateTo}
          windowWidth={windowWidth}
          quality={thumbnailQualitySettings?.value}
          imgType="regular"
          disableText={isThumbnailText.disable}
          // orientation="landscape"
        />
      </View>
    ),
    []
  );

  return (
    <>
      {medias && isMovieArray(medias) ? (
        <FlatList
          maxToRenderPerBatch={20}
          initialNumToRender={6}
          ListFooterComponent={renderFooterItemFunction(
            medias,
            title,
            playlist,
            navigateTo
          )}
          bounces
          className="pl-2 py-1"
          data={medias}
          getItemLayout={(_data, index) => {
            return {
              index: index,
              length: rowItemWidth,
              offset: rowItemWidth * index,
            };
          }}
          renderItem={(media) => renderItem(media)}
          keyExtractor={(media, i) => {
            return `${media.id}-${i}`;
          }}
          horizontal
        />
      ) : (
        <FlatList
          maxToRenderPerBatch={20}
          initialNumToRender={6}
          ListFooterComponent={renderFooterItemFunction(
            medias,
            title,
            playlist,
            navigateTo
          )}
          className="px-2 py-1"
          data={medias}
          getItemLayout={(_data, index) => {
            return {
              index: index,
              length: rowItemWidth,
              offset: rowItemWidth * index,
            };
          }}
          renderItem={(media) => renderItem(media)}
          keyExtractor={(media, i) => {
            return `${media.id}-${i}`;
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
