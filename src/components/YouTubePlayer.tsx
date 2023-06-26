import React, { useState, useCallback, memo } from "react";
import { View, Dimensions, Platform } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import YoutubeIframe from "react-native-youtube-iframe";
import { Trailer } from "../../types/typings";

const dimensionsForScreen = Dimensions.get("screen");

interface IProps {
  video: Trailer | null;
}

// type YTState = "playing" | "ended" | "paused" | "buffering" | "unstarted";

const YouTubePlayer: React.FC<IProps> = (props) => {
  const [playing, setPlaying] = useState<boolean>(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setPlaying(true);
  //   }, 200);

  //   return () => clearTimeout(timer);
  // }, []);

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
      {props.video?.key && (
        <View className="">
          <YoutubeIframe
            height={(dimensionsForScreen.width * 9) / 16}
            width={dimensionsForScreen.width}
            play={playing}
            videoId={props.video.key}
            webViewProps={{
              androidLayerType:
                Platform.OS === "android" && Platform.Version <= 22
                  ? "hardware"
                  : "none",
            }}
            webViewStyle={{ opacity: 0.99 }}
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

export default memo(YouTubePlayer);
