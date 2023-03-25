import React, { memo } from "react";
import { View } from "react-native";
import { useAppSelector } from "../hooks/reduxHooks";

import { ITopTabScreenProps } from "../library/NavigatorScreenProps/TopTabScreenProps";
import { collectionTypeToReduxCollection } from "../utils/helpers/helper";
import { IReduxListMedia } from "../typings";
import CollectionRow from "../components/CollectionRow";
import { FlatList } from "react-native-gesture-handler";

const CollectionTopTabScreen: React.FC<ITopTabScreenProps> = (props) => {
  const { navigation, route, collectionType, screenMediaType } = props;

  const reduxCollection = collectionTypeToReduxCollection[collectionType];

  // REDUX TOOLKIT HOOKS
  const medias = useAppSelector((state) => state[reduxCollection]);

  // A collection medias according to the dates they were added.
  const dateCollection: { [key: string]: IReduxListMedia[] } = {};

  const screenTypeMedias = Object.values(medias)
    .filter((media) => media.mediaType === screenMediaType)
    .sort((a, b) => b.dateAdded - a.dateAdded);

  // bulid the date based media collection.
  screenTypeMedias.forEach((media) => {
    const date = new Date(media.dateAdded).toDateString();

    // if that date collection doesn't exist, create it
    if (!(date in dateCollection)) {
      dateCollection[date] = [media];
    }
    // if reached here, then it means that the date collection exists and add this media to that date's collection.
    else dateCollection[date].push(media);
  });

  return (
    <View className="flex-1 bg-secondary">
      <View className="flex-1">
        {dateCollection ? (
          <FlatList
            className=""
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
                  />
                );
              } else return null;
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default memo(CollectionTopTabScreen);
