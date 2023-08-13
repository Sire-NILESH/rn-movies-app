import { useCallback, useMemo } from "react";
import { View, ActivityIndicator } from "react-native";
import { getDeviceDimensions } from "../utils/helpers/helper";
import { useNavigation } from "@react-navigation/native";
import { IImgItemSettingsDB } from "../../types/typings";
import SearchPersonCard from "./SearchPersonCard";
import { useThumbnailTextSettingHooks } from "../hooks/reduxHooks";
import { FlashList } from "@shopify/flash-list";
import Thumbnail from "./Thumbnail";

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

// Calculate and pass the dimensioins from the parent(here) to the thumbnails.
// So every thumbnail wont have to calculate them separately.
const windowWidth = getDeviceDimensions("window").width;

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

  // Footer loader component
  const renderLoader = useCallback(() => {
    return (
      <View className="w-full justify-center pt-2 h-6">
        {props.loadingNewMedias === true ? (
          <ActivityIndicator size="small" color="#aaa" />
        ) : null}
      </View>
    );
  }, [props.loadingNewMedias]);

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
        <Thumbnail
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
      <FlashList
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
        className="w-full"
        contentContainerStyle={{
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
        // could have gone higher but it is better to not flood the server with too many requests when user is scrolling really fast.
        // since app is for personal use, using a higher number here, but for actual production app the number should be lower.
        onEndReachedThreshold={2}
        onEndReached={props.loadMoreItem}
        estimatedItemSize={(windowWidth * 0.31 * 3) / 2}
      />
    </View>
  );
};

export default TilesRenderedView;
