import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import {
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
    <MediaMoreInfo
      media={media}
      extendedMedia={extendedMedia}
      mediaType={mediaType}
      errorLoadingProps={errorLoadingProps}
      loadingProps={loadingProps}
    />
  );
};

export default CollectionMediaMoreInfo;
