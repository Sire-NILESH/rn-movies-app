import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import {
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../typings";
import {
  isMovie,
  isMovieExtended,
  isTv,
  isTvExtended,
} from "./../utils/helpers/helper";
import { Colors } from "./../utils/Colors";
import GenreTags from "./../components/GenreTags";
import CustomButton from "../components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TrailerButton from "../components/ui/TrailerButton";
import useFetcher from "../hooks/useFetcher";
import { getMediaInfo, getTvShowInfo } from "../utils/requests";
import NetworkList from "../components/NetworkList";
import WatchProviders from "../components/WatchProviders";
import NewMediaCardInfo from "./../components/NewMediaCardInfo";
import {
  useFavouriteMediaListHooks,
  useWatchedMediaListHooks,
  useWatchlistHooks,
} from "../hooks/reduxHooks";
import ProductionCompaines from "../components/ProductionCompaines";

const screenDimensions = Dimensions.get("screen");

const MoreInfoScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  let media: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended =
    // @ts-ignore
    route.params?.media;

  const mediaType: MediaTypes = // @ts-ignore
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  // let tvExtendedMedia;
  let extendedMedia;

  const {
    screenProps,
    // loadingProps,
    errorLoadingProps,
  }: {
    screenProps: TvMediaExtended | MovieMediaExtended;
    // loadingProps: boolean;
    errorLoadingProps: Error | null;
  } = useFetcher(getMediaInfo, [media.id, mediaType]);

  // if (mediaType === "tv" && screenProps !== null) {
  //   extendedMedia = Object.assign(media, screenProps);
  // }

  extendedMedia = Object.assign(media, screenProps);
  // console.log("(extendedMedia)", extendedMedia);

  function getTitle(): string {
    if ("title" in media) return media.title;
    return media.name;
  }

  const mediaPosterPath = media?.poster_path || media?.backdrop_path;

  // REDUX TOOLKIT HOOKS
  const {
    addMediaToWatchlistHandler,
    removeMediaFromWatchlistHandler,
    isMediaWatchlisted,
  } = useWatchlistHooks();

  const {
    addMediaToWatchedHandler,
    removeMediaFromWatchedHandler,
    isMediaWatched,
  } = useWatchedMediaListHooks();

  const {
    addMediaToFavouriteHandler,
    removeMediaFromFavouriteHandler,
    isMediaFavourite,
  } = useFavouriteMediaListHooks();

  // if (isMediaFavourite(media.id)) {
  //   console.log("YYYYYEEEEESSSSS, media is favourite");
  // } else {
  //   console.log("NNNNNOOOOOOOO, media is not favourite");
  // }

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: getTitle(),
      headerRight: (props) => {
        return (
          <View className="pr-1">
            <CustomButton
              color={Colors.tertiary}
              height={56}
              width={56}
              radius={1000}
              method={() => {
                if (isMediaFavourite(media.id)) {
                  removeMediaFromFavouriteHandler(media.id);
                } else {
                  addMediaToFavouriteHandler({
                    mediaId: media.id,
                    poster_path: media.poster_path,
                    backdrop_path: media.backdrop_path,
                    mediaType: mediaType,
                    mediaDate: isMovie(media)
                      ? media.release_date
                      : media.first_air_date,
                    mediaTitle: isMovie(media) ? media.title : media.name,
                  });
                }
              }}
            >
              <Ionicons
                size={isMediaFavourite(media.id) ? 28 : 24}
                name={isMediaFavourite(media.id) ? "heart" : "heart-outline"}
                color={
                  isMediaFavourite(media.id)
                    ? Colors.stone[50]
                    : Colors.stone[100]
                }
              ></Ionicons>
            </CustomButton>
          </View>
        );
      },
    });
  }, [isMediaFavourite]);

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
        {/* 
        {isMovie(media) ? (
          <View className="flex-row items-center justify-between divide-x-2 divide-stone-100">
            <View className="flex-row items-center justify-center gap-x-2">
              <Ionicons
                name="cash-outline"
                size={14}
                color={Colors.text_tertiary}
              />
              <Text className="text-text_primary">
                {isMovieExtended(media) &&
                  media.budget.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
              </Text>
            </View>

            <View className="flex-row items-center justify-center gap-x-2">
              <Ionicons name="cash" size={14} color={Colors.text_tertiary} />
              <Text className="text-text_primary">
                {isMovieExtended(media) &&
                  Number(media.revenue).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
              </Text>
            </View>

            <View className="flex-row items-center justify-center gap-x-2">
              <Ionicons name="time" size={14} color={Colors.text_tertiary} />
              <Text className="text-text_primary">
                {isMovieExtended(media) && media.runtime} mins
              </Text>
            </View>
          </View>
        ) : null} */}
      </View>

      {/* Buttons */}
      <View className="w-full flex-row space-between gap-3 pl-4 mt-12">
        <View className="flex-1">
          <TrailerButton mediaType={mediaType} mediaId={media.id} />
        </View>

        {/* WATCHLIST BUTTON */}
        <View className="flex-1">
          <CustomButton
            color={
              isMediaWatchlisted(media.id) ? Colors.stone[50] : Colors.tertiary
            }
            height={45}
            width={"100%"}
            radius={10}
            method={() => {
              if (isMediaWatchlisted(media.id)) {
                removeMediaFromWatchlistHandler(media.id);
              } else {
                addMediaToWatchlistHandler({
                  mediaId: media.id,
                  poster_path: media.poster_path,
                  backdrop_path: media.backdrop_path,
                  mediaType: mediaType,
                  mediaDate: isMovie(media)
                    ? media.release_date
                    : media.first_air_date,
                  mediaTitle: isMovie(media) ? media.title : media.name,
                });
              }
            }}
          >
            <Ionicons
              size={18}
              name={isMediaWatchlisted(media.id) ? "checkmark" : "add"}
              color={Colors.stone[500]}
            ></Ionicons>
            <Text
              className="ml-1"
              style={{
                color: isMediaWatchlisted(media.id)
                  ? Colors.stone[800]
                  : Colors.text_primary,
              }}
            >
              {" "}
              {isMediaWatchlisted(media.id) ? "Watchlisted" : "Watchlist"}
            </Text>
          </CustomButton>
        </View>

        <View className="flex-1">
          <CustomButton
            color={
              isMediaWatched(media.id) ? Colors.stone[50] : Colors.tertiary
            }
            height={45}
            width={"100%"}
            radius={10}
            method={() => {
              if (isMediaWatched(media.id)) {
                removeMediaFromWatchedHandler(media.id);
              } else {
                addMediaToWatchedHandler({
                  mediaId: media.id,
                  poster_path: media.poster_path,
                  backdrop_path: media.backdrop_path,
                  mediaType: mediaType,
                  mediaDate: isMovie(media)
                    ? media.release_date
                    : media.first_air_date,
                  mediaTitle: isMovie(media) ? media.title : media.name,
                });
              }
            }}
          >
            <Ionicons
              size={18}
              name={"eye"}
              // name={isMediaWatched(media.id) ? "checkmark" : "add"}
              color={Colors.stone[500]}
            ></Ionicons>
            <Text
              className="ml-1"
              style={{
                color: isMediaWatched(media.id)
                  ? Colors.stone[800]
                  : Colors.text_primary,
              }}
            >
              {" "}
              Watched
            </Text>
          </CustomButton>
        </View>

        {/* WATCHED BUTTON */}
        {/* <View className="flex-1">
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
        </View> */}
      </View>

      {/* Network List and Watch Provider row */}
      <View className="">
        {/* Production companies */}
        {/* {isMovieExtended(media) && (
          <View className="mt-16">
            <ProductionCompaines productions={media.production_companies} />
          </View>
        )} */}

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
                Show{" "}
                {isTvExtended(extendedMedia) &&
                  extendedMedia?.number_of_seasons}{" "}
                seasons and{" "}
                {isTvExtended(extendedMedia) &&
                  extendedMedia?.number_of_episodes}{" "}
                episodes
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
