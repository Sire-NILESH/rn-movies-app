import React, { useEffect, memo, useState, useCallback } from "react";
import { View } from "react-native";
import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { IDBCollectionMedia } from "../../types/typings";
import CollectionRow from "../components/CollectionRow";
import { getMediasFromCollection } from "../storage/database";
import NothingToShow from "../components/NothingToShow";
import useImageItemSetting from "../hooks/useImageItemSetting";
import Loader from "../components/ui/Loader";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { getDeviceDimensions } from "../utils/helpers/helper";

const windowWidth = getDeviceDimensions("window").width;

const CollectionTopTabScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, collectionType, screenMediaType } = props;

  const [medias, setMedias] = useState<IDBCollectionMedia[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isFirstLoad, setisFirstLoad] = useState(true);

  const currentDate = new Date(Date.now());
  const currentYear = currentDate.getFullYear();
  const today = currentDate.toDateString();
  const yesterday = new Date(
    currentDate.setDate(currentDate.getDate() - 1)
  ).toDateString();

  // thumbnail images quality
  const { imgItemsSetting: thumbnailQuality } =
    useImageItemSetting("thumbnail");

  // Check if the screen is in focus/in-front-of-the-user, and then accordingly change the state to whether refresh(re-exe) the screen or not.
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      setRefresh(true); // toggle refresh state
    });

    const unsubscribe = navigation.addListener("blur", () => {
      setRefresh(false); // toggle refresh state
    });

    return () => {
      subscribe;
      unsubscribe;
    };
  }, [navigation]);

  // Prepare all the heavylifting/building data for the render only when screen was focused/in-front-of-the-user. With the above useEffect setup it will take care of the medias. So memoizing this with media set as dependency will ensure that this will be built only when screen is focused.
  const dateCollection = React.useMemo(() => {
    // A collection medias according to the dates they were added.
    const dateCollectionTemp: { [key: string]: IDBCollectionMedia[] } = {};

    const screenTypeMedias = medias;

    // bulid the date based media collection.
    screenTypeMedias.forEach((media) => {
      const date = media.dateAddedString;
      // const date = new Date(media.dateAdded).toDateString();

      // if that date collection doesn't exist, create it
      if (!(date in dateCollectionTemp)) {
        dateCollectionTemp[date] = [media];
      }
      // if reached here, then it means that the date collection exists and add this media to that date's collection.
      else dateCollectionTemp[date].push(media);
    });

    return dateCollectionTemp;
  }, [medias]);

  // It is also important to memoize the render item function for better performance.
  // CollectionRow was memoized, so now when newer media is added, only the part concerning that will be re exe and not everything else.

  useEffect(() => {
    if (refresh) {
      getMediasFromCollection(screenMediaType, collectionType)
        .then((data) => {
          setMedias(data.rows._array);
          if (isFirstLoad) {
            setisFirstLoad(false);
          }
        })
        .catch((err) => {});
    }
  }, [refresh]);

  const renderItem = useCallback(
    function (dateKeyObj: ListRenderItemInfo<string>) {
      const dateKey = dateKeyObj.item;
      if (dateCollection[dateKey]?.length > 0) {
        return (
          <CollectionRow
            key={dateKey}
            title={dateKey}
            medias={dateCollection[dateKey]}
            currentYear={currentYear}
            today={today}
            yesterday={yesterday}
            thumbnailQuality={thumbnailQuality}
          />
        );
      } else return null;
    },
    [dateCollection]
  );

  // only on first load, show a loader.
  if (isFirstLoad) {
    return (
      //  Loader
      <Loader loading={isFirstLoad === true ? true : false} />
    );
  }

  return (
    <View className="flex-1 bg-secondary">
      <View
        className="flex-1"
        style={{ minHeight: 36 + (windowWidth * 0.31 * 3) / 2 }}
      >
        {dateCollection &&
        medias.length > 0 &&
        thumbnailQuality !== undefined ? (
          <FlashList
            className=""
            data={Object.keys(dateCollection)}
            keyExtractor={(dateKey) => dateKey}
            estimatedItemSize={260}
            renderItem={(dateKeyObj) => renderItem(dateKeyObj)}
          />
        ) : (
          <NothingToShow problemType="nothing" />
        )}
      </View>
    </View>
  );
};

export default memo(CollectionTopTabScreen);

// {status === "loading" ? (
//   //  Loader
//   <Loader loading={status === "loading" ? true : false} />
// ) : null}
