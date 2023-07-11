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

// Calculate and pass the dimensions from the parent(here) to the thumbnails. So every thumbnail wont have to calculate them separately.
const windowWidth = getDeviceDimensions("window").width;

const TopTabsTileListScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, collectionType, screenMediaType } = props;

  const [medias, setMedias] = useState<IDBCollectionMedia[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isFirstLoad, setisFirstLoad] = useState(true);
  const listRef = useRef();
  const [invertList, setnvertList] = useState(false);

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
    if (refresh) {
      getMediasFromCollection(screenMediaType, collectionType).then((data) => {
        setMedias(data.rows._array);
        if (isFirstLoad) {
          setisFirstLoad(false);
        }
      });
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
            paddingVertical: 8,
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
