import { View, FlatList, ActivityIndicator } from "react-native";

import Thumbnail from "../components/Thumbnail";

export default function TilesRenderedView(props: {
  medias: any;
  loadingNewMedias: boolean;
  blockNewLoads: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  const loadMoreItem = () => {
    // Increase the page number by one only if the load new medias is enabled
    if (!props.blockNewLoads) props.setPageNumber((prev) => prev + 1);
  };

  // Footer loader component
  const renderLoader = () => {
    return props.loadingNewMedias ? (
      <View className="w-full justify-center my-2">
        <ActivityIndicator size="small" color="#aaa" />
      </View>
    ) : null;
  };

  return (
    <View className="flex-1 relative pr-1">
      <FlatList
        bounces
        // className="relative h-32"
        data={props.medias}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        renderItem={(media) => {
          return (
            // <View className="space-x-2">
            <View className="ml-1">
              <Thumbnail media={media.item} orientation="portrait" />
            </View>
          );
        }}
        keyExtractor={(media) => {
          return String(media.id);
        }}
        numColumns={3}
        ListFooterComponent={renderLoader}
        onEndReached={() => {
          if (props.loadingNewMedias === false) {
            loadMoreItem();
          }
        }}
      />
    </View>
  );
}
