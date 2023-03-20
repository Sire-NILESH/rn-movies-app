import { useEffect, useState } from "react";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { showErrorAlert } from "../utils/helpers/helper";

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
    // it was okay to directly add the fetcher func here in the dependecy array becauses it comes from a non JSX component, a simple tsx file and will never change. Else you can never add any fucntion directly into the dependencies that come from a component.
  }, [fetcher, ...params]);

  // if (errorLoadingProps && !loadingProps) {
  //   showErrorAlert();
  // }

  return { screenProps, loadingProps, errorLoadingProps };
};

export default useFetcher;
