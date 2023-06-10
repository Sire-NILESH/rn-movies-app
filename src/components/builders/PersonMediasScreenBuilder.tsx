import { View } from "react-native";
import React, { useState } from "react";
import { IUrlObject, MediaTypes } from "../../../types/typings";
import { getTileListScreenMedias } from "../../utils/requests";
import TilesRenderedView from "../TilesRenderedView";
import NothingToShow from "../NothingToShow";
import useImageItemSetting from "../../hooks/useImageItemSetting";
import { useQuery } from "@tanstack/react-query";
import { personScreenCacheConfig } from "../../config/requestCacheConfig";
import Loader from "../ui/Loader";

interface IProps {
  screenMediaType: MediaTypes;
  urlObject: IUrlObject;
}

function loadMoreItem(): void {}

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

  // thumbnail images quality
  const { imgItemsSetting: thumbnailQuality } =
    useImageItemSetting("thumbnail");

  const { data: moreMedias, status } = useQuery({
    queryKey: ["personMedias", urlObjectLocal],
    queryFn: async () => getTileListScreenMedias([urlObjectLocal], {}),
    staleTime: personScreenCacheConfig.staleTime,
    cacheTime: personScreenCacheConfig.cacheTime,
  });

  return (
    <View className="flex-1 bg-secondary min-w-full w-full items-center">
      {/* Tiles */}
      <View className="flex-1 relative w-full px-2">
        {status === "loading" ? (
          //  Loader
          <Loader loading={status === "loading" ? true : false} />
        ) : null}

        {status === "error" && moreMedias?.medias?.length === 0 ? (
          <NothingToShow
            title={"Something went wrong while loading content"}
            problemType="error"
          />
        ) : moreMedias?.medias?.length > 0 ? (
          <TilesRenderedView
            medias={moreMedias?.medias}
            loadingNewMedias={status === "loading" ? true : false}
            loadMoreItem={loadMoreItem}
            thumbnailQuality={thumbnailQuality}
          />
        ) : (
          status !== "loading" && <NothingToShow problemType="nothing" />
        )}
      </View>
    </View>
  );
};

export default PersonMediasScreenBuilder;
