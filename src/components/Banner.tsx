import { Movie, MovieMedia, TvMedia } from "../typings";
import { useState, useEffect } from "react";
import { useRecoilState } from "./../../node_modules/recoil/index.d";
import { modalState, movieState } from "./../atoms/modalAtom";
import {
  Image,
  Text,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import CustomButton from "./ui/CustomButton";
import { Colors } from "./../utils/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { isMovie } from "./../utils/helpers/helper";

interface Props {
  mediaList: MovieMedia[] | TvMedia[];
}
const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

function Banner({ mediaList }: Props) {
  const [media, setMedia] = useState<MovieMedia | TvMedia | null>(null);
  // const [showModal, setShowModal] = useRecoilState(modalState);
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (mediaList) {
      setMedia(mediaList[Math.floor(Math.random() * mediaList.length)]);
    }
  }, [mediaList]);

  function playButtonPressHandler(): void {
    // setCurrentMovie(movie);
    // setShowModal(true);
    // @ts-ignore
    navigation.push("Home");
  }

  function infoButtonPressHandler(): void {
    // setCurrentMovie(movie);
    // setShowModal(true);
    // @ts-ignore
    navigation.push("Movies");
  }
  // const [dimensions, setDimensions] = useState({
  //   window: windowDimensions,
  //   screen: screenDimensions,
  // });

  // function isMovie(media: MovieMedia | TvMedia ): media is MovieMedia {
  //   return (media as MovieMedia).title !== undefined;
  // }

  // media && isMovie(media)
  //   ? console.log(media.title)
  //   : console.log(media?.first_air_date);

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
            "rgba(0,0,0,0.3)",
            "rgba(28, 25, 23, 0.9)",
            Colors.stone[900],
          ]}
          style={styles.rootScreen}
        >
          <ImageBackground //wrapping the main entry screen with this <ImageBackground> component
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                media?.backdrop_path || media?.poster_path
              }`,
            }}
            resizeMode="cover" //similar to web, "cover", "contain", etc.
            style={styles.rootScreen} //for View dimensions internally
            imageStyle={styles.backgroundImage} //for Image styles internally.
          ></ImageBackground>
        </LinearGradient>
      </View>
      <View className="px-4">
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
              <Text className="font-bold">Play</Text>
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
              <Text className="font-bold text-gray-100">More Info i</Text>
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
    // opacity: 0.02,
    zIndex: -100,
  },
});
