import { View, Text } from "react-native";
import React from "react";
import {
  MediaTypes,
  MovieMediaHybrid,
  TvMediaHybrid,
} from "../../types/typings";
import { useNavigation } from "@react-navigation/native";
import Loader from "./ui/Loader";
import NothingToShow from "./NothingToShow";
import { ScrollView } from "react-native-gesture-handler";
import {
  getDeviceDimensions,
  isMovie,
  isMovieExtended,
  isTv,
  isTvExtended,
} from "../utils/helpers/helper";
import GenreTags from "./GenreTags";
import MediaCardInfo from "./MediaCardInfo";
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
import CollectionCard from "./CollectionCard";
import MediaStats from "./ui/MediaStats";
import LinkButton from "./ui/LinkButton";

interface IProps {
  media: MovieMediaHybrid | TvMediaHybrid;
  mediaType: MediaTypes;
  loadingProps: boolean;
  errorLoadingProps: Error | null;
}

const windowHeight = getDeviceDimensions("window").height;

const MediaMoreInfo: React.FC<IProps> = (props) => {
  const { media, mediaType, loadingProps, errorLoadingProps } = props;
  const navigation = useNavigation();
  const mediaPosterPath = media?.poster_path || media?.backdrop_path;

  // img setttings state
  const { allImgItemsSettings } = useImgSettings();

  // console.log(isMovie(media) ? media.release_dates : media.content_ratings);

  const credits =
    media && isMovie(media) ? media?.credits : media?.aggregate_credits;
  const cast = credits?.cast;

  const directedBy = media?.credits.crew.filter((c) => {
    if (mediaType === "tv") {
      return c.job === "Director" || c.department === "Writing";
    }
    return c.job === "Director" || c.job === "Novel";
  });

  function getTitle(): string {
    if (media && "title" in media) return media.title;
    return media && media.name;
  }

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      {/* <Loader loading={loadingProps || allImgItemsSettings === undefined} /> */}
      <Loader loading={loadingProps} />

      {/* {Error } */}
      {errorLoadingProps ? (
        <NothingToShow title={"Something went wrong"} problemType="error" />
      ) : null}

      {media && credits && media && allImgItemsSettings !== undefined && (
        <ScrollView className="flex-1 pb-24">
          {/* BackDrop Image */}
          <MoreInfoBackdrop
            mediaPosterPath={mediaPosterPath}
            imgQuality={allImgItemsSettings?.banner?.value}
            // allImgQualities={allImgItemsSettings}
          />

          {/* Content Title/name and original title/name mt-64 */}
          <View className="flex-1 pt-6">
            {/* Title */}
            <View
              className="px-4 w-[100%]"
              style={{ marginTop: windowHeight * 0.33 }}
            >
              <Text className="text-[40px] font-semibold text-text_highLight object-cover">
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
                  <Text className="text-text_secondary">
                    {(isTvExtended(media) || isMovieExtended(media)) &&
                      media.tagline}
                  </Text>
                </Text>
              ) : null}
            </View>

            {/* Genre Tags Row */}

            {media.genres.length > 0 ? (
              <View className="w-full h-10 flex-row items-center mt-5">
                <GenreTags
                  headerComponent={() => (
                    <View className="mr-2 ml-3 bg-neutral-800/80 border border-stone-600/50 px-4 h-8 rounded-xl items-center justify-center">
                      <Text className="text-text_highLight">
                        {media.status}
                        {/* {console.log(media.status)} */}
                      </Text>
                    </View>
                  )}
                  genreIdList={media.genres.map((genre) => genre.id)}
                  // genreIdList={media.genre_ids}
                  backgroundType="transparent"
                />
              </View>
            ) : null}

            {/* MEDIA IMAGE WITH STATS */}
            <View
              className="mt-5 px-3"
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
              }}
            >
              <MediaCardInfo
                media={media}
                imgQuality={allImgItemsSettings?.banner?.value}
              />
            </View>

            {/* POPULARITY AND MEDIATYPE INFO */}
            <View className="h-[82px]">
              <MediaStats media={media} />
            </View>

            {isMovieExtended(media) && (media.budget || media.revenue) ? (
              <RevenueStats budget={media.budget} revenue={media.revenue} />
            ) : null}

            {/* DESCRIPTION */}
            {media.overview ? (
              <View className="px-4 mt-4">
                {/* <Text className="font-semibold text-text_tertiary">
                  Overview
                </Text> */}
                <Text className="text-text_dark text-sm">
                  <Text className="font-semibold text-text_tertiary">
                    {"Overview :  "}
                  </Text>
                  {media.overview}
                </Text>
              </View>
            ) : null}

            {/* PRODUCED IN */}
            {(isTvExtended(media) || isMovieExtended(media)) &&
            media.production_countries?.length > 0 ? (
              <View className="flex-row items-start space-x-2 px-4 mt-4">
                <Text className="text-text_dark" style={{ lineHeight: 20 }}>
                  <Text className="font-semibold text-text_tertiary">
                    Produced in :{" "}
                  </Text>
                  {media.production_countries
                    .map((c) => {
                      return c.name;
                    })
                    .join(", ")}
                  {". "}
                </Text>
              </View>
            ) : null}

            {/* Other Info */}
            {isTvExtended(media) && media.next_episode_to_air ? (
              <View className="flex-row items-start space-x-2 px-4 mt-4">
                <Text className="text-text_dark" style={{ lineHeight: 20 }}>
                  <Text className="font-semibold text-text_tertiary">
                    Latest :{" "}
                  </Text>
                  {`Episode S${media.next_episode_to_air.season_number}E${
                    media.next_episode_to_air.episode_number
                  } to be aired on ${new Date(
                    media.next_episode_to_air.air_date
                  ).toDateString()}.`}
                </Text>
              </View>
            ) : null}

            {/* SOURCE TMDB */}
            <View className="px-4 flex-row gap-1 items-center justify-start mt-[3px]">
              <Text className="text-sm text-text_tertiary font-semibold">
                {"More info : "}{" "}
                <Text className="text-text_dark">{"TMDB"}</Text>
              </Text>

              <View className="rounded-full overflow-hidden">
                <LinkButton
                  linkURL={`https://www.themoviedb.org/${
                    isMovie(media) ? "movie" : "tv"
                  }/${media.id}/`}
                  size="small"
                />
              </View>
            </View>
          </View>

          {/* BUTTONS CONTAINER */}
          <View className="w-full flex-row space-between gap-3 pl-4 mt-2">
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
              // <View className="h-[195]">
              <View className="h-72">
                <Cast
                  cast={mediaType === "tv" ? cast.slice(0, 25) : cast}
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

            {/* Belongs to collection */}
            {isMovieExtended(media) && media.belongs_to_collection && (
              <CollectionCard
                collection={media.belongs_to_collection}
                genres={media.genres}
                imgThumbnailQuality={allImgItemsSettings?.thumbnail?.value}
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
            <View className="min-h-[250px]">
              <WatchProviders
                mediaId={media.id}
                mediaType={mediaType}
                mediaTitle={getTitle()}
                watchProvidersData={media["watch/providers"].results}
              />
            </View>
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
                    isTvExtended(media) && media?.number_of_seasons
                  } seasons and ${
                    isTvExtended(media) && media?.number_of_episodes
                  } episodes`}
                  onPressHandler={() => {
                    // @ts-ignore
                    navigation.push("SeasonsStackScreen", {
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
          {/* Bottom padding, for devices using gestures, a padding from below is good to have */}
          <View className="my-3" />
        </ScrollView>
      )}
    </View>
  );
};

export default MediaMoreInfo;
