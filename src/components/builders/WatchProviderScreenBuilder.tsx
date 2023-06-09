import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  IQueryParams,
  IUrlObject,
  MediaTypes,
  MovieMedia,
  TvMedia,
} from "../../../types/typings";
import { getTileListScreenMedias } from "../../utils/requests";
import TilesRenderedView from "../TilesRenderedView";
import NothingToShow from "../NothingToShow";
import useImageItemSetting from "../../hooks/useImageItemSetting";
import FilterTilesButton from "../ui/FilterTilesButton";
import TilesFilterModal from "../TilesFilterModal";
import GenreTags from "../GenreTags";

interface IProps {
  screenMediaType: MediaTypes;
  urlObject: IUrlObject;
}

const WatchProviderScreenBuilder: React.FC<IProps> = ({
  screenMediaType,
  urlObject,
}) => {
  const [urlObjectLocal, setUrlObjectlocal] = useState<IUrlObject>(() => {
    let urlObj = {} as IUrlObject;
    Object.assign(urlObj, urlObject);
    urlObj.url = urlObj.url + `/${screenMediaType}`;
    return urlObj;
  });

  const [currentShowingPlaylist, setCurrentShowingPlaylist] = useState<
    IUrlObject[]
  >([urlObjectLocal]);

  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>([]);
  const [loadingNewMedias, setLoadingNewMedias] = useState<boolean>(false);
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [genreIdsFromFilter, setGenreIdsFromFilter] = useState<
    number[] | null
  >();

  // thumbnail images quality
  const { imgItemsSetting: thumbnailQuality } =
    useImageItemSetting("thumbnail");

  // Loading Data
  useEffect(() => {
    async function loadMedias() {
      const filters: IQueryParams = { page: pageNumber };
      setLoadingNewMedias(true);
      try {
        const moreMedias = await getTileListScreenMedias(
          currentShowingPlaylist,
          filters
        );

        // if reached the end of the pages.
        if (pageNumber === moreMedias.total_pages) {
          setBlockNewLoads(true);
        }

        // if we received some data, then page exists.
        if (moreMedias.medias.length > 0) {
          setMedias((prev) => [...prev, ...moreMedias.medias]);
        }

        // else, no more pages to fetch. Block any further new loads.
        else {
          setBlockNewLoads(true);
        }
      } catch (err) {
        setBlockNewLoads(true);
        setError(err as Error);
      }
      setLoadingNewMedias(false);
    }
    loadMedias();
  }, [pageNumber, currentShowingPlaylist]);

  const onCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const onToggleFilterModal = () => {
    setShowFilterModal((prev) => (prev === true ? false : true));
  };

  const onCloseWithConfirmFiltersModal = (playlists: IUrlObject[]) => {
    if (playlists.length > 0) {
      setError(null);
      setCurrentShowingPlaylist(playlists);
      setPageNumber(1);
      setMedias([]);
      setShowFilterModal(false);

      const genrelist = playlists[0].queryParams.with_genres
        ?.split(",")
        .map((g) => Number(g));

      if (genrelist && genrelist?.length > 0) {
        setGenreIdsFromFilter(genrelist);
      } else {
        setGenreIdsFromFilter([]);
      }

      // since we now have new set of playlists, we can unblock new loads
      setBlockNewLoads(false);
    }
  };

  const loadMoreItem = useCallback(() => {
    // Increase the page number by 1 only if the load new medias is enabled
    if (!blockNewLoads && !loadingNewMedias) setPageNumber((prev) => prev + 1);
  }, [blockNewLoads, loadingNewMedias]);

  return (
    <View className="flex-1 relative bg-secondary min-w-full w-full items-center">
      {/* Genre Tags Scrollable Row on top, if user selected some genres */}
      {genreIdsFromFilter && genreIdsFromFilter.length > 0 ? (
        <View className="absolute z-50 rounded-xl my-2 w-[96%] py-2 bg-neutral-900/90 overflow-hidden border border-neutral-700/80">
          <View>
            <GenreTags
              genreIdList={genreIdsFromFilter}
              backgroundType="transparent"
            />
          </View>
        </View>
      ) : null}

      {showFilterModal ? (
        <TilesFilterModal
          isVisible={showFilterModal}
          closeModal={onCloseFilterModal}
          mediaListType={screenMediaType}
          playlist={currentShowingPlaylist[0]}
          closeWithConfirm={onCloseWithConfirmFiltersModal}
        />
      ) : null}

      {/* Tiles */}
      <View className="flex-1 relative w-full px-2">
        {error && medias.length === 0 ? (
          <NothingToShow
            title={"Something went wrong while loading content"}
            problemType="error"
          />
        ) : medias?.length > 0 ? (
          <>
            <TilesRenderedView
              tilesHeader={() => {
                if (genreIdsFromFilter && genreIdsFromFilter.length > 0) {
                  return <View className="h-14 mt-1" />;
                } else {
                  return null;
                }
              }}
              medias={medias}
              loadingNewMedias={loadingNewMedias}
              loadMoreItem={loadMoreItem}
              thumbnailQuality={thumbnailQuality}
            />
            {/* <RenderLoader /> */}

            <FilterTilesButton onShowFilterModal={onToggleFilterModal} />
          </>
        ) : !loadingNewMedias ? (
          <>
            <NothingToShow problemType="nothing" />

            <FilterTilesButton onShowFilterModal={onToggleFilterModal} />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default WatchProviderScreenBuilder;
