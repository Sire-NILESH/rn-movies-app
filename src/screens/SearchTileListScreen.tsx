import { View } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { MediaTypes, MovieMedia, TvMedia } from "../../types/typings";
import SearchResultsTopTabsNavigator from "../navigators/SearchResultsTopTabsNavigator";

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

  return <SearchResultsTopTabsNavigator searchQuery={title} />;
};

export default SearchTileListScreen;
