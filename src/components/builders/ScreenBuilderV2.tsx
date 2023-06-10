import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { IPlaylist, ScreenTypes } from "../../../types/typings";
import Banner from "../Banner";
import Row from "../Row";
import NothingToShow from "../NothingToShow";
import Loader from "../ui/Loader";
import { memo } from "react";
import {
  homeScreenPlaylists,
  movieScreenPlaylists,
  tvScreenPlaylists,
} from "../../config/homeScreensPlaylistsConfig";
import RowAsync from "../RowAsync";
import { sendUrlObjApiRequest } from "../../utils/requests";
import useImageItemSetting from "../../hooks/useImageItemSetting";
import { useQuery } from "@tanstack/react-query";
import { homeScreenCacheConfig } from "../../config/requestCacheConfig";

interface IProps {
  screenType: ScreenTypes;
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
    default:
      playlistsToFetch = homeScreenPlaylists;
  }

  return playlistsToFetch;
}

const ScreenBuilderV2: React.FC<IProps> = ({ screenType }) => {
  const playlistsToFetch = useMemo(() => {
    const result = getPlaylistsToFetch(screenType);
    return result;
  }, []);

  const { imgItemsSetting } = useImageItemSetting("thumbnail");

  const {
    isLoading: loadingProps,
    data: screenProps,
    error: errorLoadingProps,
  } = useQuery({
    queryKey: ["homeScreenFirstRow", playlistsToFetch[0]],
    queryFn: () => sendUrlObjApiRequest([playlistsToFetch[0]], {}),
    staleTime: homeScreenCacheConfig.staleTime,
    cacheTime: homeScreenCacheConfig.cacheTime,
  });

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      <Loader loading={loadingProps} />

      {!loadingProps && errorLoadingProps ? (
        //   if no props then
        <NothingToShow
          title={"Something went wrong while loading content"}
          problemType="error"
        />
      ) : !errorLoadingProps && screenProps && imgItemsSetting ? (
        //   when no error and props
        <View className="flex-1">
          {screenProps ? (
            <ScrollView className="space-y-10">
              {screenProps.length > 0 ? (
                <Banner mediaList={screenProps} />
              ) : null}

              {!loadingProps &&
                playlistsToFetch.map((p, i) => {
                  if (i === 0) {
                    return (
                      <Row
                        key={p.name}
                        title={p.name}
                        medias={screenProps}
                        playlist={p}
                        thumbnailQualitySettings={imgItemsSetting}
                      />
                    );
                  } else {
                    return (
                      <RowAsync
                        key={p.name}
                        title={p.name}
                        playlist={p}
                        thumbnailQualitySettings={imgItemsSetting}
                      />
                    );
                  }
                })}
            </ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default memo(ScreenBuilderV2);
