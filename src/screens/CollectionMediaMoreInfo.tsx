import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { IDbListMedia, MediaTypes } from "../../types/typings";
import { getMediaInfo } from "../utils/requests";
import FavouriteMediaButton from "../components/ui/FavouriteMediaButton";
import MediaMoreInfo from "../components/MediaMoreInfo";
import { useQuery } from "./../../node_modules/@tanstack/react-query";
import { moreInfoScreenCacheConfig } from "../config/requestCacheConfig";

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

  const {
    isLoading: loadingProps,
    data: screenProps,
    error: errorLoadingProps,
  } = useQuery({
    queryKey: ["moreInfo", mediaType, collectionMedia.mediaId],
    queryFn: () => getMediaInfo(collectionMedia.mediaId, mediaType),
    staleTime: moreInfoScreenCacheConfig.staleTime,
    cacheTime: moreInfoScreenCacheConfig.cacheTime,
  });

  extendedMedia = screenProps?.media;

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

  return (
    <MediaMoreInfo
      media={screenProps?.media}
      mediaType={mediaType}
      errorLoadingProps={errorLoadingProps as Error | null}
      loadingProps={loadingProps}
    />
  );
};

export default CollectionMediaMoreInfo;
