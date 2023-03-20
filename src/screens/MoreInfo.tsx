import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { MediaTypes, MovieMedia, TvMedia, TvMediaExtended } from "../typings";
import { isMovie, isTv, isTvExtended } from "./../utils/helpers/helper";
import { Colors } from "./../utils/Colors";
import GenreTags from "./../components/GenreTags";
import CustomButton from "../components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TrailerButton from "../components/ui/TrailerButton";
import useFetcher from "../hooks/useFetcher";
import { getTvShowInfo } from "../utils/requests";
import NetworkList from "../components/NetworkList";
import WatchProviders from "../components/WatchProviders";
import NewMediaCardInfo from "./../components/NewMediaCardInfo";

const screenDimensions = Dimensions.get("screen");

const MoreInfoScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  // @ts-ignore
  let media: MovieMedia | TvMedia | TvMediaExtended = route.params?.media;

  const mediaType: MediaTypes = // @ts-ignore
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: getTitle(),
    });
  }, []);

  let tvExtendedMedia;

  // This hook is responsible for managing the data, loading and error states from the server/API. It takes in an async 'fetcher' function that will request the API call.
  const {
    screenProps,
    // loadingProps,
    errorLoadingProps,
  }: {
    screenProps: TvMediaExtended;
    // loadingProps: boolean;
    errorLoadingProps: Error | null;
  } =
    mediaType === "tv"
      ? useFetcher(getTvShowInfo, [media.id])
      : { screenProps: {}, loadingProps: false, errorLoadingProps: null };

  if (mediaType === "tv" && screenProps !== null) {
    tvExtendedMedia = Object.assign(media, screenProps);
  }

  function getTitle(): string {
    if ("title" in media) return media.title;
    return media.name;
  }

  const mediaPosterPath = media?.poster_path || media?.backdrop_path;

  return (
    <ScrollView className="flex-1 bg-secondary pb-24">
      {/* BackDrop Image */}
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
            "rgba(0,0,0,0)",
            "rgba(28, 25, 23, 0.4)",
            "rgba(28, 25, 23, 0.8)",
            Colors.black,
          ]}
          className="flex-1"
        >
          <ImageBackground //wrapping the main entry screen with this <ImageBackground> component
            source={{
              uri: `https://image.tmdb.org/t/p/w500${mediaPosterPath}`,
            }}
            resizeMode="cover" //similar to web, "cover", "contain", etc.
            style={{ flex: 1 }} //for View dimensions internally
            imageStyle={{ zIndex: -100 }} //for Image styles internally.
          ></ImageBackground>
        </LinearGradient>
      </View>

      {/* Content Title/name and original title/name  */}
      <View className="mt-64 flex-1 pt-6">
        {/* Title */}
        <View className="px-4">
          <Text className="text-3xl font-semibold text-text_highLight object-cover">
            {getTitle()}
          </Text>
          {isMovie(media) && media.original_title !== media.title ? (
            <Text className="text-sm text-text_tertiary pt-2">
              Original Title:{"  "}
              <Text className="text-text_primary">{media.original_title}</Text>
            </Text>
          ) : !isMovie(media) && media.original_name !== media.name ? (
            <Text className="text-sm text-text_tertiary pt-2">
              Original Title:{"  "}
              <Text className="text-text_primary">{media.original_name}</Text>
            </Text>
          ) : null}
        </View>

        {/* Genre Tags Row */}
        <View className="w-full h-10 justify-center items-center mt-5">
          <GenreTags
            genreIdList={media.genre_ids}
            backgroundType="transparent"
          />
        </View>

        <NewMediaCardInfo media={media} />

        {/* Description */}
        {media.overview ? (
          <View className="px-4 mt-5 space-y-2">
            <Text className="text-lg text-text_highLight">Overview</Text>
            <Text className="text-text_dark">{media.overview}</Text>
          </View>
        ) : null}
      </View>

      {/* Buttons */}
      <View className="w-full flex-row space-between gap-3 pl-4 mt-12">
        <View className="flex-1">
          <TrailerButton mediaType={mediaType} mediaId={media.id} />
        </View>

        <View className="flex-1">
          <CustomButton
            color={Colors.tertiary}
            height={45}
            width={"100%"}
            radius={10}
          >
            <Ionicons size={18} name="add" color={Colors.stone[500]}></Ionicons>
            <Text className="text-green-100 ml-1">Watchlist</Text>
          </CustomButton>
        </View>
        <View className="flex-1">
          <CustomButton
            color={Colors.tertiary}
            height={45}
            width={"100%"}
            radius={10}
          >
            <Ionicons
              size={18}
              name="checkmark"
              color={Colors.stone[500]}
            ></Ionicons>
            <Text className="text-green-100 ml-1">Watched</Text>
          </CustomButton>
        </View>
      </View>

      {/* Network List and Watch Provider row */}
      <View className="">
        {/* Networks available on */}
        {isTvExtended(media) && <NetworkList networks={media.networks} />}

        {/* Networks available on */}
        <WatchProviders mediaId={media.id} mediaType={mediaType} />
      </View>

      {/* Footer, contains 'Similar' and 'Seasons and episodes' bttons */}
      <View className="mt-12 flex-row items-center space-x-5 w-full p-4">
        {/* Realated/Similar/Show_more_like_this */}
        <LinearGradient
          className="h-32 rounded-xl max-w-xl overflow-hidden border border-stone-800"
          colors={[
            "rgba(28, 25, 23, 0.4)",
            "rgba(41, 37, 36, 0.5)",
            "rgba(28, 25, 23, 0.8)",
            "rgba(28, 25, 23, 0.5)",
            Colors.black,
          ]}
          start={{ x: 0.1, y: 0.2 }}
        >
          <Pressable
            className="flex-1 px-4 py-4 justify-between"
            onPress={() =>
              navigation.push("Related", {
                relatedToMediaId: media.id,
                mediaType: mediaType,
              })
            }
            android_ripple={{ color: "#eee" }}
          >
            <View className="flex-row items-center gap-2">
              <Text className="text-2xl text-text_highLight">Similar</Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={Colors.green[100]}
              />
            </View>
            <Text className="text-text_tertiary text-sm">
              Show more like this
            </Text>
          </Pressable>
        </LinearGradient>

        {/* TV seasons and episodes,for TVs only  */}
        {isTv(media) ? (
          <LinearGradient
            className="h-32 rounded-xl flex-1 overflow-hidden border border-stone-800"
            colors={[
              "rgba(28, 25, 23, 0.4)",
              "rgba(41, 37, 36, 0.5)",
              "rgba(28, 25, 23, 0.8)",
              "rgba(28, 25, 23, 0.5)",
              Colors.black,
            ]}
            start={{ x: 0.1, y: 0.2 }}
          >
            <Pressable
              className="flex-1 px-4 py-4 justify-between"
              onPress={() =>
                navigation.push("Season and Episodes", {
                  tvMediaId: isTvExtended(media) && media.id,
                  tvMediaSeasons: isTvExtended(media) && media.seasons,
                  tvMediaPosterPath: mediaPosterPath,
                  tvMediaName:
                    (isTvExtended(media) && media.name) ||
                    (isTvExtended(media) && media.original_name),
                })
              }
              android_ripple={{ color: "#eee" }}
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-2xl text-text_highLight">Seasons</Text>
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={Colors.text_primary}
                />
              </View>
              <Text className="text-text_tertiary text-sm">
                Show {tvExtendedMedia?.number_of_seasons} seasons and{" "}
                {tvExtendedMedia?.number_of_episodes} episodes
              </Text>
            </Pressable>
          </LinearGradient>
        ) : // </View>
        null}
      </View>
    </ScrollView>
  );
};

export default MoreInfoScreen;
