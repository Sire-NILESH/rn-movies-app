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

  const height = dimensionsForWindow.height * 0.29;
  console.log(height);

  // height: 250
  return (
    <View
      className=""
      style={{
        width: "100%",
        aspectRatio: 16 / 9,
        zIndex: 0,
      }}
    >
      {props.loading ? (
        <Text className="text-gray-400 text-xl text-center">Loading...</Text>
      ) : props.video ? (
        <View className="">
          {props.video.key ? (
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
              />
            </View>
          ) : (
            <View>
              <ImageBackground
                source={require("../../assets/images/placeholders/posterPlaceHolder.png")}
                style={styles.tinyLogo}
              />
            </View>
          )}
        </View>
      ) : (
        <Text className="text-gray-300">Whoops no data Available</Text>
      )}
    </View>
  );
};

export default YouTubePlayer;
