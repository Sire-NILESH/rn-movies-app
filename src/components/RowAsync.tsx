import {
  IGenresToShowHomeScreen,
  IImageQuality,
  IImgItemSettingsDB,
  IPlaylist,
  MovieMedia,
  TvMedia,
} from "../../types/typings";
import { Text, View, FlatList } from "react-native";
import IconButton from "./ui/IconButton";
import { Colors } from "./../utils/Colors";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDeviceDimensions, isMovieArray } from "../utils/helpers/helper";
import { isMovie } from "./../utils/helpers/helper";
import { sendUrlObjApiRequest } from "../utils/requests";
import useFetcher from "../hooks/useFetcher";
import React, { memo } from "react";
import ThumbnailSkeleton from "./ThumbnailSkeleton";
import ThumbnailMemoised from "./ThumbnailMemoised";
import Thumbnail from "./Thumbnail";
// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "./../../node_modules/@tanstack/react-query";

interface Props {
  title: string;
  // mediaGenre: IGenresToShowHomeScreen;
  playlist: IPlaylist;
  thumbnailQualitySettings?: IImgItemSettingsDB;
}

// Calculate and pass the dimensioins from the parent(here) to the thumbnails.
// So every thumbnail wont have to calculate them separately.
const windowWidth = getDeviceDimensions("window").width;

const rowItemWidth = windowWidth * 0.31 + 4;
const rowItemHeight = ((windowWidth * 0.31 + 4) * 3) / 2;

function RowAsync({ title, playlist, thumbnailQualitySettings }: Props) {
  // const params = [[playlist]];
  // const { defaultImgQuality } = useDefaultImageQualityHooks();
  // const { imgItemsSetting } = useImageItemSetting("thumbnail");

  // const params = [[mediaGenre.id], mediaGenre.mediaType, 1];
  // const useFetcherMemo = React.useCallback(() => {
  //   return useFetcher(sendUrlObjApiRequest, [...params]);
  // }, []);

  // const {
  //   screenProps: medias,
  //   loadingProps,
  //   errorLoadingProps,
  // } = useFetcherMemo();

  const {
    isLoading: loadingProps,
    data: medias,
    error: errorLoadingProps,
  } = useQuery({
    queryKey: [`row-${title}`, [{ ...playlist }]],
    queryFn: () => sendUrlObjApiRequest([playlist]),
    staleTime: 1000 * 60 * 60 * 24, //24hours
  });

  if (loadingProps || errorLoadingProps) {
    return (
      <View
        className=""
        style={{
          height: rowItemHeight + 28,
        }}
      />
    );
  }

  return (
    <View
      className="space-y-1 mb-5"
      style={{
        height: rowItemHeight + 28,
      }}
    >
      <View className="mb-1">
        <Text className="pl-5 text-sm font-semibold text-text_primary">
          {title}
        </Text>
      </View>
      {isMovieArray(medias)
        ? renderFlatList(
            medias as MovieMedia[],
            title,
            playlist,
            // loadingProps,
            thumbnailQualitySettings
          )
        : renderFlatList(
            medias as TvMedia[],
            title,
            playlist,
            // loadingProps,
            thumbnailQualitySettings
          )}
    </View>
  );
}

// ) : null}

// export default RowAsync;
export default memo(RowAsync);

function renderFlatList(
  medias: MovieMedia[] | TvMedia[],
  title: string,
  playlist: IPlaylist,
  // isLoading: boolean,
  defaultImgQuality?: IImgItemSettingsDB
) {
  const navigation = useNavigation();

  // Navigation handler for child components like thumbnail and jumpTo button.
  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  return (
    <>
      {medias && isMovieArray(medias) ? (
        <FlatList
          maxToRenderPerBatch={4}
          initialNumToRender={4}
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
          getItemLayout={(_data, index) => {
            return {
              index: index,
              length: rowItemWidth,
              offset: rowItemWidth + index,
            };
          }}
          renderItem={(media) => (
            <View
              className="ml-1"
              // style={{
              //   height: rowItemHeight,
              // }}
            >
              <ThumbnailMemoised
                media={isMovie(media.item) ? media.item : media.item}
                orientation="portrait"
                navigateTo={navigateTo}
                windowWidth={windowWidth}
                imgType="regular"
                quality={defaultImgQuality?.value}
                // orientation="landscape"
              />
            </View>
          )}
          keyExtractor={(media) => {
            return String(media.id) + String(Math.random() * 1);
          }}
          horizontal
        />
      ) : (
        <FlatList
          maxToRenderPerBatch={4}
          initialNumToRender={4}
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
          getItemLayout={(_data, index) => {
            return {
              index: index,
              length: rowItemWidth,
              offset: rowItemWidth + index,
            };
          }}
          renderItem={(media) => (
            <View
              className="ml-1"
              // style={{
              //   height: rowItemHeight,
              // }}
            >
              {/* <ThumbnailMemoised */}
              <Thumbnail
                media={isMovie(media.item) ? media.item : media.item}
                orientation="portrait"
                navigateTo={navigateTo}
                windowWidth={windowWidth}
                imgType="regular"
                quality={defaultImgQuality?.value}
                // orientation="landscape"
              />
            </View>
          )}
          keyExtractor={(media) => {
            return String(media.id);
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
