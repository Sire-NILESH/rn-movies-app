import { MovieMedia, TvMedia } from "../../types/typings";
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
import { dateFormatter, isMovie } from "./../utils/helpers/helper";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import WatchlistButton from "./ui/WatchlistButton";
import { supportedLangs } from "../utils/helpers/langs";
import { by639_1 } from "iso-language-codes";

interface Props {
  mediaList: MovieMedia[] | TvMedia[];
}

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
      <View className="h-[60px] w-full"></View>

      {/* {route.name === "Home" ? (
        <View className="h-[80px] w-full"></View>
      ) : (
        <View className="h-[40px] w-full"></View>
      )} */}
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
            "rgba(28, 25, 23, 0.6)",
            "rgba(28, 25, 23, 0.6)",
            "rgba(28, 25, 23, 0.6)",
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
        <View className="px-4 mt-10 space-y-3">
          {/* Title/Name */}
          <Text className="text-2xl font-bold text-text_highLight">
            {isMovie(media) ? media.title : media?.name}
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
                {isMovie(media)
                  ? media.release_date
                    ? dateFormatter(media.release_date)
                    : null
                  : dateFormatter(media.first_air_date)}
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
                  {by639_1[media.original_language]?.name
                    ? // @ts-ignore
                      by639_1[media.original_language]?.name
                    : media.original_language}
                </Text>
              </View>
            ) : null}
          </ScrollView>

          {/* OverView */}
          <Text
            className="max-w-xs text-xs text-text_secondary"
            numberOfLines={4}
          >
            {media?.overview}
          </Text>

          <View className="flex-row space-x-3">
            <View className="mt-5 w-[120]">
              <WatchlistButton
                media={media}
                mediaType={isMovie(media) ? "movie" : "tv"}
                isBannerButton={true}
              />
            </View>

            <View className="mt-5 w-[140]">
              <CustomButton
                width={140}
                height={42}
                radius={8}
                // color={Colors.neutral["700"]}
                // border={1}
                styledClassName="border-stone-800 bg-neutral-700/60"
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
        </View>
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
