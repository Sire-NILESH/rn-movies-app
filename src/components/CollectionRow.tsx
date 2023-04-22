import { IImgItemSettingsDB, IReduxListMedia } from "../../types/typings";
import { Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDeviceDimensions } from "../utils/helpers/helper";

import CollectionThumbnail from "./CollectionThumbnail";
import React from "react";

interface Props {
  title: string;
  medias: IReduxListMedia[];
  currentYear: number;
  today: string;
  yesterday: string;
  thumbnailQuality?: IImgItemSettingsDB;
}

function CollectionRow({
  title,
  medias,
  currentYear,
  today,
  yesterday,
  thumbnailQuality,
}: Props) {
  let titleForRow: string = "";

  if (title === today) {
    titleForRow = "Today";
  } else if (title === yesterday) {
    titleForRow = "Yesterday";
  } else if (String(currentYear) === title.split(" ")[3]) {
    titleForRow = title.substring(0, 10);
  } else {
    titleForRow = `${title.substring(0, 10)}, ${title.substring(11)}`;
  }

  return (
    <View className="space-y-1 mt-8">
      <View className="flex-row space-x-4 mb-1">
        <Text className="pl-5 text-sm font-semibold text-text_primary">
          {titleForRow}
          <Text className="text-text_dark">{`  |  ${medias.length} contents`}</Text>
        </Text>
      </View>

      {renderFlatList(medias, thumbnailQuality)}
    </View>
  );
}

export default React.memo(CollectionRow);

function renderFlatList(
  medias: IReduxListMedia[],
  thumbnailQuality?: IImgItemSettingsDB
) {
  const navigation = useNavigation();

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
    <>
      {medias.length > 0 ? (
        <FlatList
          numColumns={3}
          bounces
          className="pl-2 py-1"
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
          contentContainerStyle={{
            width: "100%",
          }}
          // className="ml-2 h-32"
          data={medias}
          renderItem={(media) => (
            <View className="ml-1">
              <CollectionThumbnail
                media={media.item ? media.item : media.item}
                orientation="portrait"
                navigateTo={navigateTo}
                windowWidth={windowWidth}
                quality={thumbnailQuality?.value}
                // orientation="landscape"
              />
            </View>
          )}
          keyExtractor={(media) => {
            return String(media.mediaId) + String(Math.random() * 1);
          }}
        />
      ) : null}
    </>
  );
}
