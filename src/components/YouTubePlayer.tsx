import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import YoutubeIframe from "react-native-youtube-iframe";
import { Trailer } from "../../types/typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";

const dimensionsForScreen = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    height: 200,
    width: 100,
    borderRadius: 10,
    margin: 10,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});

interface IProps {
  video: Trailer | null;
  loading: boolean;
}

const YouTubePlayer: React.FC<IProps> = (props) => {
  const [playing, setPlaying] = useState(false);
  // const [ytError, setYterror] = useState<Error | null>(null);

  const changeScreenOrientation = useCallback(async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }, []);

  // useEffect(() => {
  //   setYterror(null);
  // }, []);

  // const setYtErrorHandler = (err: string) => {
  //   console.log("actual YT error", err);
  //   const errMessage =
  //     err === "embed_not_allowed"
  //       ? "The uploader must have not made this video available in your counttry"
  //       : "Something went wrong while playing this video";
  //   setYterror(() => new Error(errMessage));
  // };

  const onStateChanged = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
    if (state === "playing") {
      setPlaying(true);
    }
    if (state === "paused") {
      setPlaying(false);
    }
  }, []);

  // console.log("from yt player", props.video);
  // console.log(props.video?.key && !ytError ? true : false);
  // console.log("props.video?.key", props.video?.key);
  // console.log("ytError", ytError);
  // console.log(props.video?.key && ytError ? true : false);

  return (
    <View
      className=""
      style={{
        width: "100%",
        aspectRatio: 16 / 9,
        zIndex: 0,
      }}
    >
      {props.loading
        ? null
        : props.video?.key && (
            <View className="justify-center">
              <YoutubeIframe
                height={(dimensionsForScreen.width * 9) / 16}
                width={dimensionsForScreen.width}
                play={playing}
                videoId={props.video.key}
                onChangeState={onStateChanged}
                onFullScreenChange={(status) => {
                  if (status === true) changeScreenOrientation();
                }}
                // onError={(err) => {
                //   setYtErrorHandler(err);
                // }}
              />
            </View>
          )}

      {/* {ytError && (
        <View className="flex-row space-x-4 items-center justify-center h-full w-full px-10">
          <View className="rounded-full border-2 border-stone-400 h-[45] w-[45] items-center justify-center">
            <Ionicons name="md-alert" size={36} color={Colors.stone[400]} />
          </View>
          <View>
            <Text className="font-bold text-text_primary">
              Video Unavailable
            </Text>
            <Text className="text-sm text-text_dark">{ytError?.message}</Text>
          </View>
        </View>
      )} */}
    </View>
  );
};

export default YouTubePlayer;
