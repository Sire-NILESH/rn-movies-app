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
import { isoLangs } from "../utils/helpers/isoLangs";
import { ScrollView } from "react-native-gesture-handler";

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
    navigation.push("More Info", {
      mediaType: isMovie(media) ? "movie" : "tv",
      media: media,
    });
  }

  return (
    <View className="flex-1 py-10 w-[100%]">
      {route.name === "Home" ? (
        <View className="h-[80px] w-full">{/* <Text> T</Text> */}</View>
      ) : null}
      <View
        className="absolute top-0 left-0 w-[100%] flex-1 h-full"
        style={{
          width: screenDimensions.width,
          height: undefined,
          aspectRatio: 2 / 3,
        }}
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.2)",
            "rgba(28, 25, 23, 0.5)",
            "rgba(28, 25, 23, 0.5)",
            "rgba(28, 25, 23, 0.6)",
            Colors.tertiary,
            Colors.secondary,
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
      {media ? (
        <LinearGradient
          className="px-4 mt-10 space-y-3"
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)"]}
        >
          {/* Title/Name */}
          <Text className="text-2xl font-bold text-text_highLight">
            {isMovie(media) ? media.title : media?.original_name}
          </Text>

          {/* Ratings and other stats */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View className="flex-row items-center space-x-2">
              <Ionicons name="star" size={18} color={Colors.yellow[300]} />
              <Text className="font-bold text-text_secondary tracking-widest">
                <Text
                  className="font-bold"
                  style={{
                    color:
                      media.vote_average > 4.0
                        ? Colors.green[400]
                        : Colors.red[400],
                  }}
                >
                  {media.vote_average.toFixed(2)}
                </Text>
                /10
              </Text>
            </View>

            <View className="flex-row items-center space-x-2">
              <Ionicons
                name={isMovie(media) ? "film-outline" : "tv-outline"}
                size={18}
                color={Colors.text_secondary}
              />
              <Text className="text-text_primary font-semibold">
                {isMovie(media) ? "Movie" : "TV"}
              </Text>
            </View>

            <View className="flex-row items-center space-x-2">
              <Ionicons
                name="calendar-outline"
                size={18}
                color={Colors.text_secondary}
              />
              <Text className="text-text_primary font-semibold">
                {isMovie(media) ? media.release_date : media.first_air_date}
              </Text>
            </View>

            {media.original_language ? (
              <View className="flex-row items-center space-x-2">
                <Ionicons
                  name="language-outline"
                  size={18}
                  color={Colors.text_secondary}
                />
                <Text className="text-text_primary font-semibold">
                  {/*  @ts-ignore */}
                  {isoLangs[media.original_language]?.name
                    ? // @ts-ignore
                      isoLangs[media.original_language]?.name
                    : media.original_language}
                </Text>
              </View>
            ) : null}
          </ScrollView>

          {/* OverView */}
          <Text
            className="max-w-xs text-xs font-semibold text-text_primary"
            numberOfLines={4}
          >
            {media?.overview}
          </Text>

          <View className="flex-row space-x-3">
            <View className="mt-10">
              <CustomButton
                width={100}
                height={40}
                radius={5}
                color={Colors.stone[200]}
                border={1}
                method={playButtonPressHandler}
                shadow={false}
                styledClassName="border-stone-200"
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
                color={Colors.stone["900"]}
                border={1}
                styledClassName="border-stone-800"
                method={infoButtonPressHandler}
                shadow={false}
              >
                <View className="flex-row  gap-1 items-center">
                  <Ionicons
                    name="information-circle"
                    size={18}
                    color={Colors.stone[400]}
                  />
                  <Text className="font-bold text-gray-50">More Info</Text>
                </View>
              </CustomButton>
            </View>
          </View>
        </LinearGradient>
      ) : null}
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
