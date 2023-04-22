import { View, FlatList, ActivityIndicator } from "react-native";
import ThumbnailMemoised from "./ThumbnailMemoised";
import { getDeviceDimensions, isMovieArray } from "../utils/helpers/helper";
import { useNavigation } from "@react-navigation/native";
import { memo, useCallback, useMemo } from "react";
import { IImgItemSettingsDB } from "../../types/typings";

interface IProps {
  medias: any[];
  loadingNewMedias: boolean;
  blockNewLoads: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  thumbnailQuality?: IImgItemSettingsDB;
}

const TilesRenderedView: React.FC<IProps> = (props) => {
  const navigation = useNavigation();
  // const { defaultImgQuality } = useDefaultImageQualityHooks();

  const loadMoreItem = () => {
    // Increase the page number by one only if the load new medias is enabled
    if (!props.blockNewLoads && !props.loadingNewMedias)
      props.setPageNumber((prev) => prev + 1);
  };

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
    return props.loadingNewMedias ? (
      <View className="w-full justify-center my-2">
        <ActivityIndicator size="small" color="#aaa" />
      </View>
    ) : (
      <View className="h-6"></View>
    );
  };

  console.log("rendered tiles renderer");

  // const renderFlatlist = () => {
  //   return
  // }

  return (
    <View className="flex-1 relative">
      <FlatList
        bounces
        data={props.medias}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        contentContainerStyle={{
          // backgroundColor: "white",
          width: "100%",
          paddingVertical: 8,
        }}
        renderItem={(media) => {
          // console.log("rendered tiles renderer");
          return (
            <View className="mx-[2]">
              {/* <Thumbnail media={media.item} orientation="portrait" /> */}
              <ThumbnailMemoised
                media={media.item}
                orientation="portrait"
                navigateTo={navigateTo}
                windowWidth={windowWidth}
                imgType="cached"
                quality={props.thumbnailQuality?.value}
                // quality={defaultImgQuality.value}
              />
              {/* <MemoisedThumbnail media={media.item} orientation="portrait" /> */}
            </View>
          );
        }}
        keyExtractor={(media) => {
          return String(media.id);
        }}
        numColumns={3}
        ListFooterComponent={renderLoader}
        onEndReachedThreshold={0.9}
        onEndReached={loadMoreItem}
      />
    </View>
  );
};
// export default TilesRenderedView;
export default memo(TilesRenderedView);
