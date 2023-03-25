import React, { memo } from "react";
import { View } from "react-native";
import { SearchResultsTopTabScreenProps } from "../library/NavigatorScreenProps/SearchResultsTopTabScreenProps";
import LoadMoreOnScrollBuilder from "../components/builders/LoadMoreOnScrollBuilder";

const SearchResultsTopTabScreen: React.FC<SearchResultsTopTabScreenProps> = (
  props
) => {
  const { navigation, route, searchQuery, screenMediaType } = props;

  return (
    <View className="flex-1 bg-secondary">
      <View className="flex-1">
        <LoadMoreOnScrollBuilder
          screenType="Search"
          searchScreenOptions={{
            searchQuery: searchQuery,
            searchCategory: screenMediaType,
          }}
        />
      </View>
    </View>
  );
};

export default memo(SearchResultsTopTabScreen);
