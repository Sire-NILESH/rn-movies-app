import React, { useState, useCallback } from "react";
import { View, Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import YoutubeIframe from "react-native-youtube-iframe";
import { Trailer } from "../../types/typings";

const dimensionsForScreen = Dimensions.get("screen");

interface IProps {
  video: Trailer | null;
  loading: boolean;
}

type YTState = "playing" | "ended" | "paused" | "buffering" | "unstarted";

const YouTubePlayer: React.FC<IProps> = (props) => {
  const [playing, setPlaying] = useState(true);

  const changeScreenOrientation = useCallback(async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }, []);

  // const onStateChanged = useCallback((state: string) => {
  //   // console.log(state);
  //   // if (state === "ended") {
  //   //   setPlaying(false);
  //   // }
  //   if (state === "playing") {
  //     setPlaying(true);
  //   }
  //   // if (state === "paused") {
  //   //   setPlaying(false);
  //   // }
  //   // if (state === "unstarted") {
  //   //   setPlaying(true);
  //   // }
  //   // if (state === "buffering") {
  //   //   setPlaying(true);
  //   // }
  //   // else {
  //   //   setPlaying(true);
  //   // }
  // }, []);

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
                // onChangeState={onStateChanged}
                onFullScreenChange={(status) => {
                  if (status === true) changeScreenOrientation();
                }}
              />
            </View>
          )}
    </View>
  );
};

export default YouTubePlayer;
