import { MovieMedia, TvMedia } from "../../types/typings";
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import CustomButton from "./ui/CustomButton";
import { Colors } from "./../utils/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  dateFormatter,
  idToGenresMapped,
  isMovie,
} from "./../utils/helpers/helper";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import WatchlistButton from "./ui/WatchlistButton";
import { by639_1 } from "iso-language-codes";
import { useBlurHomeScreenBannerHooks } from "../hooks/reduxHooks";
import * as Clipboard from "expo-clipboard";
import ClipboardableText from "./ui/ClipboardableText";

interface IProps {
  media: MovieMedia | TvMedia;
}

const screenDimensions = Dimensions.get("screen");

const Banner: React.FC<IProps> = ({ media }) => {
  const { isHomeScreenBannerBlur } = useBlurHomeScreenBannerHooks();

  const imgUri = `https://image.tmdb.org/t/p/w1280${media?.backdrop_path}`;

  // const imgUri = `https://image.tmdb.org/t/p/w${
  //   isHomeScreenBannerBlur.blur ? 300 : 1280
  // }${media?.backdrop_path}`;

  const navigation = useNavigation();

  function infoButtonPressHandler(): void {
    // @ts-ignore
    navigation.push("More Info", {
      mediaType: isMovie(media) ? "movie" : "tv",
      media: media,
    });
  }

  const copyToClipboard = async (content: string) => {
    await Clipboard.setStringAsync(content);
    console.log("copied");
  };

  return (
    <View className="flex-1 w-[100%]">
      <View className="h-[60px] w-full"></View>

      <View
        className="absolute top-0 left-0 w-[100%] flex-1 h-full"
        style={{
          width: screenDimensions.width,
          height: 700,
          // aspectRatio: 2 / 3,
        }}
      >
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.6)",
            "rgba(0, 0, 0, 0.6)",
            "rgba(0, 0, 0, 0.5)",
            Colors.secondary,
          ]}
          style={styles.rootScreen}
        >
          <ImageBackground //wrapping the main entry screen with this <ImageBackground> component   media?.poster_path || media?.backdrop_path
            source={{
              uri: imgUri,
            }}
            resizeMode="cover" //similar to web, "cover", "contain", etc.
            style={styles.rootScreen} //for View dimensions internally
            imageStyle={styles.backgroundImage} //for Image styles internally.
            blurRadius={isHomeScreenBannerBlur.blur ? 8 : undefined}
          ></ImageBackground>
        </LinearGradient>
      </View>

      {/* Text Contents and Buttons */}
      {media ? (
        <View className="px-4 mt-10">
          {/* Title/Name */}
          <ClipboardableText
            styleClassName="text-[34px] max-w-xs font-semibold text-text_highLight"
            content={isMovie(media) ? media.title : media?.name}
          />

          {/* Genres */}
          <Text
            className="mt-1 text-text_secondary text-xs"
            style={{ lineHeight: 20 }}
          >
            {media?.genre_ids
              .map((g, i) => {
                // @ts-ignore
                return idToGenresMapped[String(g)];
              })
              .join(" • ")}
            {""}
          </Text>

          {/* Ratings and other stats */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 space-x-4"
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
                    ? dateFormatter(media.release_date).split(" ")[2]
                    : "--"
                  : media.first_air_date
                  ? dateFormatter(media.first_air_date).split(" ")[2]
                  : "--"}
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
                  {/* @ts-ignore
                  {by639_1[media.original_language]?.name
                    ? // @ts-ignore
                      by639_1[media.original_language]?.name
                    : media.original_language} */}
                  {media.original_language === "cn"
                    ? "Cantonese"
                    : media.original_language === "zh"
                    ? "Mandarin"
                    : by639_1[media.original_language]?.name
                    ? by639_1[media.original_language]?.name
                    : media.original_language}
                </Text>
              </View>
            ) : null}
          </ScrollView>

          {/* OverView */}
          <Text
            className="mt-3 max-w-[95%] text-xs font-medium text-text_secondary"
            numberOfLines={3}
          >
            {media?.overview}
          </Text>

          <View className="mt-3 flex-row space-x-3">
            <View className="mt-5 w-[120]">
              <WatchlistButton
                media={media}
                mediaType={isMovie(media) ? "movie" : "tv"}
                isBannerButton={true}
              />
            </View>

            <View
              className="mt-5 w-[140]"
              style={{
                elevation: 10,
              }}
            >
              <CustomButton
                width={140}
                height={40}
                radius={8}
                styledClassName="bg-neutral-700"
                method={infoButtonPressHandler}
                shadow={false}
              >
                <View className="flex-row gap-1 items-center">
                  <Ionicons
                    name="information-circle"
                    size={18}
                    color={Colors.stone[400]}
                  />
                  <Text className="font-medium text-gray-50">More Info</Text>
                </View>
              </CustomButton>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    zIndex: -100,
  },
});
