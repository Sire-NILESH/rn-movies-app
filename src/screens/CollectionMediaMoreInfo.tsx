import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import {
  ICredits,
  IDbListMedia,
  IReduxListMedia,
  MediaTypes,
  MovieMediaExtended,
  TvMediaExtended,
} from "../../types/typings";
import useFetcher from "../hooks/useFetcher";
import { getMediaInfo } from "../utils/requests";
import FavouriteMediaButton from "../components/ui/FavouriteMediaButton";
import MediaMoreInfo from "../components/MediaMoreInfo";

const CollectionMediaMoreInfo: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;

  const collectionMedia: IDbListMedia =
    // @ts-ignore
    route.params?.collectionMedia;

  const mediaType: MediaTypes = // @ts-ignore
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  let extendedMedia;

  const parametersForFetcher = [collectionMedia.mediaId, mediaType];

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
  } = useFetcher(getMediaInfo, parametersForFetcher);

  extendedMedia = screenProps?.media;

  // function getTitle(): string {
  //   if (media && "title" in media) return media.title;
  //   return media && media.name;
  // }

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: collectionMedia.mediaTitle,
      headerRight: (props) => {
        return (
          <FavouriteMediaButton
            media={screenProps?.media}
            mediaId={collectionMedia.mediaId || screenProps?.media.id}
            mediaType={mediaType}
          />
        );
      },
    });
  }, [screenProps]);

  console.log("Media from collection more info", screenProps?.media);

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

export default CollectionMediaMoreInfo;
