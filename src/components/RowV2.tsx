import React, { useCallback } from "react";
import { IImgItemSettingsDB, IPlaylist, Media } from "../../types/typings";
import Thumbnail from "./Thumbnail";
import { Text, View, ListRenderItemInfo } from "react-native";
import IconButton from "./ui/IconButton";
import { Colors } from "./../utils/Colors";
import { Pressable } from "react-native";
import { getDeviceDimensions, isMovieArray } from "../utils/helpers/helper";
import { isMovie } from "./../utils/helpers/helper";
import useNavigateTo from "../hooks/useNavigateTo";
import { useThumbnailTextSettingHooks } from "../hooks/reduxHooks";
import { FlashList } from "@shopify/flash-list";
import { ThumbnailTextPermission } from "../config/disableThumbnailText";

interface Props {
  title: string;
  medias: Media[];
  playlist: IPlaylist;
  thumbnailQualitySettings?: IImgItemSettingsDB;
}

// Calculate and pass the dimensions from the parent(here) to the thumbnails.
// So every thumbnail wont have to calculate them separately.
const windowWidth = getDeviceDimensions("window").width;

const rowItemWidth = windowWidth * 0.31 + 4;

function RowV2({ title, medias, playlist, thumbnailQualitySettings }: Props) {
  const { isThumbnailText } = useThumbnailTextSettingHooks();

  return (
    <View className="space-y-1 mb-6">
      <View className="flex-row space-x-4 mb-2">
        <Text className="pl-5 text-sm font-semibold text-text_primary">
          {title}
        </Text>
      </View>

      <View className="">
        {renderFlatList(
          medias,
          title,
          playlist,
          isThumbnailText,
          thumbnailQualitySettings
        )}
      </View>
    </View>
  );
}

export default RowV2;

function renderFlatList(
  medias: Media[],
  title: string,
  playlist: IPlaylist,
  isThumbnailText: ThumbnailTextPermission,
  thumbnailQualitySettings?: IImgItemSettingsDB
) {
  //   const { isThumbnailText } = useThumbnailTextSettingHooks();

  // Navigation handler for child components like thumbnail and jumpTo button.
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  const renderItem = useCallback(
    (media: ListRenderItemInfo<any>) => (
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
    [isThumbnailText]
  );

  return (
    <FlashList
      ListFooterComponent={renderFooterItemFunction(
        medias,
        title,
        playlist,
        navigateTo
      )}
      bounces
      data={medias}
      ListHeaderComponent={() => <View className="pl-2 w-0" />}
      estimatedItemSize={rowItemWidth}
      renderItem={(media) => renderItem(media as any)}
      keyExtractor={(media, i) => {
        return `${media.id}-${i}`;
      }}
      horizontal
      extraData={isThumbnailText}
    />
  );
}

function renderFooterItemFunction(
  medias: any[],
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
