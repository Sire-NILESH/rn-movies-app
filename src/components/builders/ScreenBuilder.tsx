import { View } from "react-native";
import {
  IImgItemSettingsDB,
  IPlaylist,
  ScreenTypes,
} from "../../../types/typings";
import Banner from "../Banner";
import NothingToShow from "../NothingToShow";
import Loader from "../ui/Loader";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { sendUrlObjApiRequestV2 } from "../../utils/requests";
import {
  homeScreenPlaylists,
  movieScreenPlaylists,
  tvScreenPlaylists,
} from "../../config/homeScreensPlaylistsConfig";
import { homeScreenCacheConfig } from "../../config/requestCacheConfig";
import Row from "../Row";
import Animated from "react-native-reanimated";

interface IProps {
  screenType: ScreenTypes;
  imgItemsSetting: IImgItemSettingsDB | undefined;
  scrollHandler?: any;
}

function getPlaylistsToFetch(screenType: ScreenTypes) {
  // Get the genre list to fetch depending on the screen type.
  let playlistsToFetch: IPlaylist[];
  switch (screenType) {
    case "tv":
      playlistsToFetch = tvScreenPlaylists;
      break;
    case "movie":
      playlistsToFetch = movieScreenPlaylists;
      break;
    case "homescreen":
      playlistsToFetch = homeScreenPlaylists;
      break;
    default:
      playlistsToFetch = homeScreenPlaylists;
  }

  return playlistsToFetch;
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ScreenBuilder: React.FC<IProps> = ({
  screenType,
  imgItemsSetting,
  scrollHandler,
}) => {
  const playlistsToFetch = getPlaylistsToFetch(screenType);

  const { data: screenProps, status } = useQuery({
    queryKey: ["homeScreens", screenType, playlistsToFetch],
    queryFn: async () => sendUrlObjApiRequestV2(playlistsToFetch),
    staleTime: homeScreenCacheConfig.staleTime,
    cacheTime: homeScreenCacheConfig.cacheTime,
  });

  const getRandomMedia = () => {
    if (screenProps !== undefined) {
      const nonEmptyMedias = screenProps.filter((arr) => arr.length > 0);

      // const top2 = [nonEmptyMedias[0], nonEmptyMedias[1]];

      const row = nonEmptyMedias[randomNumber(0, nonEmptyMedias.length - 1)];

      return row[randomNumber(0, row.length - 1)];
    }
  };

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      <Loader loading={status === "loading" || !imgItemsSetting} />

      {status === "error" ? (
        //   if error, then
        <NothingToShow
          title={"Something went wrong while loading content"}
          problemType="error"
        />
      ) : status === "success" && imgItemsSetting ? (
        //   when no error and props
        <View className="flex-1">
          {screenProps?.length > 0 ? (
            <Animated.ScrollView
              className="space-y-10"
              onScroll={scrollHandler}
              scrollEventThrottle={16}
            >
              <Banner media={getRandomMedia()} />

              <View className="pt-4">
                {playlistsToFetch.map((p, i) => {
                  if (screenProps[i]?.length > 0) {
                    return (
                      <Row
                        key={p.name}
                        title={p.name}
                        medias={screenProps[i]}
                        playlist={p}
                        thumbnailQualitySettings={imgItemsSetting}
                      />
                    );
                  } else null;
                })}
              </View>
            </Animated.ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default ScreenBuilder;
