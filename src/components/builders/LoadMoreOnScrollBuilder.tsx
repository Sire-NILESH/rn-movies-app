import { useCallback } from "react";
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
  screenType: "Search" | "Related";
  relatedScreenOptions?: {
    relatedToMediaId: number;
    mediaType: MediaTypes;
  };
  searchScreenOptions?: {
    searchQuery: string;
    searchCategory: MediaTypes;
  };
}

type TStatus = "loading" | "success" | "error";

const LoadMoreOnScrollBuilder: React.FC<IProps> = (props) => {
  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>([]);
  const [status, setStatus] = useState<TStatus>("loading");
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { allowNsfwContent } = useAllowNsfwContentHooks();

  // thumbnail images quality
  const { imgItemsSetting: thumbnailQuality } =
    useImageItemSetting("thumbnail");

  // related media query settings
  const {
    data: moreRelatedMedias,
    status: relatedMediaStatus,
    refetch: refetchRelatedMedias,
  } = useQuery({
    queryKey: [
      "related",
      props.relatedScreenOptions?.relatedToMediaId,
      props.relatedScreenOptions?.mediaType,
      allowNsfwContent.nsfw,
      pageNumber,
    ],
    queryFn: async () =>
      getRelatedMediasProps(
        props.relatedScreenOptions?.relatedToMediaId
          ? props.relatedScreenOptions?.relatedToMediaId
          : 1,
        props.relatedScreenOptions?.mediaType
          ? props.relatedScreenOptions?.mediaType
          : "movie",
        allowNsfwContent.nsfw,
        pageNumber
      ),
    staleTime: relatedTilesCacheConfig.staleTime,
    cacheTime: relatedTilesCacheConfig.cacheTime,
    enabled: false,
  });

  // search media query settings
  const {
    data: moreSearchMedias,
    status: searchMediaStatus,
    refetch: refetchSearchMedias,
  } = useQuery({
    queryKey: [
      "searchTiles",
      props.searchScreenOptions?.searchQuery
        ? props.searchScreenOptions?.searchQuery
        : "",
      props.searchScreenOptions?.searchCategory
        ? props.searchScreenOptions?.searchCategory
        : "multi",
      pageNumber,
      allowNsfwContent.nsfw,
    ],
    queryFn: async () =>
      searchRequest(
        props.searchScreenOptions?.searchQuery
          ? props.searchScreenOptions?.searchQuery
          : "",
        props.searchScreenOptions?.searchCategory
          ? props.searchScreenOptions?.searchCategory
          : "multi",
        pageNumber,
        allowNsfwContent.nsfw
      ),
    staleTime: searchTilesCacheConfig.staleTime,
    cacheTime: searchTilesCacheConfig.cacheTime,
    enabled: false,
  });

  // Request operation
  useEffect(() => {
    // For Related screen
    if (props.screenType === "Related" && props.relatedScreenOptions) {
      refetchRelatedMedias();
    }
    // For Search screen
    else if (props.screenType === "Search" && props.searchScreenOptions) {
      refetchSearchMedias();
    }
  }, [pageNumber]);

  // Related medias request operation's result management
  useEffect(() => {
    // if reached the end of the pages.
    if (pageNumber === moreRelatedMedias?.total_pages) {
      setBlockNewLoads(true);
    }

    // if we received some data, then page exists
    if (
      relatedMediaStatus === "success" &&
      moreRelatedMedias?.results.length > 0
    ) {
      setMedias((prev) => [...prev, ...moreRelatedMedias?.results]);
    }
  }, [moreRelatedMedias]);

  // Search medias request operation's result management
  useEffect(() => {
    // if reached the end of the pages.
    if (pageNumber === moreSearchMedias?.total_pages) {
      setBlockNewLoads(true);
    }

    // if we received some data, then page exists
    if (
      searchMediaStatus === "success" &&
      moreSearchMedias?.results.length > 0
    ) {
      setMedias((prev) => [...prev, ...moreSearchMedias?.results]);
    }
  }, [moreSearchMedias]);

  // Status("loading" | "success" | "error") manager accorfing to the screen type.
  useEffect(() => {
    // For Related screen
    if (props.screenType === "Related" && props.relatedScreenOptions) {
      setStatus(relatedMediaStatus);
    }
    // For Search screen
    else if (props.screenType === "Search" && props.searchScreenOptions) {
      setStatus(searchMediaStatus);
    }
  }, [relatedMediaStatus, searchMediaStatus]);

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
      {status === "loading" && medias.length === 0 ? (
        //  Loader
        <Loader loading={status === "loading" ? true : false} />
      ) : null}

      {status === "error" && medias.length === 0 ? (
        <NothingToShow
          title={"Something went wrong while loading content"}
          problemType={"error"}
        />
      ) : (
        // Tiles
        <View className="flex-1 relative w-full">
          {medias?.length > 0 ? (
            <TilesRenderedView
              medias={medias}
              loadingNewMedias={status === "loading" ? true : false}
              loadMoreItem={loadMoreItem}
              thumbnailQuality={thumbnailQuality}
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
