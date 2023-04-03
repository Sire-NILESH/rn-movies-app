import React, { useEffect, useState, memo } from "react";
import { View } from "react-native";

import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { getDeviceDimensions } from "../utils/helpers/helper";
import { FlatList } from "react-native-gesture-handler";
import CollectionThumbnail from "../components/CollectionThumbnail";
import { IDBCollectionMedia } from "../../types/typings";
import { getMediasFromCollection } from "../database/database";

const TopTabsTileListScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, route, collectionType, screenMediaType } = props;

  const [medias, setMedias] = useState<IDBCollectionMedia[]>([]);
  const [refresh, setRefresh] = useState(false);

  // Navigation handler for child components like thumbnail and jumpTo button. So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  // Calculate and pass the dimensions from the parent(here) to the thumbnails. So every thumbnail wont have to calculate them separately.
  const windowWidth = getDeviceDimensions("window").width;

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
      <View className="flex-1 items-center">
        {medias?.length > 0 ? (
          <FlatList
            bounces
            data={medias}
            ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            contentContainerStyle={{
              minWidth: "96%",
              paddingVertical: 8,
            }}
            renderItem={(media) => {
              return (
                <View className="mx-[2]">
                  <CollectionThumbnail
                    media={media.item}
                    orientation="portrait"
                    navigateTo={navigateTo}
                    windowWidth={windowWidth}
                  />
                </View>
              );
            }}
            keyExtractor={(media) => {
              return String(media.mediaId);
            }}
            numColumns={3}
          />
        ) : null}
      </View>
    </View>
  );
};

export default memo(TopTabsTileListScreen);
