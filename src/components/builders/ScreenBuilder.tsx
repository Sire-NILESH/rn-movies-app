import { View, ScrollView } from "react-native";
import {
  IImgItemSettingsDB,
  IPlaylist,
  ScreenTypes,
} from "../../../types/typings";
import Banner from "../Banner";
import Row from "../Row";
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

interface IProps {
  screenType: ScreenTypes;
  imgItemsSetting: IImgItemSettingsDB | undefined;
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

const staleTime = 1000 * 60 * 60 * 24; //24hours

const ScreenBuilder: React.FC<IProps> = ({ screenType, imgItemsSetting }) => {
  const playlistsToFetch = getPlaylistsToFetch(screenType);

  const { data: screenProps, status } = useQuery({
    queryKey: ["homeScreens", screenType, playlistsToFetch],
    queryFn: async () => sendUrlObjApiRequestV2(playlistsToFetch),
    staleTime: staleTime, //24hours
  });

  const getNonEmptyArray = () => {
    if (screenProps !== undefined) {
      return screenProps.filter((arr) => arr.length > 0)[0];
    }
    return [];
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
          {screenProps ? (
            <ScrollView className="space-y-10">
              <Banner mediaList={getNonEmptyArray()} />

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
            </ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default ScreenBuilder;
