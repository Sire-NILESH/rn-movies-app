import React, {
  useEffect,
  useState,
  useRef,
  memo,
  useCallback,
  useMemo,
} from "react";
import { View } from "react-native";
import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { getDeviceDimensions, showSuccessToast } from "../utils/helpers/helper";
import CollectionThumbnail from "../components/CollectionThumbnail";
import { IDBCollectionMedia } from "../../types/typings";
import { getMediasFromCollection } from "../storage/database";
import NothingToShow from "../components/NothingToShow";
import useImageItemSetting from "../hooks/useImageItemSetting";
import useNavigateTo from "../hooks/useNavigateTo";
import Loader from "../components/ui/Loader";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import FloatingButton from "../components/ui/FloatingButton";
import { Colors } from "../utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppSelector } from "../hooks/reduxHooks";

// Calculate and pass the dimensions from the parent(here) to the thumbnails. So every thumbnail wont have to calculate them separately.
const windowWidth = getDeviceDimensions("window").width;

type TDbCollectionUpdateTypes = "dbUpdate" | "forceUpdate";

type TDBUpdateChecklist = {
  [Key in TDbCollectionUpdateTypes]: {
    timeStamp: null | number;
  };
};

const TopTabsTileListScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, collectionType, screenMediaType } = props;

  const [medias, setMedias] = useState<IDBCollectionMedia[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isFirstLoad, setisFirstLoad] = useState(true);
  const listRef = useRef();
  const [invertList, setnvertList] = useState(false);

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

  // Navigation handler for child components like thumbnail and jumpTo button. So every one of them wont have to calculate them separately.
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

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

  // Prepare all the heavylifting/building data for the render only when screen was focused/in-front-of-the-user which is kown by the refresh state.

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

  const renderItem = useCallback(function (
    media: ListRenderItemInfo<IDBCollectionMedia>
  ) {
    return (
      <View className="mx-[2]">
        <CollectionThumbnail
          media={media.item}
          orientation="portrait"
          navigateTo={navigateTo}
          windowWidth={windowWidth}
          quality={thumbnailQuality?.value}
        />
      </View>
    );
  },
  []);

  const pass = useMemo(
    function () {
      return medias?.length > 0 && thumbnailQuality;
    },
    [medias, thumbnailQuality]
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
      <View className="flex-1 items-center">
        <View
          style={{
            minWidth: "96%",
          }}
        >
          {pass ? (
            <View className="flex-1">
              <FlashList
                bounces
                // @ts-ignore
                ref={listRef}
                data={invertList ? medias.slice().reverse() : medias}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                // contentContainerStyle={{
                //   minWidth: "96%",
                //   paddingVertical: 8,
                // }}
                estimatedItemSize={(windowWidth * 0.31 * 3) / 2}
                renderItem={(media) => renderItem(media)}
                ListHeaderComponent={<View className="w-full h-2" />}
                ListFooterComponent={<View className="w-full h-8" />}
                keyExtractor={(media) => {
                  return String(media.mediaId);
                }}
                numColumns={3}
              />
            </View>
          ) : (
            <NothingToShow problemType="nothing" />
          )}
        </View>
      </View>

      {/* INVERT LIST FLOATING BUTTON */}
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

export default memo(TopTabsTileListScreen);
