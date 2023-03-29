import React, { useEffect, useState, memo } from "react";
import { View, Text } from "react-native";
import { useAppSelector } from "../hooks/reduxHooks";

import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import {
  collectionTypeToReduxCollection,
  getDeviceDimensions,
} from "../utils/helpers/helper";
import { FlatList } from "react-native-gesture-handler";
import CollectionThumbnail from "../components/CollectionThumbnail";
import { IReduxListMedia } from "../typings";

const TopTabsTileListScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, route, collectionType, screenMediaType } = props;

  const reduxCollection = collectionTypeToReduxCollection[collectionType];

  // REDUX TOOLKIT HOOKS
  let reduxMedias = useAppSelector((state) => state[reduxCollection]);
  // use this medias instead of the redux's useSelector data because it will always cause the screen to re exe on every addition of media to the collection even if the screen is not visible to the user. We will only add data to the existing medias array only if the screen is visible to the user which is known by the refresh state.
  const [medias, setMedias] = useState<IReduxListMedia[]>([]);
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
    // if (navigation.isFocused()) {
    if (refresh) {
      console.log("i ran");

      const data = Object.values(reduxMedias)
        .filter((medias) => medias.mediaType === screenMediaType)
        .sort((a, b) => b.dateAdded - a.dateAdded);
      setMedias(data);
    }
    // setMedias(data);
  }, [refresh]);

  // it is also very important to memoize the render item

  return (
    <View className="flex-1 bg-secondary">
      <View className="flex-1 items-center">
        {medias?.length > 0 && refresh ? (
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
