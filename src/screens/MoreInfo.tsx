import React, { memo } from "react";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import {
  ICredits,
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../../types/typings";
import useFetcher from "../hooks/useFetcher";
import { getMediaInfo } from "../utils/requests";
import FavouriteMediaButton from "../components/ui/FavouriteMediaButton";
import MediaMoreInfo from "../components/MediaMoreInfo";

const MoreInfoScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  let prevMedia: MovieMedia | TvMedia | TvMediaExtended | MovieMediaExtended =
    // @ts-ignore
    route.params?.media;

  const mediaType: MediaTypes = // @ts-ignore
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  let extendedMedia;

  const {
    screenProps,
    loadingProps,
    errorLoadingProps,
  }: {
    screenProps: {
      media: TvMediaExtended | MovieMediaExtended;
      mediaCredits: ICredits;
    };
    loadingProps: boolean;
    errorLoadingProps: Error | null;
  } = useFetcher(getMediaInfo, [prevMedia.id, mediaType]);

  extendedMedia = screenProps?.media;

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
      extendedMedia={extendedMedia}
      credits={screenProps?.mediaCredits}
      mediaType={mediaType}
      errorLoadingProps={errorLoadingProps}
      loadingProps={loadingProps}
    />
  );
};

export default memo(MoreInfoScreen);

//  <>
//       {/* Loader */}
//       {loadingProps && !screenProps ? (
//         <Loader loading={loadingProps} />
//       ) : (
//         <MediaMoreInfo
//           media={screenProps && screenProps?.media}
//           extendedMedia={extendedMedia}
//           mediaType={mediaType}
//           errorLoadingProps={errorLoadingProps}
//           loadingProps={loadingProps}
//         />
//       )}
//     </>
