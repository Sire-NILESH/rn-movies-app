import { useCallback, useMemo } from "react";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { MediaTypes, MovieMedia, TvMedia } from "../../../types/typings";
import { getRelatedMediasProps, searchRequest } from "../../utils/requests";
import TilesRenderedView from "../TilesRenderedView";
import NothingToShow from "../NothingToShow";
import { showErrorToast } from "../../utils/helpers/helper";
import useImageItemSetting from "../../hooks/useImageItemSetting";
import { useAllowNsfwContentHooks } from "../../hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import {
  relatedTilesCacheConfig,
  searchTilesCacheConfig,
} from "../../config/requestCacheConfig";
import Loader from "../ui/Loader";

interface IProps {
  screenType: "Search" | "Related" | "SearchPerson";
  relatedScreenOptions?: {
    relatedToMediaId: number;
    mediaType: MediaTypes;
  };
  searchScreenOptions?: {
    searchQuery: string;
    searchCategory: MediaTypes | "person";
  };
}

const getSearchQueryObject = (props: {
  searchQuery: string;
  searchCategory: MediaTypes | "person";
  nsfw: boolean;
  pageNumber: number;
}) => {
  return {
    queryKey: [
      "searchTiles",
      props.searchQuery ? props.searchQuery : "",
      props.searchCategory ? props.searchCategory : "multi",
      props.pageNumber,
      props.nsfw,
    ],
    queryFn: async () =>
      searchRequest(
        props.searchQuery ? props.searchQuery : "",
        props.searchCategory ? props.searchCategory : "multi",
        props.pageNumber,
        props.nsfw
      ),
    staleTime: searchTilesCacheConfig.staleTime,
    cacheTime: searchTilesCacheConfig.cacheTime,
    enabled: false,
  };
};

const getRelatedQueryObject = (props: {
  relatedToMediaId: number;
  mediaType: MediaTypes;
  nsfw: boolean;
  pageNumber: number;
}) => {
  return {
    queryKey: [
      "related",
      props.relatedToMediaId,
      props.mediaType,
      props.pageNumber,
      props.nsfw,
    ],
    queryFn: async () =>
      getRelatedMediasProps(
        props.relatedToMediaId ? props.relatedToMediaId : 1,
        props.mediaType ? props.mediaType : "movie",
        props.nsfw,
        props.pageNumber
      ),
    staleTime: relatedTilesCacheConfig.staleTime,
    cacheTime: relatedTilesCacheConfig.cacheTime,
    enabled: false,
  };
};

const LoadMoreOnScrollBuilder: React.FC<IProps> = (props) => {
  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>([]);
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { allowNsfwContent } = useAllowNsfwContentHooks();

  // thumbnail images quality
  const { imgItemsSetting: thumbnailQuality } =
    useImageItemSetting("thumbnail");

  const queryObj = useMemo(() => {
    if (props.screenType === "Related" && props.relatedScreenOptions) {
      return getRelatedQueryObject({
        relatedToMediaId: props.relatedScreenOptions?.relatedToMediaId,
        mediaType: props.relatedScreenOptions?.mediaType,
        nsfw: allowNsfwContent.nsfw,
        pageNumber,
      });
    } else if (
      props.screenType === "Search" &&
      props.searchScreenOptions &&
      props.searchScreenOptions.searchCategory
    ) {
      return getSearchQueryObject({
        searchQuery: props.searchScreenOptions?.searchQuery
          ? props.searchScreenOptions?.searchQuery
          : "",
        searchCategory: props.searchScreenOptions?.searchCategory
          ? props.searchScreenOptions?.searchCategory
          : "multi",
        nsfw: allowNsfwContent.nsfw,
        pageNumber,
      });
    }
  }, [pageNumber]);

  // related media query settings
  const {
    data: moreMedias,
    status,
    refetch,
  } = useQuery({
    queryKey: queryObj?.queryKey,
    queryFn: queryObj?.queryFn,
    staleTime: relatedTilesCacheConfig.staleTime,
    cacheTime: relatedTilesCacheConfig.cacheTime,
    enabled: false,
  });

  // Request operation
  useEffect(() => {
    refetch();
  }, [pageNumber]);

  // Related/Search medias request operation's result management
  useEffect(() => {
    // if reached the end of the pages.
    if (pageNumber === moreMedias?.total_pages) {
      setBlockNewLoads(true);
    }

    // if we received some data, then page exists
    if (status === "success" && moreMedias?.results.length > 0) {
      setMedias((prev) => [...prev, ...moreMedias?.results]);
    }
  }, [moreMedias]);

  // Show alert on error
  if (status === "error") {
    const alertString = medias?.length > 0 ? "more " : "";

    showErrorToast(
      "Error !",
      `Something went wrong while loading ${alertString}content.`
    );
  }

  const loadMoreItem = useCallback(() => {
    // Increase the page number by 1 only if the load new medias is enabled
    if (!blockNewLoads && status !== "loading")
      setPageNumber((prev) => prev + 1);
  }, [blockNewLoads, status]);

  return (
    <View
      className="flex-1 bg-secondary
     min-w-full items-center px-2"
    >
      {status === "error" && medias.length === 0 ? (
        <NothingToShow
          title={"Something went wrong while loading content"}
          problemType={"error"}
        />
      ) : (
        // Tiles
        <View className="flex-1 relative w-full">
          {status === "loading" && medias.length === 0 ? (
            //  Loader
            <Loader loading={status === "loading" ? true : false} />
          ) : null}

          {medias?.length > 0 ? (
            <TilesRenderedView
              medias={medias}
              loadingNewMedias={status === "loading" ? true : false}
              loadMoreItem={loadMoreItem}
              thumbnailQuality={thumbnailQuality}
              contentType={
                props.screenType === "Search" &&
                props.searchScreenOptions?.searchCategory === "person"
                  ? "card"
                  : "tiles"
              }
            />
          ) : (
            status !== "loading" && <NothingToShow problemType="nothing" />
          )}
        </View>
      )}
    </View>
  );
};

export default LoadMoreOnScrollBuilder;
