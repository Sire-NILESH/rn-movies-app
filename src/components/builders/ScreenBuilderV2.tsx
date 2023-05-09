import React, { useState, useMemo } from "react";
import { View, ScrollView, FlatList } from "react-native";
import {
  IGenresToShowHomeScreen,
  IPlaylist,
  MovieMedia,
  ScreenTypes,
  TvMedia,
} from "../../../types/typings";
import Banner from "../Banner";
import Row from "../Row";
import NothingToShow from "../NothingToShow";
import { showErrorAlert } from "../../utils/helpers/helper";
import useFetchScreenProps from "../../hooks/useFetchScreenProps";
import Loader from "../ui/Loader";
import { memo } from "react";
import {
  // homeScreenGenresToShow,
  homeScreenPlaylists,
  // movieScreenGenresToShow,
  movieScreenPlaylists,
  // tvScreenGenresToShow,
  tvScreenPlaylists,
} from "../../config/screenGenresConfig";
import RowAsync from "../RowAsync";
import useFetcher from "../../hooks/useFetcher";
import { sendUrlObjApiRequest } from "../../utils/requests";
import { useRoute } from "@react-navigation/native";
import useImageItemSetting from "../../hooks/useImageItemSetting";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  screenType: ScreenTypes;
}

// interface IState {
//   genreId: number;
//   genreName: string;
//   genreMedias: TvMedia[] | MovieMedia[];
// }

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

  // const params = [playlistsToFetch, {}];
  // const params = [[playlistsToFetch[0].id], playlistsToFetch[0].mediaType, 1];
  // const useFetcherMemo = React.useCallback(() => {
  //   return useFetcher(sendUrlObjApiRequest, [...params]);
  // }, []);

  // const { screenProps, loadingProps, errorLoadingProps } = useFetcherMemo();

  // if (loadingProps || screenProps) {
  //   return <Loader loading={loadingProps} />;
  // }

  const {
    isLoading: loadingProps,
    data: screenProps,
    error: errorLoadingProps,
  } = useQuery({
    queryKey: ["homeScreenFirstRow", playlistsToFetch[0]],
    queryFn: () => sendUrlObjApiRequest([playlistsToFetch[0]], {}),
    staleTime: 1000 * 60 * 60 * 24, //24hours
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
                  //  return <RowAsync key={m.id} title={m.name} mediaGenre={m} />;
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

{
  /* <View className="flex-1">
<ScrollView className="space-y-10">
  {mediaForBanner.length > 0 ? (
    <Banner mediaList={mediaForBanner} />
  ) : null}
  {genresToFetch.map((m: IGenresToShowHomeScreen) => {
    return <RowAsync key={m.id} title={m.name} mediaGenre={m} />;
  })}
</ScrollView>
</View> */
}
