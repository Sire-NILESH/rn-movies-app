import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback } from "react";
import { ListRenderItemInfo, Pressable, Text, View } from "react-native";
import {
  IImgItemSettingsDB,
  IPlaylist,
  Media,
  MovieMedia,
  TvMedia,
} from "../../types/typings";
import { ThumbnailTextPermission } from "../config/disableThumbnailText";
import { useThumbnailTextSettingHooks } from "../hooks/reduxHooks";
import useNavigateTo from "../hooks/useNavigateTo";
import { Colors } from "../utils/Colors";
import {
  getDeviceDimensions,
  isMovie,
  isMovieArray,
} from "../utils/helpers/helper";
import Thumbnail from "./Thumbnail";
import IconButton from "./ui/IconButton";

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

function Row({ title, medias, playlist, thumbnailQualitySettings }: Props) {
  const { isThumbnailText } = useThumbnailTextSettingHooks();

  // Navigation handler for child components like thumbnail and jumpTo button.
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  return (
    <View className="space-y-1 mb-6">
      <View className="flex-row space-x-4 mb-1 items-center">
        <Text className="pl-5 text-sm font-semibold text-text_primary">
          {title}
        </Text>
        <View className="h-6 w-6 rounded-full overflow-hidden">
          <Pressable
            className="flex-1 items-center justify-center"
            android_ripple={{ color: "#eee" }}
            onPress={() => {
              if (isMovieArray(medias as MovieMedia[] | TvMedia[])) {
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
            <MaterialIcons
              name="arrow-forward-ios"
              size={12}
              color={Colors.neutral[100]}
            />
          </Pressable>
        </View>
      </View>

      <View className="">
        {
          <RenderList
            medias={medias}
            title={title}
            playlist={playlist}
            isThumbnailText={isThumbnailText}
            navigateTo={navigateTo}
            thumbnailQualitySettings={thumbnailQualitySettings}
          />
        }
      </View>
    </View>
  );
}

export default Row;

interface IRenderList {
  medias: Media[];
  title: string;
  playlist: IPlaylist;
  isThumbnailText: ThumbnailTextPermission;
  navigateTo: (screen: string, paramOption: Object) => void;
  thumbnailQualitySettings?: IImgItemSettingsDB;
}

function RenderList({
  medias,
  title,
  playlist,
  isThumbnailText,
  navigateTo,
  thumbnailQualitySettings,
}: IRenderList) {
  //   const { isThumbnailText } = useThumbnailTextSettingHooks();

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
      ListFooterComponent={
        <RenderFooterItemFunction
          medias={medias}
          title={title}
          playlist={playlist}
          navigateTo={navigateTo}
        />
      }
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

function RenderFooterItemFunction({
  medias,
  title,
  playlist,
  navigateTo,
}: {
  medias: any[];
  title: string;
  playlist: IPlaylist;
  navigateTo: (screen: string, paramOption: Object) => void;
}) {
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
