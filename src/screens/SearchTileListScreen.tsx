import { View } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import LoadMoreOnScrollBuilder from "../components/LoadMoreOnScrollBuilder";

const SearchTileListScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;
  // @ts-ignore
  const {
    title,
    medias,
    searchCategory,
  }: {
    title: string;
    medias: MovieMedia[] | TvMedia[];
    searchCategory: MediaTypes;
  } = route.params;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  //   searchScreenOptions?: {
  //    searchQuery: string;
  //    searchCategory: MediaTypes;
  //    abortController: AbortController;
  //  };

  return (
    <View className="flex-1">
      <LoadMoreOnScrollBuilder
        screenType="Search"
        searchScreenOptions={{
          searchQuery: title,
          searchCategory: searchCategory,
        }}
      />
    </View>
  );
};

export default SearchTileListScreen;
