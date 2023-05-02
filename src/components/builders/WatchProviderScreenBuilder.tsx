import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
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
  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>([]);
  const [loadingNewMedias, setLoadingNewMedias] = useState<boolean>(false);
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);

  console.log("help", urlObjectLocal);

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
          [urlObjectLocal],
          filters
        );
        // if we received some data, then page exists.
        if (moreMedias.medias.length > 0) {
          setMedias((prev) => [...prev, ...moreMedias.medias]);
        } // else, no more pages to fetch. Block any further new loads.
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
  }, [pageNumber]);

  return (
    <View className="flex-1 bg-secondary min-w-full w-full items-center">
      {/* <View
        className="flex-row  items-center justify-between px-4 my-2 mx-2 bg-accent rounded-xl h-8"
        // style={{ backgroundColor: "rgb(4, 20, 10)" }}
        style={{ backgroundColor: "rgb(4, 20, 10)" }}
      >
        <Text className="text-text_tertiary mx-4">
          Contents available in {urlObjectLocal.queryParams.watch_region}
        </Text>
      </View> */}

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
              medias={medias}
              loadingNewMedias={loadingNewMedias}
              setPageNumber={setPageNumber}
              blockNewLoads={blockNewLoads}
              thumbnailQuality={thumbnailQuality}
            />
            {/* <RenderLoader /> */}
          </>
        ) : (
          !loadingNewMedias && <NothingToShow problemType="nothing" />
        )}
      </View>
    </View>
  );
};

export default WatchProviderScreenBuilder;
