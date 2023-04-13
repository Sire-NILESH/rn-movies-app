import { View, Text, ImageBackground, Dimensions } from "react-native";
import React from "react";
import {
  ICredits,
  MediaTypes,
  MovieMediaExtended,
  TvMediaExtended,
} from "../../types/typings";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loader from "./ui/Loader";
import NothingToShow from "./NothingToShow";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  isMovie,
  isMovieExtended,
  isTv,
  isTvExtended,
} from "../utils/helpers/helper";
import GenreTags from "./GenreTags";
import NewMediaCardInfo from "./NewMediaCardInfo";
import TrailerButton from "./ui/TrailerButton";
import WatchlistButton from "./ui/WatchlistButton";
import WatchedMediaButton from "./ui/WatchedMediaButton";
import NetworkList from "./NetworkList";
import ProductionCompaines from "./ProductionCompaines";
import MoreInfoFooterButton from "./ui/MoreInfoFooterButton";
import WatchProviders from "./WatchProviders";
import Cast from "./Cast";

interface IProps {
  media: TvMediaExtended | MovieMediaExtended;
  mediaType: MediaTypes;
  credits: ICredits;
  extendedMedia: TvMediaExtended | MovieMediaExtended;
  loadingProps: boolean;
  errorLoadingProps: Error | null;
}

const screenDimensions = Dimensions.get("screen");

const MediaMoreInfo: React.FC<IProps> = (props) => {
  const {
    media,
    credits,
    mediaType,
    extendedMedia,
    loadingProps,
    errorLoadingProps,
  } = props;
  const navigation = useNavigation();
  const mediaPosterPath = media?.poster_path || media?.backdrop_path;

  const cast = credits?.cast;
  const directedBy = credits?.crew.filter((c) => {
    if (mediaType === "tv") {
      return c.job === "Director" || c.department === "Writing";
    }
    return c.job === "Director" || c.job === "Novel";
  });
  const people = [];

  if (directedBy && directedBy.length > 0) people.push(directedBy);
  if (cast && cast.length > 0) people.push(cast);

  function getTitle(): string {
    if (media && "title" in media) return media.title;
    return media && media.name;
  }

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      <Loader loading={loadingProps} />

      {/* {Error } */}
      {errorLoadingProps ? (
        <NothingToShow title={"Something went wrong"} problemType="error" />
      ) : null}

      {media && credits && extendedMedia && (
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
              ) : isTv(media) && media.original_name !== media.name ? (
                <Text className="text-sm text-text_tertiary pt-2">
                  Original Title:{"  "}
                  <Text className="text-text_primary">
                    {media.original_name}
                  </Text>
                </Text>
              ) : (isTvExtended(media) || isMovieExtended(media)) &&
                media.tagline ? (
                <Text className="text-sm text-text_tertiary pt-2">
                  <Text className="text-text_tertiary">
                    {(isTvExtended(media) || isMovieExtended(media)) &&
                      media.tagline}
                  </Text>
                </Text>
              ) : null}
            </View>

            {/* Genre Tags Row */}

            {media.genres.length > 0 ? (
              <View className="w-full h-10 justify-center items-center mt-5">
                <GenreTags
                  genreIdList={media.genres.map((genre) => genre.id)}
                  // genreIdList={media.genre_ids}
                  backgroundType="transparent"
                />
              </View>
            ) : null}

            {/* MEDIA IMAGE WITH STATS */}
            <NewMediaCardInfo media={media} />

            {/* DESCRIPTION */}
            {media.overview ? (
              <View className="px-4 mt-5 space-y-2">
                <Text className="text-xs text-text_highLight uppercase tracking-[3px]">
                  Overview
                </Text>
                <Text className="text-text_dark">{media.overview}</Text>
              </View>
            ) : null}

            {/* Other Info */}
            {isTvExtended(media) && media.next_episode_to_air ? (
              <View className="px-4 space-y-2 mt-8">
                <Text className="text-xs text-text_highLight uppercase tracking-[3px]">
                  Latest
                </Text>
                <Text className="text-text_dark">{`Episode S${
                  media.next_episode_to_air.season_number
                }E${
                  media.next_episode_to_air.episode_number
                } is expected to air on ${new Date(
                  media.next_episode_to_air.air_date
                ).toDateString()}.`}</Text>
                {/* <View className="px-4 mt-5 flex-row items-center justify-between space-x-2">
             <View className="bg-accent px-4 py-2 rounded-md">
               <Text className="text-text_secondary text-lg font-bold text-center">
                 {media.next_episode_to_air.season_number}
               </Text>
               <Text className="text-text_dark text-center">Season</Text>
             </View>

             <View className="bg-accent px-4 py-2 rounded-md">
               <Text className="text-text_secondary text-lg font-bold text-center">
                 {media.next_episode_to_air.episode_number}
               </Text>
               <Text className="text-text_dark text-center">Episode</Text>
             </View>

             <View className="bg-accent px-4 py-2 rounded-md h-full">
               <Text className="text-text_secondary text-lg font-bold text-center">
                 {new Date(
                   media.next_episode_to_air.air_date
                 ).toDateString()}
               </Text>
             </View>
           </View> */}
              </View>
            ) : null}
          </View>

          {/* BUTTONS CONTAINER */}
          <View className="w-full flex-row space-between gap-3 pl-4 mt-10">
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

          {/* <View className="mb-10 space-y-6">
            {cast ? (
              <View className="bg-neutral-900/60 pb-6 mx-2 rounded-lg">
                <Cast personList={credits.cast} title="Cast" />
              </View>
            ) : null}
            <View className="bg-neutral-900/60 pb-6 mx-2 rounded-md">
              {directedBy ? (
                <Cast
                  personList={credits.crew.filter((c) => c.job === "Director")}
                  title="Directed by"
                />
              ) : null}
            </View>
          </View> */}

          {/* Network List and Watch Provider row */}
          <View className="mt-10 space-y-12">
            {/* Networks available on */}
            {isTvExtended(media) && media.networks.length > 0 && (
              <NetworkList networks={media.networks} />
            )}

            {/* Movie Production companies */}
            {isMovieExtended(media) &&
              media.production_companies.length > 0 && (
                <ProductionCompaines productions={media.production_companies} />
              )}

            {/* Cast and Directors */}
            {/* <ScrollView
              horizontal
              className="space-x-2 mx-2"
              contentContainerStyle={{
                justifyContent: "center",
              }}
            >
              {directedBy.length > 0 ? (
                <View className="h-[176] pb-6 mx-2 rounded-lg bg-accent">
                  <Cast personList={directedBy} title="Director" />
                </View>
              ) : null}

              {cast.length > 0 ? (
                <View className="h-[176] pb-6 mx-2 rounded-lg bg-neutral-900/80">
                  <Cast personList={cast} title="Cast" />
                </View>
              ) : null}
            </ScrollView> */}

            {/* <FlatList
              className="space-x-2 mx-2"
              // contentContainerStyle={{
              //   justifyContent: "center",
              // }}
              data={[
                // <View className="h-[176] pb-6 mx-2 rounded-lg bg-accent">
                //   <Cast personList={directedBy} title="Director" />
                // </View>,
                <View className="h-[176] pb-6 mx-2 rounded-lg bg-neutral-900/80">
                  <Cast personList={cast} title="Cast" />
                </View>,
              ]}
              horizontal
              keyExtractor={() => String(Math.random() * 2)}
              // ListHeaderComponent={() => {
              //   return (
              //     <View className="h-[176] pb-6 mx-2 rounded-lg bg-accent">
              //       <Cast personList={directedBy} title="Director" />
              //     </View>
              //   );
              // }}
              renderItem={(peopleObj) => {
                // if (peopleObj.index === 0) {
                //   return (
                //     <View className="h-[176] pb-6 mx-2 rounded-lg bg-accent">
                //       <Cast personList={peopleObj.item} title="Director" />
                //     </View>
                //   );
                // }
                // if (peopleObj.index === 1) {
                //   return (
                //     <View className="h-[176] pb-6 mx-2 rounded-lg bg-neutral-900/80">
                //       <Cast personList={peopleObj.item} title="Cast" />
                //     </View>
                //   );
                // }

                return peopleObj.item;
              }}
            ></FlatList> */}

            {/* <Persons cast={cast} directedBy={directedBy} /> */}

            <View className="mt-8 h-[195]">
              <Cast cast={cast} directedBy={directedBy} title="Cast" />
            </View>

            {/* Platforms available on */}
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
                  //  @ts-ignore
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
                    // @ts-ignore
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

export default MediaMoreInfo;
