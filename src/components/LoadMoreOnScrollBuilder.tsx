import { View } from "react-native";
import { useState, useEffect } from "react";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { getRelatedMediasProps, searchRequest } from "../utils/requests";
import TilesRenderedView from "../components/TilesRenderedView";
import NothingToShow from "./../components/NothingToShow";
import { showErrorAlert } from "../utils/helpers/helper";

interface IProps {
  screenType: "Search" | "Related";
  relatedScreenOptions?: {
    relatedToMediaId: number;
    mediaType: MediaTypes;
  };
  searchScreenOptions?: {
    searchQuery: string;
    searchCategory: MediaTypes;
    //  abortController: AbortController;
  };
}

const LoadMoreOnScrollBuilder: React.FC<IProps> = (props) => {
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
        let moreMedias: any;

        // For Related screen
        if (props.screenType === "Related" && props.relatedScreenOptions) {
          moreMedias = await getRelatedMediasProps(
            props.relatedScreenOptions.relatedToMediaId,
            props.relatedScreenOptions.mediaType,
            pageNumber
          );
        }

        // For Search screen
        else if (props.screenType === "Search" && props.searchScreenOptions) {
          // @ts-ignore
          const { results: searchResults } = await searchRequest(
            props.searchScreenOptions.searchQuery
              ? props.searchScreenOptions.searchQuery
              : "",
            props.searchScreenOptions.searchCategory
              ? props.searchScreenOptions.searchCategory
              : "multi",
            pageNumber
            // props.searchScreenOptions.abortController
          );
          moreMedias = searchResults;
          //  console.log("more medias", moreMedias);
        }

        // if we received some data, then page exists.
        if (moreMedias.length > 0) {
          setMedias((prev) => [...prev, ...moreMedias]);
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
  }, [pageNumber, getRelatedMediasProps, searchRequest]);

  console.log("pageNumber", pageNumber);

  // Show alert on error
  if (error && !loadingNewMedias) {
    const alertString = medias?.length > 0 ? "more " : "";
    showErrorAlert(`Something went wrong while loading ${alertString}content.`);
  }

  return (
    <View className="flex-1 bg-tertiary items-center">
      {error && medias.length === 0 ? (
        <NothingToShow title={"Something went wrong while loading content"} />
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
          ) : (
            !loadingNewMedias && <NothingToShow />
          )}
        </View>
      )}
    </View>
  );
};

export default LoadMoreOnScrollBuilder;
