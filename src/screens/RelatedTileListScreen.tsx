import { View } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { isMovieArray } from "../utils/helpers/helper";
import { getRelatedMediasProps } from "../utils/requests";

import TilesRenderedView from "../components/TilesRenderedView";
import useFetcher from "./../hooks/useFetcher";
import NothingToShow from "./../components/NothingToShow";

const RelatedTileListScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;
  // @ts-ignore
  const {
    relatedToMediaId,
    mediaType,
  }: {
    relatedToMediaId: number;
    mediaType: MediaTypes;
  } = route.params;

  const [medias, setMedias] = useState<MovieMedia[] | TvMedia[]>([]);
  const [loadingNewMedias, setLoadingNewMedias] = useState<boolean>(false);
  const [blockNewLoads, setBlockNewLoads] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);

  // Loading Data
  useEffect(() => {
    async function loadMedias() {
      setLoadingNewMedias(true);

      try {
        const moreMedias = await getRelatedMediasProps(
          relatedToMediaId,
          mediaType,
          pageNumber
        );

        // if we received some data, then page exists.
        if (moreMedias.length > 0) {
          setMedias((prev) => [...prev, ...moreMedias]);
        }

        // else, no more pages to fetch. Block any further new loads.
        else {
          setBlockNewLoads(true);
        }

        // if (moreMedias) {
        //   setMedias((prev) => [...prev, ...moreMedias]);
        // }
      } catch (err) {
        setError(err as Error);
      }

      setLoadingNewMedias(false);
    }
    loadMedias();
  }, [pageNumber, getRelatedMediasProps]);

  console.log(pageNumber);

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Similar",
    });
  }, []);

  return (
    <View className="flex-1 bg-stone-900 items-center py-2">
      {error ? (
        <NothingToShow />
      ) : (
        // Tiles
        <View className="flex-1 relative">
          {medias?.length > 0 ? (
            <TilesRenderedView
              medias={medias}
              loadingNewMedias={loadingNewMedias}
              setPageNumber={setPageNumber}
              blockNewLoads={blockNewLoads}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

export default RelatedTileListScreen;
