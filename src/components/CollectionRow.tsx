import { IImgItemSettingsDB, IReduxListMedia } from "../../types/typings";
import { Text, View } from "react-native";
import { getDeviceDimensions } from "../utils/helpers/helper";
import CollectionThumbnail from "./CollectionThumbnail";
import React, { useCallback } from "react";
import useNavigateTo from "../hooks/useNavigateTo";

interface Props {
  title: string;
  medias: IReduxListMedia[];
  currentYear: number;
  today: string;
  yesterday: string;
  thumbnailQuality?: IImgItemSettingsDB;
}

// Calculate and pass the dimensions from the parent(here) to the thumbnails.
// So every thumbnail wont have to calculate them separately.
const windowWidth = getDeviceDimensions("window").width;

const THUMBNAIL_HEIGHT = (windowWidth * 0.31 * 3) / 2;

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
    <View className="">
      <View className="flex-row space-x-4 h-7">
        <Text className="pl-5 text-sm font-semibold text-text_primary">
          {titleForRow}
          <Text className="text-text_dark">{`  |  ${medias.length} ${
            medias.length > 1 ? "contents" : "content"
          }`}</Text>
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
  // Navigation handler for child components like thumbnail and jumpTo button.

  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  const renderItem = useCallback(
    (media: IReduxListMedia) => (
      <View className="ml-1" key={media.mediaId}>
        <CollectionThumbnail
          media={media ? media : media}
          orientation="portrait"
          navigateTo={navigateTo}
          windowWidth={windowWidth}
          quality={thumbnailQuality?.value}
          // orientation="landscape"
        />
      </View>
    ),
    []
  );

  return (
    <>
      {medias.length > 0 ? (
        <View
          className="w-full py-1 items-center"
          style={{ minHeight: 12 + THUMBNAIL_HEIGHT }}
        >
          <View className="w-[98%] flex-row flex-wrap gap-y-1 ">
            {medias.map((m) => {
              return renderItem(m);
            })}
          </View>
        </View>
      ) : null}
    </>
  );
}
