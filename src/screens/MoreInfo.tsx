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
import { getMediaInfo } from "../utils/requests";
import FavouriteMediaButton from "../components/ui/FavouriteMediaButton";
import MediaMoreInfo from "../components/MediaMoreInfo";
import { useQuery } from "./../../node_modules/@tanstack/react-query";

const MoreInfoScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  let prevMedia: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended =
    // @ts-ignore
    route.params?.media;

  const mediaType: MediaTypes = // @ts-ignore
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  const {
    isLoading: loadingProps,
    data: screenProps,
    error: errorLoadingProps,
  } = useQuery({
    queryKey: ["moreInfo", mediaType, prevMedia.id],
    queryFn: () => getMediaInfo(prevMedia.id, mediaType),
    staleTime: 1000 * 60 * 60 * 24, //24hours
  });

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
            media={prevMedia || (screenProps?.media && screenProps?.media)}
            mediaId={prevMedia.id || screenProps?.media.id}
            mediaType={mediaType}
          />
        );
      },
    });
  }, [screenProps]);

  return (
    <MediaMoreInfo
      media={screenProps?.media}
      mediaType={mediaType}
      errorLoadingProps={errorLoadingProps as Error | null}
      loadingProps={loadingProps}
    />
  );
};

export default memo(MoreInfoScreen);
