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

const YouTubePlayer: React.FC<IProps> = (props) => {
  const [playing, setPlaying] = useState(false);
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "portrait"
  );

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

  // height: 250
  return (
    <View
      style={{
        backgroundColor: "transparent",
        // backgroundColor: playing ? "black" : "transparent",
        // height: 250,
        height: 350,
        width: "100%",
        // width: dimensionsForScreen.width,
        justifyContent: "center",
        alignItems: "center",
      }}
      //   contentContainerStyle={{
      //     justifyContent: "center",
      //     alignItems: "center",
      //   }}
    >
      {props.loading ? (
        <Text className="text-gray-400 text-xl">Loading...</Text>
      ) : props.video ? (
        <View style={styles.centerContent}>
          {props.video.key ? (
            <>
              <YoutubeIframe
                // height={250}
                height={270}
                width={dimensionsForScreen.width}
                play={playing}
                videoId={props.video.key}
                onChangeState={onStateChanged}
                // allowWebViewZoom={true}
                onFullScreenChange={(status) => {
                  // setOrientation((prev) =>
                  //   prev === "portrait" ? "landscape" : "portrait"
                  // );
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
          <View className="w-full bg-stone-900 px-4 space-y-1 justify-start pb-6">
            <Text className="text-gray-50">{props.video?.name}</Text>
            <View className="flex-row items-center">
              <Text className="text-gray-400 space-x-4">
                {props.video?.type}
                {" • "}
              </Text>
              <Text className=" text-gray-400 text-xs">
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
