import { View, FlatList, ActivityIndicator } from "react-native";

import Thumbnail from "../components/Thumbnail";

export default function TilesBuilder(props: {
  medias: any;
  loadingNewMedias: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  const loadMoreItem = () => {
    props.setPageNumber((prev) => prev + 1);
  };

  // Footer loader component
  const renderLoader = () => {
    return props.loadingNewMedias ? (
      <View className="items-center my-2">
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      bounces
      className="h-32"
      data={props.medias}
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      renderItem={(media) => (
        <View className="space-x-2">
          <Thumbnail media={media.item} orientation="portrait" />
        </View>
      )}
      keyExtractor={(media) => {
        return String(media.id);
      }}
      numColumns={3}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
    />
  );
}
