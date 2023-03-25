import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, TextInput, SafeAreaView, Pressable } from "react-native";
import { useLogging } from "../hooks/useLogging";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { Colors } from "./../utils/Colors";
import { FlatList } from "react-native-gesture-handler";
import { searchRequest } from "../utils/requests";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import HeaderSearchButton from "./../components/ui/HeaderSearchButton";
import { isMovie, isMovieArray, isTvArray } from "./../utils/helpers/helper";
import { StackNavigationProp } from "@react-navigation/stack";

interface ISearchResults {
  results: MovieMedia[] | TvMedia[];
}

interface ISearchInputProps {
  inputText: string | null;
  searchCategory: MediaTypes;
  onTextChangeHandler: (text: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = (props) => {
  return (
    <View className="flex-1 bg-tertiary min-w-[250] mt-[10]">
      <TextInput
        placeholder="Search something..."
        // placeholder={`Search ${
        //   props.searchCategory === "tv" ? "TV shows" : "Movies"
        // }...`}
        className="bg-stone-700 px-6 py-1 rounded-md text-gray-100"
        placeholderTextColor={Colors.stone[400]}
        onChangeText={props.onTextChangeHandler}
        //   value={props.inputText ? props.inputText : null}
      />
    </View>
  );
};

const SearchScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  // @ts-ignore
  const searchCategory = route.params?.searchCategory as MediaTypes;
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchQueryResult, setSearchQueryResult] =
    useState<ISearchResults | null>(null);

  function setSearchQueryHandler(text: string): void {
    if (text.trim().length > 0) {
      setSearchQuery(text);
    }
  }

  useEffect(() => {
    const abortController: AbortController = new AbortController();

    async function fetchSearchQuery() {
      const data = await searchRequest(
        searchQuery ? searchQuery : "",
        "multi",
        // searchCategory ? searchCategory : "multi",
        1,
        abortController
      );
      data && setSearchQueryResult(data);
    }

    try {
      if (searchQuery != null && searchQuery.length >= 2) {
        fetchSearchQuery();
      }
    } catch (err: any) {
      console.log(err.message);
    }

    return () => abortController.abort();
  }, [searchQuery]);

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => {
        return (
          <SearchInput
            inputText={searchQuery}
            searchCategory={searchCategory}
            onTextChangeHandler={setSearchQueryHandler}
          />
        );
      },
      headerRight: (props) => (
        <View className="mr-2">
          <HeaderSearchButton
            gotoList={true}
            medias={searchQueryResult?.results}
            title={searchQuery}
            searchCategory={searchCategory}
            disabled={
              searchQuery && searchQuery.length > 0 ? false : true
              // searchQueryResult?.results.length &&
              // searchQueryResult?.results.length > 0
              //   ? false
              //   : true
            }
          />
        </View>
      ),
    });
  }, [searchQueryResult]);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-stone-800">
        <View className="flex-1 pb-2">
          {/* Search List suggestions */}
          {searchQuery !== null &&
          searchQuery.length >= 2 &&
          searchQueryResult &&
          searchQueryResult?.results.length > 0
            ? isMovieArray(searchQueryResult?.results)
              ? renderFlatList(
                  searchQueryResult?.results,
                  searchCategory,
                  navigation
                )
              : !isTvArray(searchQueryResult?.results)
              ? renderFlatList(
                  searchQueryResult?.results,
                  searchCategory,
                  navigation
                )
              : null
            : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;

function renderFlatList(
  searchQueryResult: MovieMedia[] | TvMedia[] | null,
  searchCategory: MediaTypes,
  navigation: StackNavigationProp<any>
) {
  function navigateTo(
    media: MovieMedia | TvMedia,
    to: string,
    searchCategory: MediaTypes
  ): void {
    if ("title" in media) {
      // @ts-ignore
      navigation.navigate(to, {
        media: media, //MovieMedia
        mediaType: searchCategory,
      });
    } else {
      // @ts-ignore
      navigation.navigate(to, {
        media: media, //TvMedia
        mediaType: searchCategory,
      });
    }
  }

  return (
    <FlatList
      data={searchQueryResult as TvMedia[]}
      keyExtractor={(item) => String(item.id) + String(Math.random() * 10)}
      initialNumToRender={20}
      renderItem={(mediaObj) => {
        return (
          <View
            className="w-full justify-center overflow-clip"
            style={
              mediaObj.index % 2 === 0
                ? { backgroundColor: Colors.stone[800] }
                : { backgroundColor: Colors.stone[900] }
            }
          >
            <Pressable
              className="flex-1 px-4 py-3"
              onPress={() => {
                navigateTo(
                  mediaObj.item,
                  "More Info",
                  isMovie(mediaObj.item) ? "movie" : "tv"
                );
                // navigateTo(mediaObj.item, "More Info", searchCategory);
              }}
            >
              <Text className="text-gray-100">
                {isMovie(mediaObj.item)
                  ? mediaObj.item.title
                  : mediaObj.item.name}{" "}
                <Text className="text-xs">
                  {isMovie(mediaObj.item)
                    ? mediaObj.item.release_date
                      ? "(" + mediaObj.item.release_date + ")"
                      : null
                    : mediaObj.item.first_air_date
                    ? "(" + mediaObj.item.first_air_date + ")"
                    : null}
                </Text>
              </Text>
            </Pressable>
          </View>
        );
      }}
    />
  );
}
