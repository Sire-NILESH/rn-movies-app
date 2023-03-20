import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, FlatList, Dimensions, Text } from "react-native";
import { useLogging } from "../hooks/useLogging";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Trailer } from "../typings";
import { fetchTrailers } from "../utils/requests";
import NothingToShow from "../components/NothingToShow";
import Loader from "./../components/ui/Loader";
import YouTubePlayer from "./../components/YouTubePlayer";
import TrailerVideoThumbnail from "../components/TrailerVideoThumbnail";
import { Colors } from "../utils/Colors";

const screenDimensions = Dimensions.get("screen");
const dimensionsForWindow = Dimensions.get("window");

const TrailerScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging("About Screen");
  const { navigation, route } = props;

  // @ts-ignore
  const { mediaType, mediaId } = route.params;

  const [videos, setVideos] = useState<Trailer[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Trailer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setErrro] = useState<Error | null>(null);

  useEffect(() => {
    async function loadVideos() {
      if (!mediaType || !mediaId) return;

      setLoading(true);

      try {
        const videosData = await fetchTrailers(mediaId, mediaType);
        console.log(videosData?.props);
        // if we received some data,
        if (videosData?.props.length > 0) {
          videosData?.props.filter(
            (v: Trailer, i: number) => v.site === "YouTube"
          );
          setVideos([...videosData?.props]);
          setSelectedVideo(videosData?.props[0]);
        }
      } catch (err) {
        setErrro(err as Error);
      }
      setLoading(false);
    }

    loadVideos();
  }, [mediaType, mediaId]);

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
      {error && !loading && (
        <NothingToShow title={"Something went wrong while loading videos"} />
      )}

      {/* When no videos available for that media */}
      {videos.length == 0 && !error && !loading && (
        <NothingToShow title="No Videos available" />
      )}

      {/* When some video is available, show the YT player */}
      {videos.length > 0 && (
        <View className="justify-start">
          <YouTubePlayer video={selectedVideo} loading={loading} />
        </View>
      )}

      {/* Title and date Dock */}
      {!loading && !error && videos.length > 0 && (
        <View className="w-full bg-tertiary px-4 space-y-1 justify-center items-start py-5 [elevation:5]">
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
      {videos.length > 0 && !error ? (
        <FlatList
          data={videos}
          initialNumToRender={3}
          className="pt-4 px-2"
          style={{
            backgroundColor: Colors.primary,
            // backgroundColor: "rgb(4, 16, 9)",
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
                // style={{ backgroundColor: "rgb(4, 16, 9)" }}
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
