import { useEffect, useState } from "react";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";

interface IProps {
  mediaType: MediaTypes;
}

interface IScreenProps {
  genreId: number;
  genreName: string;
  genreMedias: TvMedia[] | MovieMedia[];
}

const useFetcher = (fetcher: any, params: any[]) => {
  const [screenProps, setScreenProps] = useState<any | null>(null);
  // const [screenProps, setScreenProps] = useState<IScreenProps[] | null>(null);
  const [loadingProps, setLoadingProps] = useState<boolean>(false);
  const [errorLoadingProps, setErrorLoadingProps] = useState<Error | null>(
    null
  );

  useEffect(() => {
    setLoadingProps(true);
    async function fetchRequests() {
      try {
        const data = await fetcher(...params);
        setLoadingProps(false);
        setScreenProps(data);
      } catch (err) {
        setLoadingProps(false);
        setErrorLoadingProps(err as Error);
      }
    }
    fetchRequests();
  }, [fetcher, ...params]);

  return { screenProps, loadingProps, errorLoadingProps };
};

export default useFetcher;
