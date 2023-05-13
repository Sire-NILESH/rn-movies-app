import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, TextInput, SafeAreaView, Pressable } from "react-native";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { Colors } from "./../utils/Colors";
import { FlatList } from "react-native-gesture-handler";
import { searchRequest } from "../utils/requests";
import {
  ICreditPerson,
  MediaTypes,
  MovieMedia,
  TvMedia,
} from "../../types/typings";
import HeaderSearchButton from "./../components/ui/HeaderSearchButton";
import {
  isMovie,
  isMovieArray,
  isPerson,
  isTv,
  isTvArray,
} from "./../utils/helpers/helper";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useAllowNsfwContentHooks } from "../hooks/reduxHooks";

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

  const { allowNsfwContent } = useAllowNsfwContentHooks();

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
        1,
        allowNsfwContent.nsfw,
        abortController
      );
      data && setSearchQueryResult(data);
    }

    try {
      if (searchQuery != null && searchQuery.length >= 2) {
        fetchSearchQuery();
      }
    } catch (err: any) {
      // console.log(err.message);
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
            disabled={searchQuery && searchQuery.length > 0 ? false : true}
          />
        </View>
      ),
    });
  }, [searchQueryResult]);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-secondary">
        <View className="flex-1 pb-2">
          {/* Search List suggestions */}
          {searchQuery !== null &&
          searchQuery.length >= 0 &&
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
      keyExtractor={(item, i) => `${item.id}-${i}`}
      initialNumToRender={20}
      renderItem={(mediaObj) => {
        return (
          <View
            className="w-full justify-center overflow-clip"
            style={
              mediaObj.index % 2 === 0
                ? { backgroundColor: Colors.secondary }
                : { backgroundColor: Colors.tertiary }
            }
          >
            <Pressable
              className="flex-1 flex-row items-center space-x-2 px-4 py-3"
              android_ripple={{ color: "#eee" }}
              onPress={() => {
                // when the search result is of a movie media
                if (isMovie(mediaObj.item)) {
                  navigateTo(
                    mediaObj.item,
                    "More Info",
                    isMovie(mediaObj.item) ? "movie" : "tv"
                  );
                }

                // when the search result is of a person media
                else if (isPerson(mediaObj.item)) {
                  const p = mediaObj.item as ICreditPerson;
                  navigation.push("Person Medias", {
                    title: p.name,
                    urlObject: {
                      name: p.name,
                      url: `/person/${p.id}`,
                      queryParams: {
                        language: "en-US",
                      },
                    },
                    currentMediaType: "movie",
                  });
                }

                // when the search result is of a tv media
                /**
                 * the isTv() checks for "name" prop in the object to figure out if the obj was a movie or a tv.
                 * But ICreditPerson objects also has name and orignal name properties so those objects will be checked as valid tv objects by isTv() which is not desirable.
                 * We decided to change to check for more props for tv but could'nt find any distinguished props between movie and tv objects.
                 * So a work around for cases like this where we have movie,tv,person objects together it will be better to check for isPerson() before checking for isTv().
                 * */
                else if (isTv(mediaObj.item)) {
                  navigateTo(
                    mediaObj.item,
                    "More Info",
                    isMovie(mediaObj.item) ? "movie" : "tv"
                  );
                }
              }}
            >
              <Ionicons
                size={18}
                name={
                  isMovie(mediaObj.item)
                    ? "film-outline"
                    : isPerson(mediaObj.item)
                    ? "person"
                    : "tv-outline"
                }
                color={Colors.stone[500]}
              />
              <Text className="text-text_primary">
                {isMovie(mediaObj.item)
                  ? mediaObj.item.title
                  : mediaObj.item.name}{" "}
                <Text className="text-xs text-text_tertiary">
                  {isMovie(mediaObj.item)
                    ? mediaObj.item.release_date
                      ? "(" + mediaObj.item.release_date.substring(0, 4) + ")"
                      : null
                    : mediaObj.item.first_air_date
                    ? "(" + mediaObj.item.first_air_date.substring(0, 4) + ")"
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
