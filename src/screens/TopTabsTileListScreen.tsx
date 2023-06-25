import React, { useEffect, useState, memo, useCallback } from "react";
import { View, FlatList, ListRenderItemInfo } from "react-native";
import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { getDeviceDimensions } from "../utils/helpers/helper";
import CollectionThumbnail from "../components/CollectionThumbnail";
import { IDBCollectionMedia } from "../../types/typings";
import { getMediasFromCollection } from "../storage/database";
import NothingToShow from "../components/NothingToShow";
import useImageItemSetting from "../hooks/useImageItemSetting";
import useNavigateTo from "../hooks/useNavigateTo";
import Loader from "../components/ui/Loader";

// Calculate and pass the dimensions from the parent(here) to the thumbnails. So every thumbnail wont have to calculate them separately.
const windowWidth = getDeviceDimensions("window").width;

const TopTabsTileListScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, collectionType, screenMediaType } = props;

  const [medias, setMedias] = useState<IDBCollectionMedia[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isFirstLoad, setisFirstLoad] = useState(true);

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
        {medias?.length > 0 && thumbnailQuality ? (
          <FlatList
            bounces
            data={medias}
            ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            contentContainerStyle={{
              minWidth: "96%",
              paddingVertical: 8,
            }}
            renderItem={(media) => renderItem(media)}
            keyExtractor={(media) => {
              return String(media.mediaId);
            }}
            numColumns={3}
          />
        ) : (
          <NothingToShow problemType="nothing" />
        )}
      </View>
    </View>
  );
};

export default memo(TopTabsTileListScreen);
