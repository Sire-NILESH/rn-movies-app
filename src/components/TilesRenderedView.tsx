import { useCallback } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ThumbnailMemoised from "./ThumbnailMemoised";
import { getDeviceDimensions } from "../utils/helpers/helper";
import { useNavigation } from "@react-navigation/native";
import { memo, useMemo } from "react";
import { IImgItemSettingsDB } from "../../types/typings";
import SearchPersonCard from "./SearchPersonCard";
import { useThumbnailTextSettingHooks } from "../hooks/reduxHooks";

interface IProps {
  medias: any[];
  loadingNewMedias: boolean;
  loadMoreItem: () => void;
  thumbnailQuality?: IImgItemSettingsDB;
  tilesHeader?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
  contentType?: "tiles" | "card";
}

const TilesRenderedView: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  const { isThumbnailText } = useThumbnailTextSettingHooks();

  // Navigation handler for child components like thumbnail and jumpTo button.
  // So every one of them wont have to calculate them separately.
  const navigateTo = useMemo(() => {
    return (screen: string, paramOption: Object) => {
      // @ts-ignore
      navigation.push(screen, paramOption);
    };
  }, [navigation]);

  // Calculate and pass the dimensioins from the parent(here) to the thumbnails.
  // So every thumbnail wont have to calculate them separately.
  const windowWidth = getDeviceDimensions("window").width;

  // Footer loader component
  const renderLoader = () => {
    return (
      <View className="w-full justify-center items-center h-6">
        {
          props.loadingNewMedias === true ? (
            <ActivityIndicator size="small" color="#aaa" />
          ) : null
          // <View className="h-8" />
        }
      </View>
    );
  };

  const renderItem = useCallback(function (media: any) {
    if (props.contentType === "card") {
      return (
        <View className="mx-2">
          <SearchPersonCard person={media.item} navigateTo={navigateTo} />
        </View>
      );
    }

    return (
      <View className="mx-[2]">
        <ThumbnailMemoised
          media={media.item}
          orientation="portrait"
          navigateTo={navigateTo}
          windowWidth={windowWidth}
          imgType="regular"
          quality={props.thumbnailQuality?.value}
          disableText={isThumbnailText.disable}
        />
      </View>
    );
  }, []);

  return (
    <View className="flex-1 relative">
      <FlatList
        data={props.medias}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height:
                props.contentType !== undefined && props.contentType === "card"
                  ? 4
                  : 4,
            }}
          />
        )}
        contentContainerStyle={{
          width: "100%",
          paddingVertical: 8,
        }}
        ListHeaderComponent={props.tilesHeader}
        renderItem={(media) => renderItem(media)}
        keyExtractor={(media, i) => {
          return `${media.id}-${i}`;
        }}
        numColumns={
          props.contentType !== undefined && props.contentType === "card"
            ? 1
            : 3
        }
        ListFooterComponent={renderLoader}
        onEndReachedThreshold={0.9}
        onEndReached={props.loadMoreItem}
        initialNumToRender={20}
      />
    </View>
  );
};

export default memo(TilesRenderedView);
