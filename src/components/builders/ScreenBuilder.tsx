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
import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { sendUrlObjApiRequestV2 } from "../../utils/requests";
import {
  homeScreenPlaylists,
  movieScreenPlaylists,
  tvScreenPlaylists,
} from "../../config/screenGenresConfig";

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
    default:
      playlistsToFetch = homeScreenPlaylists;
  }

  return playlistsToFetch;
}

const ScreenBuilder: React.FC<IProps> = ({ screenType, imgItemsSetting }) => {
  const playlistsToFetch = useMemo(() => {
    const result = getPlaylistsToFetch(screenType);
    return result;
  }, []);

  const {
    isLoading: loadingProps,
    data: screenProps,
    error: errorLoadingProps,
  } = useQuery({
    queryKey: ["homeScreens", screenType, playlistsToFetch],
    queryFn: () => sendUrlObjApiRequestV2([...playlistsToFetch], {}),
    staleTime: 1000 * 60 * 60 * 24, //24hours
  });

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      <Loader loading={loadingProps || !imgItemsSetting} />

      {!loadingProps && !screenProps && !imgItemsSetting ? (
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
              {screenProps[0].length > 0 ? (
                <Banner mediaList={screenProps[0]} />
              ) : null}

              {!loadingProps &&
                playlistsToFetch.map((p, i) => {
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
            </ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default memo(ScreenBuilder);
