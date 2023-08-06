import React, { useEffect, memo, useState, useCallback, useMemo } from "react";
import { View } from "react-native";
import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { IDBCollectionMedia } from "../../types/typings";
import CollectionRow from "../components/CollectionRow";
import { getMediasFromCollection } from "../storage/database";
import NothingToShow from "../components/NothingToShow";
import useImageItemSetting from "../hooks/useImageItemSetting";
import Loader from "../components/ui/Loader";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { getDeviceDimensions, showSuccessToast } from "../utils/helpers/helper";
import FloatingButton from "../components/ui/FloatingButton";
import { Colors } from "../utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppSelector } from "../hooks/reduxHooks";

const windowWidth = getDeviceDimensions("window").width;
const THUMBNAIL_HEIGHT = (windowWidth * 0.31 * 3) / 2;

type TDbCollectionUpdateTypes = "dbUpdate" | "forceUpdate";

type TDBUpdateChecklist = {
  [Key in TDbCollectionUpdateTypes]: {
    timeStamp: null | number;
  };
};

const CollectionTopTabScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, collectionType, screenMediaType } = props;

  const [medias, setMedias] = useState<IDBCollectionMedia[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isFirstLoad, setisFirstLoad] = useState(true);
  const [invertList, setnvertList] = useState(false);

  const currentDate = new Date(Date.now());
  const currentYear = currentDate.getFullYear();
  const today = currentDate.toDateString();
  const yesterday = new Date(
    currentDate.setDate(currentDate.getDate() - 1)
  ).toDateString();

  const [dbUpdatesChecklist, setdbUpdatesChecklist] =
    useState<TDBUpdateChecklist>({
      dbUpdate: {
        timeStamp: null,
      },
      forceUpdate: {
        timeStamp: null,
      },
    });

  const isDbUpdatetimeStampChecked = (
    dbUpdateType: TDbCollectionUpdateTypes,
    timeStamp: number | null
  ) => {
    return dbUpdatesChecklist[dbUpdateType].timeStamp === timeStamp;
  };

  const dBUpdatedTimeStamp = useAppSelector(
    (state) => state.dBUpdatedTimeStamp[collectionType]
  );

  const dBForceUpdateTimeStamp = useAppSelector(
    (state) => state.dBUpdatedTimeStamp.forceUpdate
  );

  function toggleInvertList() {
    setnvertList((prev) => !prev);
    showSuccessToast(
      "List Reversed !",
      `Now showing ${invertList ? "Latest" : "Oldest"} to ${
        !invertList ? "Latest" : "Oldest"
      } items in the list`
    );
  }

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
  const { dateCollection, dateCollectionList } = React.useMemo(() => {
    // A collection medias according to the dates they were added.
    const dateCollectionTemp: { [key: string]: IDBCollectionMedia[] } = {};

    const screenTypeMedias = medias;

    // bulid the date based media collection.
    screenTypeMedias.forEach((media) => {
      const date = media.dateAddedString;
      // if that date collection doesn't exist, create it
      if (!(date in dateCollectionTemp)) {
        dateCollectionTemp[date] = [media];
      }
      // if reached here, then it means that the date collection exists and add this media to that date's collection.
      else dateCollectionTemp[date].push(media);
    });

    const dateCollectionList = Object.keys(dateCollectionTemp) as string[];

    return { dateCollection: dateCollectionTemp, dateCollectionList };
  }, [medias]);

  // It is also important to memoize the render item function for better performance.
  // CollectionRow was memoized, so now when newer media is added, only the part concerning that will be re exe and not everything else.

  useEffect(() => {
    const fetchCollectionInfo = (callbackFn: undefined | (() => void)) => {
      getMediasFromCollection(
        screenMediaType,
        collectionType
        // invertList ? "ASC" : "DESC"
      )
        .then((data) => {
          setMedias(data.rows._array);
          if (isFirstLoad) {
            setisFirstLoad(false);
          }
          callbackFn && callbackFn();
        })
        .catch((err) => {});
    };

    if (refresh) {
      if (isFirstLoad) {
        fetchCollectionInfo(() => {
          // after fetching for first load, mark that time stamp as checked for both forcedUpdate and dbUpdate.

          setdbUpdatesChecklist((prev) => {
            const temp = { ...prev };
            temp["forceUpdate"].timeStamp = dBForceUpdateTimeStamp.timeStamp;

            temp["dbUpdate"].timeStamp = dBForceUpdateTimeStamp.timeStamp;

            return temp;
          });
        });
      } else if (
        !isFirstLoad &&
        !isDbUpdatetimeStampChecked(
          "forceUpdate",
          dBForceUpdateTimeStamp.timeStamp
        )
      ) {
        fetchCollectionInfo(() => {
          // after fetching, mark that time stamp as checked.

          setdbUpdatesChecklist((prev) => {
            const temp = { ...prev };
            temp["forceUpdate"].timeStamp = dBForceUpdateTimeStamp.timeStamp;

            return temp;
          });
        });
      } else if (
        !isFirstLoad &&
        !isDbUpdatetimeStampChecked(
          "dbUpdate",
          dBUpdatedTimeStamp[screenMediaType].timeStamp
        )
      ) {
        fetchCollectionInfo(() => {
          // after fetching, mark that time stamp as checked.
          setdbUpdatesChecklist((prev) => {
            const temp = { ...prev };
            temp["dbUpdate"].timeStamp =
              dBUpdatedTimeStamp[screenMediaType].timeStamp;

            return temp;
          });
        });
      }
    }
  }, [refresh]);

  const renderItem = useCallback(
    function (dateKeyObj: ListRenderItemInfo<string>) {
      const dateKey = dateKeyObj.item;
      if (dateCollection[dateKey]?.length > 0) {
        return (
          <View>
            <CollectionRow
              key={dateKey}
              title={dateKey}
              medias={dateCollection[dateKey]}
              currentYear={currentYear}
              today={today}
              yesterday={yesterday}
              thumbnailQuality={thumbnailQuality}
            />
            <View className="h-8 w-full" />
          </View>
        );
      } else return null;
    },
    [dateCollection]
  );

  const pass = useMemo(
    function () {
      return (
        dateCollection && medias.length > 0 && thumbnailQuality !== undefined
      );
    },
    [dateCollection, medias, thumbnailQuality]
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
      <View className="flex-1" style={{ minHeight: 36 + THUMBNAIL_HEIGHT }}>
        {pass ? (
          <View className="flex-1">
            <FlashList
              // className=""
              // data={Object.keys(dateCollection)}
              data={
                invertList
                  ? dateCollectionList.slice().reverse()
                  : dateCollectionList
              }
              keyExtractor={(dateKey, index) => `${dateKey}-${index}`}
              // estimatedItemSize={80}
              estimatedItemSize={315}
              overrideItemLayout={(layout, item) => {
                const numRows = Math.ceil(dateCollection[item].length / 3);
                layout.size =
                  32 + 28 + (numRows - 1) * 4 + 12 + numRows * THUMBNAIL_HEIGHT;
              }}
              renderItem={(dateKeyObj) => renderItem(dateKeyObj)}
              ListHeaderComponent={<View className="w-full h-8" />}
            />
          </View>
        ) : (
          <NothingToShow problemType="nothing" />
        )}
      </View>

      {/* INVERT ORDER FLOATING BUTTON */}
      {pass && (
        <FloatingButton onClickHandler={toggleInvertList}>
          <MaterialCommunityIcons
            style={{
              transform: [{ rotateZ: "90deg" }],
            }}
            name="rotate-3d-variant"
            size={24}
            color={Colors.gray[200]}
          />
        </FloatingButton>
      )}
    </View>
  );
};

export default memo(CollectionTopTabScreen);
