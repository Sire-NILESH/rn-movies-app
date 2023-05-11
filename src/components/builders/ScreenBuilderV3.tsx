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
import { FlatList } from "react-native-gesture-handler";
// import * as SplashScreen from "expo-splash-screen";
// import { useRoute } from "@react-navigation/native";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

interface IProps {
  screenType: ScreenTypes;
  imgItemsSetting: IImgItemSettingsDB | undefined;
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

const ScreenBuilderV3: React.FC<IProps> = ({ screenType, imgItemsSetting }) => {
  // This hook is responsible for loading the screen props and error messages for the Home, TV and Movies screens.
  // const { screenProps, loadingProps, errorLoadingProps } =
  //   useFetchScreenProps(screenType);

  // const route = useRoute();
  // console.log(route);

  // const onLayoutRootView = useCallback(async () => {
  //   if (screenProps && route.name === "Home") {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     console.log("--------------------------------");
  //     await SplashScreen.hideAsync();
  //   }

  // onLayout={onLayoutRootView}
  // }, [screenProps, route.name]);

  // const playlistsToFetch = getPlaylistsToFetch(screenType);
  // console.log(playlistsToFetch); playlistsToFetch.map((p) => p.name)

  // const { imgItemsSetting } = useImageItemSetting("thumbnail");

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

  // if (errorLoadingProps && !loadingProps) {
  //   showErrorAlert();
  // }

  // if (loadingProps) {
  //   return (<View className="flex-1 bg-secondary">
  //   {/* Loader */}
  //   <Loader loading={loadingProps || !imgItemsSetting} /> </View>)
  // }

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
            <ScrollView className="space-y-4">
              {screenProps[0].length > 0 ? (
                <Banner mediaList={screenProps[0]} />
              ) : null}

              {!loadingProps && (
                <FlatList
                  className=""
                  maxToRenderPerBatch={8}
                  initialNumToRender={8}
                  data={playlistsToFetch}
                  keyExtractor={(playlist) => playlist.name}
                  renderItem={(wrappedPlaylist) => {
                    const i = wrappedPlaylist.index;
                    const p = wrappedPlaylist.item;
                    if (screenProps[i].length > 0) {
                      return (
                        <Row
                          key={p.name}
                          title={p.name}
                          medias={screenProps[i]}
                          playlist={p}
                          thumbnailQualitySettings={imgItemsSetting}
                        />
                      );
                    } else return null;
                  }}
                />
              )}

              {/* {!loadingProps &&
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
                })} */}
            </ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default memo(ScreenBuilderV3);
