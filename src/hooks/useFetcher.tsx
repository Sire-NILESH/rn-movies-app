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
        setScreenProps(data);
        setLoadingProps(false);
      } catch (err) {
        setErrorLoadingProps(err as Error);
        setLoadingProps(false);
      }
    }
    fetchRequests();
  }, [fetcher, ...params]);

  return { screenProps, loadingProps, errorLoadingProps };
};

export default useFetcher;
