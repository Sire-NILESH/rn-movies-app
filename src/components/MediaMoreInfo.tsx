import { View, Text } from "react-native";
import React from "react";
import {
  IAllWatchProviderData,
  ICredits,
  MediaTypes,
  MovieMediaExtended,
  TvMediaExtended,
} from "../../types/typings";
import { useNavigation } from "@react-navigation/native";
import Loader from "./ui/Loader";
import NothingToShow from "./NothingToShow";
import { ScrollView } from "react-native-gesture-handler";
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
import RevenueStats from "./ui/RevenueStats";
import useImgSettings from "../hooks/useImgSettings";
import MoreInfoBackdrop from "./MoreInfoBackdrop";

interface IProps {
  media: TvMediaExtended | MovieMediaExtended;
  mediaType: MediaTypes;
  extendedMedia: TvMediaExtended | MovieMediaExtended;
  credits: ICredits;
  watchProvidersData: IAllWatchProviderData;
  loadingProps: boolean;
  errorLoadingProps: Error | null;
}

const MediaMoreInfo: React.FC<IProps> = (props) => {
  const {
    media,
    credits,
    watchProvidersData,
    mediaType,
    extendedMedia,
    loadingProps,
    errorLoadingProps,
  } = props;
  const navigation = useNavigation();
  const mediaPosterPath = media?.poster_path || media?.backdrop_path;

  // img setttings state
  const { allImgItemsSettings } = useImgSettings();

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

      {media &&
        credits &&
        extendedMedia &&
        allImgItemsSettings !== undefined && (
          <ScrollView className="flex-1 pb-24">
            {/* BackDrop Image */}
            <MoreInfoBackdrop
              mediaPosterPath={mediaPosterPath}
              imgQuality={allImgItemsSettings?.banner?.value}
              // allImgQualities={allImgItemsSettings}
            />

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
              <NewMediaCardInfo
                media={media}
                imgQuality={allImgItemsSettings?.banner?.value}
              />

              {isMovieExtended(media) && media.budget ? (
                <RevenueStats budget={media.budget} revenue={media.revenue} />
              ) : null}

              {/* DESCRIPTION */}
              {media.overview ? (
                <View className="px-4 mt-5 space-y-2">
                  <Text className="font-semibold text-text_tertiary">
                    Overview
                  </Text>
                  <Text className="text-text_dark">{media.overview}</Text>
                </View>
              ) : null}

              {/* PRODUCED IN */}
              {(isTvExtended(media) || isMovieExtended(media)) &&
              media.production_countries?.length > 0 ? (
                <View className="flex-row items-start space-x-2 px-4 mt-5">
                  <Text className="font-semibold text-text_tertiary">
                    Produced in :
                  </Text>
                  <View className="w-[78%] flex-row items-center flex-wrap">
                    {media.production_countries.map((c, i) => {
                      return (
                        <View
                          key={c.iso_3166_1}
                          className="flex-row items-center"
                        >
                          <Text className="text-text_dark">{c.name}</Text>
                          {i !== media.production_countries.length - 1 && (
                            <Text className="text-text_dark">, </Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : null}

              {/* Other Info */}
              {isTvExtended(media) && media.next_episode_to_air ? (
                <View className="px-4 space-y-2 mt-5">
                  <Text className="font-semibold text-text_tertiary">
                    Latest
                  </Text>
                  <Text className="text-text_dark">{`Episode S${
                    media.next_episode_to_air.season_number
                  }E${
                    media.next_episode_to_air.episode_number
                  } is expected to air on ${new Date(
                    media.next_episode_to_air.air_date
                  ).toDateString()}.`}</Text>
                </View>
              ) : null}
            </View>

            {/* BUTTONS CONTAINER */}
            <View className="w-full flex-row space-between gap-3 pl-4 mt-4">
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
            <View className="mt-8">
              {/* Cast and Crew */}
              {cast.length > 0 || directedBy.length > 0 ? (
                <View className="h-[195]">
                  <Cast
                    cast={cast}
                    directedBy={directedBy}
                    title="Behind the scenes"
                  />
                </View>
              ) : null}

              {/* Movie Production companies */}
              {isMovieExtended(media) &&
                media.production_companies.length > 0 && (
                  <ProductionCompaines
                    productions={media.production_companies}
                    imgQuality={allImgItemsSettings?.companies?.value}
                  />
                )}

              {/* Networks available on */}
              {isTvExtended(media) && media.networks.length > 0 && (
                <NetworkList
                  networks={media.networks}
                  imgQuality={allImgItemsSettings?.companies?.value}
                />
              )}

              {/* Platforms available on */}
              <WatchProviders
                mediaId={media.id}
                mediaType={mediaType}
                watchProvidersData={watchProvidersData}
              />
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
