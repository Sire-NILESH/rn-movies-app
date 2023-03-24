import { IReduxListMedia, MovieMedia, TvMedia } from "../typings";
import Thumbnail from "./Thumbnail";
import { Text, View, FlatList } from "react-native";
import IconButton from "./ui/IconButton";
import { Colors } from "./../utils/Colors";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDeviceDimensions, isMovieArray } from "../utils/helpers/helper";
import { isMovie } from "./../utils/helpers/helper";
import CollectionThumbnail from "./CollectionThumbnail";

interface Props {
  title: string;
  medias: IReduxListMedia[];
}

function CollectionRow({ title, medias }: Props) {
  return (
    <View className="space-y-1 mb-5">
      <View className="flex-row space-x-4 mb-1">
        <Text className="pl-5 text-sm font-semibold text-text_primary">
          {title}
        </Text>
      </View>

      {renderFlatList(medias, title)}
    </View>
  );
}

export default CollectionRow;

function renderFlatList(medias: IReduxListMedia[], title: string) {
  const navigation = useNavigation();

  // Navigation handler for child components like thumbnail and jumpTo button.
  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  // Calculate and pass the dimensioins from the parent(here) to the thumbnails.
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
            // backgroundColor: "white",
            width: "100%",
            paddingVertical: 8,
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
                // orientation="landscape"
              />
            </View>
          )}
          keyExtractor={(media) => {
            return String(media.mediaId) + String(Math.random() * 20);
          }}
        />
      ) : null}
    </>
  );
}
