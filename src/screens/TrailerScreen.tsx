import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { View, FlatList, Dimensions } from "react-native";
import { useLogging } from "../hooks/useLogging";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Trailer } from "../typings";
import { fetchTrailers } from "../utils/requests";
import NothingToShow from "../components/NothingToShow";
import Loader from "./../components/ui/Loader";
import YouTubePlayer from "./../components/YouTubePlayer";
import TrailerVideoThumbnail from "../components/TrailerVideoThumbnail";

const screenDimensions = Dimensions.get("screen");

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
            (v: Trailer, i: number) => v.site === "YouTube" && i < 5
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

  // setting the 1st video to be default on first load.
  // const setFirstVideo = useCallback(() => {
  //   if (videos.length > 0) setSelectedVideo(videos[0]);
  // }, [videos]);

  console.log("1st video", selectedVideo);

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
    <View className="flex-1 bg-stone-900">
      {/* Loader */}
      <Loader loading={loading} />

      {/* if error show nothing*/}
      {(error || videos.length === 0) && !loading ? (
        <NothingToShow />
      ) : (
        <View className="flex-1 justify-start mb-[340px]">
          {/* <View className="flex-1 justify-start mb-[330px]"> */}
          <YouTubePlayer video={selectedVideo} loading={loading} />
          {/* <View className="w-full h-[80px] bg-stone-900 [elevation:5]">
            <View className="w-[90%] px-4 py-4 space-y-1 justify-center">
              <Text className="text-gray-50">{selectedVideo?.name}</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-400 space-x-4">
                  {selectedVideo?.type}
                  {" • "}
                </Text>
                <Text className=" text-gray-400 text-xs">
                  {selectedVideo?.published_at.substring(0, 10)}
                </Text>
              </View>
            </View>
          </View> */}
        </View>
      )}

      {videos.length > 0 && !error ? (
        // <View className="flex-1 px-4">
        <FlatList
          data={videos}
          initialNumToRender={3}
          className="bg-zinc-900/40 py-4 px-2 "
          contentContainerStyle={{
            justifyContent: "flex-start",
            // alignItems: "flex-start",
          }}
          keyExtractor={(itemObj) => itemObj.id}
          // ListHeaderComponent={

          // }
          renderItem={(vObj) => {
            return (
              <TrailerCardView
                video={vObj.item}
                onPressHandler={onPressSetVideoHandler}
              />
            );
          }}
        />
      ) : // </View>

      // <View>
      //   <TrailerVideoThumbnail
      //     video={videos[2]}
      //     onPressHandler={onPressSetVideoHandler}
      //     orientation="landscape"
      //   />
      // </View>
      null}
    </View>
  );
};

export default TrailerScreen;

function TrailerCardView(props: {
  video: Trailer;
  onPressHandler: (video: Trailer) => void;
}) {
  return (
    <View className="mb-3">
      <TrailerVideoThumbnail
        video={props.video}
        onPressHandler={props.onPressHandler}
        // orientation="portrait"
        orientation="landscape"
      />
    </View>
  );
}
