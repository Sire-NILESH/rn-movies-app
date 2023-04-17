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

interface IProps {
  screenMediaType: MediaTypes;
  urlObject: IUrlObject;
}

const PersonMediasScreenBuilder: React.FC<IProps> = ({
  screenMediaType,
  urlObject,
}) => {
  const [urlObjectLocal, setUrlObjectlocal] = useState<IUrlObject>(() => {
    let urlObj = {} as IUrlObject;
    Object.assign(urlObj, urlObject);
    urlObj.url = urlObj.url + `/${screenMediaType}_credits`;
    return urlObj;
  });
  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>([]);
  const [loadingNewMedias, setLoadingNewMedias] = useState<boolean>(false);
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);

  console.log(urlObjectLocal);

  // useEffect(() => {
  //   const url = urlObject.url + `/${screenMediaType}_credits`;
  //   urlObject.url = url;
  // }, []);

  // Loading Data
  useEffect(() => {
    async function loadMedias() {
      const filters: IQueryParams = {};
      setLoadingNewMedias(true);
      try {
        const moreMedias = await getTileListScreenMedias(
          [urlObjectLocal],
          filters
        );
        // if we received some data, then page exists.
        if (moreMedias.medias.length > 0) {
          // console.log(moreMedias);
          // const sorted = moreMedias.medias.sort(
          //   (a, b) => b.episode_count - a.episode_count
          // );
          // episode_count
          setMedias((prev) => [...prev, ...moreMedias.medias]);
          // const sorted = setMedias((prev) => [...prev, ...moreMedias.medias]);
          // we will immediately bolck further medias from loading as the api sends all the data at once without pagination in this case pf '/person/{person_id}/{mediaType}_credits'
          setBlockNewLoads(true);
        }
      } catch (err) {
        setBlockNewLoads(true);
        setError(err as Error);
      }
      setLoadingNewMedias(false);
    }
    loadMedias();
  }, []);

  return (
    <View className="flex-1 bg-secondary min-w-full w-full items-center">
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

export default PersonMediasScreenBuilder;