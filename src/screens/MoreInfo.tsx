import React, { memo } from "react";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import {
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../../types/typings";
import useFetcher from "../hooks/useFetcher";
import { getMediaInfo } from "../utils/requests";
import FavouriteMediaButton from "../components/ui/FavouriteMediaButton";

import {
  useDefaultLanguageHooks,
  useDefaultYearHooks,
} from "../hooks/reduxHooks";
import MediaMoreInfo from "../components/MediaMoreInfo";

const MoreInfoScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { defaultLanguage } = useDefaultLanguageHooks();
  console.log("LANGUAGE SET RIGHT NOW IS", defaultLanguage);

  const { defaultYear } = useDefaultYearHooks();
  console.log("DEFAULT YEAR SET RIGHT NOW IS", defaultYear);

  const { navigation, route } = props;
  let prevMedia: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended =
    // @ts-ignore
    route.params?.media;

  const mediaType: MediaTypes = // @ts-ignore
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  let extendedMedia;

  const {
    screenProps: media,
    loadingProps,
    errorLoadingProps,
  }: {
    screenProps: TvMediaExtended | MovieMediaExtended;
    loadingProps: boolean;
    errorLoadingProps: Error | null;
  } = useFetcher(getMediaInfo, [prevMedia.id, mediaType]);

  extendedMedia = media;

  function getTitle(): string {
    if ("title" in prevMedia) return prevMedia.title;
    return prevMedia.name;
  }

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: getTitle(),
      headerRight: () => {
        return (
          <FavouriteMediaButton
            media={prevMedia || media}
            mediaId={prevMedia.id || media.id}
            mediaType={mediaType}
          />
        );
      },
    });
  }, [media]);

  return (
    <MediaMoreInfo
      media={media}
      extendedMedia={extendedMedia}
      mediaType={mediaType}
      errorLoadingProps={errorLoadingProps}
      loadingProps={loadingProps}
    />
  );
};

export default memo(MoreInfoScreen);
