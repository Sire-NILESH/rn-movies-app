import React, { useEffect, memo, useState } from "react";
import { View } from "react-native";
// import { useAppSelector } from "../hooks/reduxHooks";

import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { IDBCollectionMedia } from "../../types/typings";
import CollectionRow from "../components/CollectionRow";
import { FlatList } from "react-native-gesture-handler";
import { getMediasFromCollection } from "../storage/database";
import NothingToShow from "../components/NothingToShow";
import useImageItemSetting from "../hooks/useImageItemSetting";

const CollectionTopTabScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, route, collectionType, screenMediaType } = props;

  // const reduxCollection = collectionTypeToReduxCollection[collectionType];

  // REDUX TOOLKIT HOOKS
  // const reduxMedias = useAppSelector((state) => state[reduxCollection]);
  // use this medias instead of the redux's useSelector data because it will always cause the screen to re exe on every addition of media to the collection even if the screen is not visible to the user. We will only add data to the existing medias array only if the screen is visible to the user which is known by the refresh state.
  const [medias, setMedias] = useState<IDBCollectionMedia[]>([]);
  const [refresh, setRefresh] = useState(false);

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

  console.log("refresh", collectionType, screenMediaType, refresh);

  // Prepare all the heavylifting/building data for the render only when screen was focused/in-front-of-the-user. With the above useEffect setup it will take care of the medias. So memoizing this with media set as dependency will ensure that this will be built only when screen is focused and not on every re-exe caused by the redux's useSelector.
  const dateCollection = React.useMemo(() => {
    console.log("preparing data");
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
      getMediasFromCollection(screenMediaType, collectionType).then((data) => {
        console.log(
          `AAYYYOOO ${data.rows.length} ${collectionType} data from DB`,
          data["rows"]["_array"]
        );
        setMedias(data.rows._array);
      });
    }
  }, [refresh]);

  return (
    <View className="flex-1 bg-secondary">
      <View className="flex-1">
        {dateCollection &&
        medias.length > 0 &&
        thumbnailQuality !== undefined ? (
          <FlatList
            className=""
            maxToRenderPerBatch={4}
            initialNumToRender={4}
            data={Object.keys(dateCollection)}
            keyExtractor={(dateKey) => dateKey}
            renderItem={(dateKeyObj) => {
              const dateKey = dateKeyObj.item;
              if (dateCollection[dateKey].length > 0) {
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
            }}
          />
        ) : (
          <NothingToShow problemType="nothing" />
        )}
      </View>
    </View>
  );
};

export default memo(CollectionTopTabScreen);
