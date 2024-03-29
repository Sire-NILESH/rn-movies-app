import { useLayoutEffect } from "react";
import { MediaTypes } from "../../types/typings";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import SearchResultsTopTabsNavigator from "../navigators/TopTabs/SearchResultsTopTabsNavigator";

const SearchTileListScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;
  // @ts-ignore
  const {
    title,
  }: {
    title: string;
    searchCategory: MediaTypes;
  } = route.params;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  return <SearchResultsTopTabsNavigator searchQuery={title.toLowerCase()} />;
};

export default SearchTileListScreen;
