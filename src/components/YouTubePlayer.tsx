import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import YoutubeIframe from "react-native-youtube-iframe";
import { Trailer } from "../typings";

const dimensionsForScreen = Dimensions.get("screen");
const dimensionsForWindow = Dimensions.get("window");

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

// console.log(dimensionsForScreen.width);
import { useHeaderHeight } from "@react-navigation/elements";

const YouTubePlayer: React.FC<IProps> = (props) => {
  const [playing, setPlaying] = useState(false);

  const headerHeight = useHeaderHeight();

  const changeScreenOrientation = useCallback(async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }, []);

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

  const height = dimensionsForWindow.height * 0.3;
  console.log(height);

  // height: 250
  return (
    <View
      className=""
      style={{
        height: height,
        width: "100%",
        zIndex: 0,
      }}
    >
      {props.loading ? (
        <Text className="text-gray-400 text-xl">Loading...</Text>
      ) : props.video ? (
        <View>
          {props.video.key ? (
            <>
              <YoutubeIframe
                height={height}
                width={dimensionsForScreen.width}
                play={playing}
                videoId={props.video.key}
                onChangeState={onStateChanged}
                onFullScreenChange={(status) => {
                  if (status === true) changeScreenOrientation();
                }}
              />
            </>
          ) : (
            <View>
              <ImageBackground
                source={require("../../assets/images/placeholders/posterPlaceHolder.png")}
                style={styles.tinyLogo}
              />
            </View>
          )}
          <View className="w-full h-24 bg-stone-900 px-4 space-y-1 justify-center items-start py-2">
            <Text className="text-green-100 text-lg">{props.video?.name}</Text>
            <View className="flex-row items-center">
              <Text className="text-stone-400 space-x-4">
                {props.video?.type}
                {" • "}
              </Text>
              <Text className=" text-stone-400 text-xs">
                {props.video?.published_at.substring(0, 10)}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text className="text-gray-300">Whoops no data Available</Text>
      )}
    </View>
  );
};

export default YouTubePlayer;
