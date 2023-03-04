import { MovieMedia, TvMedia } from "../typings";
import { useState, useEffect } from "react";

import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import CustomButton from "./ui/CustomButton";
import { Colors } from "./../utils/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { isMovie } from "./../utils/helpers/helper";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  mediaList: MovieMedia[] | TvMedia[];
}
// const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

function Banner({ mediaList }: Props) {
  const [media, setMedia] = useState<MovieMedia | TvMedia | null>(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (mediaList) {
      setMedia(mediaList[Math.floor(Math.random() * mediaList.length)]);
    }
  }, [mediaList]);

  function playButtonPressHandler(): void {
    // @ts-ignore
    navigation.navigate("More Info", { media: media });
  }

  function infoButtonPressHandler(): void {
    // @ts-ignore
    navigation.navigate("More Info", { media: media });
  }

  return (
    <View className="flex-1 py-10 w-[100%]">
      {/* {route.name === "Home" ? <Header /> : null} */}
      {route.name === "Home" ? (
        <View className="h-[80px] w-full">{/* <Text> T</Text> */}</View>
      ) : null}
      <View
        className="absolute top-0 left-0 w-[100%] flex-1 h-full"
        style={[{ height: screenDimensions.height }]}
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.5)",
            "rgba(28, 25, 23, 0.6)",
            "rgba(28, 25, 23, 0.9)",
            Colors.black,
          ]}
          style={styles.rootScreen}
        >
          <ImageBackground //wrapping the main entry screen with this <ImageBackground> component
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                media?.poster_path || media?.backdrop_path
              }`,
            }}
            resizeMode="cover" //similar to web, "cover", "contain", etc.
            style={styles.rootScreen} //for View dimensions internally
            imageStyle={styles.backgroundImage} //for Image styles internally.
          ></ImageBackground>
        </LinearGradient>
      </View>

      {/* Text Contents and Buttons */}
      <View className="px-4 mt-10">
        <Text className="text-2xl font-bold text-gray-100 ">
          {/* {movie?.title || movie?.name || movie?.original_name} */}
          {/* {getTitle()} */}
          {isMovie(media) ? media.title : media?.original_name}
        </Text>
        <Text className="max-w-xs text-xs text-gray-100">
          {media?.overview}
        </Text>

        <View className="flex-row space-x-3">
          {/* <View className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black" /> 
          <Text>Play</Text>
          Play
           </View> */}

          <View className="mt-10">
            <CustomButton
              width={100}
              height={40}
              radius={5}
              color="white"
              border={0}
              method={playButtonPressHandler}
              shadow={false}
            >
              <View className="flex-row  gap-1 items-center">
                <Ionicons name="star-outline" size={12} />
                <Text className="font-bold">Favorite</Text>
              </View>
            </CustomButton>
          </View>

          <View className="mt-10">
            <CustomButton
              width={140}
              height={40}
              radius={5}
              color={Colors.gray["600"]}
              border={0}
              method={infoButtonPressHandler}
              shadow={false}
            >
              <View className="flex-row  gap-1 items-center">
                <Ionicons
                  name="information-circle"
                  size={18}
                  color={Colors.gray[400]}
                />
                <Text className="font-bold text-gray-50">More Info</Text>
              </View>
            </CustomButton>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    zIndex: -100,
  },
});
