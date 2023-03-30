import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import {
  IReduxListMedia,
  MediaTypes,
  MovieMediaExtended,
  TvMediaExtended,
} from "../typings";
import { isMovie, isTv, isTvExtended } from "./../utils/helpers/helper";
import { Colors } from "./../utils/Colors";
import GenreTags from "./../components/GenreTags";
import { LinearGradient } from "expo-linear-gradient";
import TrailerButton from "../components/ui/TrailerButton";
import useFetcher from "../hooks/useFetcher";
import { getMediaInfo } from "../utils/requests";
import NetworkList from "../components/NetworkList";
import WatchProviders from "../components/WatchProviders";
import NewMediaCardInfo from "./../components/NewMediaCardInfo";

import Loader from "../components/ui/Loader";
import MoreInfoFooterButton from "../components/ui/MoreInfoFooterButton";
import WatchlistButton from "../components/ui/WatchlistButton";
import FavouriteMediaButton from "../components/ui/FavouriteMediaButton";
import WatchedMediaButton from "../components/ui/WatchedMediaButton";

const screenDimensions = Dimensions.get("screen");

const CollectionMediaMoreInfo: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;

  const collectionMedia: IReduxListMedia =
    // @ts-ignore
    route.params?.collectionMedia;

  const mediaType: MediaTypes = // @ts-ignore
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  let extendedMedia;

  const parametersForFetcher = [collectionMedia.mediaId, mediaType];

  const {
    screenProps: media,
    loadingProps,
    errorLoadingProps,
  }: {
    screenProps: TvMediaExtended | MovieMediaExtended;
    loadingProps: boolean;
    errorLoadingProps: Error | null;
  } = useFetcher(getMediaInfo, parametersForFetcher);

  extendedMedia = media;

  function getTitle(): string {
    if (media && "title" in media) return media.title;
    return media && media.name;
  }

  const mediaPosterPath =
    collectionMedia?.poster_path || collectionMedia?.backdrop_path;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: collectionMedia.mediaTitle,
      headerRight: (props) => {
        return (
          <FavouriteMediaButton
            media={media}
            mediaId={collectionMedia.mediaId || media.id}
            mediaType={mediaType}
          />
        );
      },
    });
  }, [media]);

  console.log("Media from collection more info", media);

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      <Loader loading={loadingProps} />

      {media && (
        <ScrollView className="flex-1 pb-24">
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
                  <Text className="text-text_primary">
                    {media.original_title}
                  </Text>
                </Text>
              ) : !isMovie(media) && media.original_name !== media.name ? (
                <Text className="text-sm text-text_tertiary pt-2">
                  Original Title:{"  "}
                  <Text className="text-text_primary">
                    {media.original_name}
                  </Text>
                </Text>
              ) : null}
            </View>

            {/* Genre Tags Row */}
            <View className="w-full h-10 justify-center items-center mt-5">
              <GenreTags
                genreIdList={media.genres.map((genre) => genre.id)}
                // genreIdList={media.genre_ids}
                backgroundType="transparent"
              />
            </View>

            {/* MEDIA IMAGE WITH STATS */}
            <NewMediaCardInfo media={media} />

            {/* DESCRIPTION */}
            {media.overview ? (
              <View className="px-4 mt-5 space-y-2">
                <Text className="text-lg text-text_highLight">Overview</Text>
                <Text className="text-text_dark">{media.overview}</Text>
              </View>
            ) : null}
          </View>

          {/* BUTTONS CONTAINER */}
          <View className="w-full flex-row space-between gap-3 pl-4 mt-12">
            {/* TRAILER BUTTON */}
            <View className="flex-1">
              <TrailerButton mediaType={mediaType} mediaId={media.id} />
            </View>

            {/* WATCHLIST BUTTON */}
            <View className="flex-1">
              <WatchlistButton media={media} mediaType={mediaType} />
            </View>

            {/* WATCHED BUTTON */}
            <View className="flex-1">
              <WatchedMediaButton media={media} mediaType={mediaType} />
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
          <View className="mt-12 flex-row items-center space-x-5 w-full px-4">
            {/* Realated/Similar Button */}
            <View className="max-w-xl">
              <MoreInfoFooterButton
                title={"Similar"}
                subtitle={"Show more like this"}
                onPressHandler={() => {
                  navigation.push("Related", {
                    relatedToMediaId: media.id,
                    mediaType: mediaType,
                  });
                }}
              />
            </View>
            {/* TV seasons and episodes,for TVs only */}
            {isTv(media) ? (
              <View className="flex-1">
                <MoreInfoFooterButton
                  title={"Seasons"}
                  subtitle={`Show ${
                    isTvExtended(extendedMedia) &&
                    extendedMedia?.number_of_seasons
                  } seasons and ${
                    isTvExtended(extendedMedia) &&
                    extendedMedia?.number_of_episodes
                  } episodes`}
                  onPressHandler={() => {
                    navigation.push("Season and Episodes", {
                      tvMediaId: isTvExtended(media) && media.id,
                      tvMediaSeasons: isTvExtended(media) && media.seasons,
                      tvMediaPosterPath: mediaPosterPath,
                      tvMediaName:
                        (isTvExtended(media) && media.name) ||
                        (isTvExtended(media) && media.original_name),
                    });
                  }}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CollectionMediaMoreInfo;