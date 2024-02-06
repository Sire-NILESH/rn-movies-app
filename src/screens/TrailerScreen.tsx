import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { View, Text, StatusBar } from "react-native";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { IUrlObject, Trailer } from "../../types/typings";
import { fetchTrailers } from "../utils/requests";
import NothingToShow from "../components/NothingToShow";
import Loader from "./../components/ui/Loader";
import YouTubePlayer from "./../components/YouTubePlayer";
import TrailerVideoThumbnail from "../components/TrailerVideoThumbnail";
import { Colors } from "../utils/Colors";
import { useQuery } from "./../../node_modules/@tanstack/react-query";
import { trailerScreenCacheConfig } from "../config/requestCacheConfig";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";

const TrailerScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  const trailerReq = route.params as IUrlObject;

  const [selectedVideo, setSelectedVideo] = useState<Trailer | null>(null);

  const {
    isLoading: loading,
    data: videos,
    isError: error,
    error: err,
    status,
  } = useQuery({
    queryKey: ["trailer", trailerReq],
    queryFn: () => fetchTrailers(trailerReq),
    staleTime: trailerScreenCacheConfig.staleTime,
    cacheTime: trailerScreenCacheConfig.cacheTime,
  });

  useEffect(() => {
    if (videos && videos.length > 0) {
      setSelectedVideo(videos[0]);
    }
  }, [videos]);

  const onPressSetVideoHandler = (video: Trailer) => {
    setSelectedVideo(video);
  };

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Trailers",
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    });
  }, []);

  const renderItem = useCallback((vObj: ListRenderItemInfo<Trailer>) => {
    return (
      <View className="mb-3 mx-2">
        <TrailerVideoThumbnail
          video={vObj.item}
          onPressHandler={onPressSetVideoHandler}
        />
      </View>
    );
  }, []);

  return (
    <>
      <StatusBar animated={true} backgroundColor={Colors.primary} />
      <View className="flex-1 bg-secondary">
        {/* Loader */}
        <Loader loading={loading} />

        {/* if error show nothing*/}
        {(err as Error) && (
          <NothingToShow
            title={"Something went wrong while loading videos"}
            problemType="error"
          />
        )}

        {/* When no videos available for that media */}
        {videos && videos?.length === 0 && (
          <NothingToShow title="No Videos available" problemType="nothing" />
        )}

        {/* All videos list */}
        {videos && videos.length > 0 && status === "success" ? (
          <>
            {/* YT Player */}
            <View className="" style={{ width: "100%", aspectRatio: 16 / 9 }}>
              <YouTubePlayer video={selectedVideo} />
            </View>

            {/* Title and date Dock */}
            <View className="w-full bg-primary px-4 space-y-1 justify-center items-start py-5 border-b border-b-neutral-900">
              <Text className="text-text_primary font-bold" numberOfLines={3}>
                {selectedVideo?.name}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-text_dark space-x-4">
                  {selectedVideo?.type}
                  {" • "}
                </Text>
                <Text className=" text-text_dark text-xs">
                  {selectedVideo?.published_at.substring(0, 10)}
                </Text>
              </View>
            </View>

            <View className="flex-1 bg-primary">
              <FlashList
                data={videos}
                estimatedItemSize={200}
                ListHeaderComponent={() => <View className="pt-3" />}
                // contentContainerStyle={{ paddingVertical: 4 }}
                keyExtractor={(itemObj) => itemObj.id}
                renderItem={(vObj) => renderItem(vObj)}
                ListFooterComponent={() => <View className="my-3" />}
              />
            </View>
          </>
        ) : null}
      </View>
    </>
  );
};

export default TrailerScreen;
