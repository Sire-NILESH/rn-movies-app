import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { IUrlObject, Trailer } from "../../types/typings";
import { fetchTrailers } from "../utils/requests";
import NothingToShow from "../components/NothingToShow";
import Loader from "./../components/ui/Loader";
import YouTubePlayer from "./../components/YouTubePlayer";
import TrailerVideoThumbnail from "../components/TrailerVideoThumbnail";
import { Colors } from "../utils/Colors";
import { useQuery } from "./../../node_modules/@tanstack/react-query";

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
    staleTime: 1000 * 60 * 60 * 24, //24hours
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
    });
  }, []);

  return (
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

      {/* When some video is available, show the YT player */}
      {!error && videos && videos.length > 0 && status === "success" && (
        <View className="justify-start">
          <YouTubePlayer video={selectedVideo} />
        </View>
      )}

      {/* Title and date Dock */}
      {!loading && !error && videos && videos.length > 0 && (
        <View className="w-full bg-tertiary px-4 space-y-1 justify-center items-start py-5 [elevation:5] border-b border-b-neutral-800">
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
      )}

      {/* All videos list */}
      {videos && videos.length > 0 && !error ? (
        <FlatList
          data={videos}
          initialNumToRender={5}
          className="pt-4 px-2"
          style={{
            backgroundColor: Colors.primary,
          }}
          contentContainerStyle={{
            justifyContent: "flex-start",
          }}
          keyExtractor={(itemObj) => itemObj.id}
          ListFooterComponent={() => {
            return (
              <View
                className="h-2 w-full"
                style={{ backgroundColor: Colors.primary }}
              ></View>
            );
          }}
          renderItem={(vObj) => {
            return (
              <TrailerCardView
                video={vObj.item}
                onPressHandler={onPressSetVideoHandler}
              />
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default TrailerScreen;

function TrailerCardView(props: {
  video: Trailer;
  onPressHandler: (video: Trailer) => void;
}) {
  return (
    <View className="mb-3 mx-1">
      <TrailerVideoThumbnail
        video={props.video}
        onPressHandler={props.onPressHandler}
      />
    </View>
  );
}
