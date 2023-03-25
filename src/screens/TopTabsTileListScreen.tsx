import React, { memo } from "react";
import { View } from "react-native";
import { useAppSelector } from "../hooks/reduxHooks";

import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import {
  collectionTypeToReduxCollection,
  getDeviceDimensions,
} from "../utils/helpers/helper";
import { FlatList } from "react-native-gesture-handler";
import CollectionThumbnail from "../components/CollectionThumbnail";

const TopTabsTileListScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, route, collectionType, screenMediaType } = props;

  const reduxCollection = collectionTypeToReduxCollection[collectionType];

  // REDUX TOOLKIT HOOKS
  let reduxMedias = useAppSelector((state) => state[reduxCollection]);
  const medias = Object.values(reduxMedias).filter(
    (medias) => medias.mediaType === screenMediaType
  );

  // Navigation handler for child components like thumbnail and jumpTo button.
  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  // Calculate and pass the dimensions from the parent(here) to the thumbnails.
  // So every thumbnail wont have to calculate them separately.
  const windowWidth = getDeviceDimensions("window").width;

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
