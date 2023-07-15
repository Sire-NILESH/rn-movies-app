import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, TextInput, SafeAreaView, Pressable } from "react-native";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { Colors } from "./../utils/Colors";
import { searchRequest } from "../utils/requests";
import {
  ICreditPerson,
  ISearchHistoryItem,
  MediaTypes,
  MovieMedia,
  TvMedia,
} from "../../types/typings";
import HeaderSearchButton from "./../components/ui/HeaderSearchButton";
import {
  isISearchHistoryItem,
  isMovie,
  isPerson,
  isTv,
} from "./../utils/helpers/helper";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  useAllowNsfwContentHooks,
  useSearchHistoryHooks,
} from "../hooks/reduxHooks";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";

import CustomButton from "./../components/ui/CustomButton";

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
  const {
    searchHistory,
    addSearchHistoryItemHandler,
    removeSearchHistoryItemHandler,
  } = useSearchHistoryHooks();

  function setSearchQueryHandler(text: string): void {
    const enteredQuery = text.toLocaleLowerCase().trim();
    if (enteredQuery.length > 0) {
      setSearchQuery(enteredQuery);
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

    const timer = setTimeout(() => {
      try {
        if (searchQuery != null && searchQuery.length >= 0) {
          fetchSearchQuery();
        }
      } catch (err: any) {
        // console.log(err.message);
      }
    }, 100);

    return () => {
      abortController.abort();
      clearTimeout(timer);
    };
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
        <View className="mr-4">
          <HeaderSearchButton
            gotoList={true}
            title={searchQuery}
            searchCategory={searchCategory}
            disabled={searchQuery && searchQuery.length > 0 ? false : true}
            addSearchHistoryItemHandler={addSearchHistoryItemHandler}
          />
        </View>
      ),
    });
  }, [searchQueryResult]);

  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.tertiary} />
      <SafeAreaView className="flex-1 bg-secondary">
        <View className="flex-1 pb-2">
          {/* Search List suggestions */}
          {searchQuery !== null &&
          searchQuery.length >= 0 &&
          searchQueryResult &&
          searchQueryResult?.results.length > 0
            ? renderFlatList(
                searchQueryResult?.results,
                navigation,
                searchHistory,
                addSearchHistoryItemHandler,
                removeSearchHistoryItemHandler
              )
            : renderFlatList(
                [],
                navigation,
                searchHistory,
                addSearchHistoryItemHandler,
                removeSearchHistoryItemHandler
              )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;

function renderFlatList(
  searchQueryResult: MovieMedia[] | TvMedia[] | null,
  navigation: StackNavigationProp<any>,
  searchHistory: ISearchHistoryItem[],
  addSearchHistoryItemHandler: (seachHistoryItem: ISearchHistoryItem) => void,
  removeSearchHistoryItemHandler: (seachHistoryItem: ISearchHistoryItem) => void
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

  const renderSearchResultsItem = (mediaObj: ListRenderItemInfo<any>) => {
    return (
      <View
        className={`w-full justify-center overflow-clip ${
          mediaObj.index % 2 === 0 ? "bg-neutral-900/50" : "bg-neutral-800/60"
        }`}
      >
        <Pressable
          className="flex-1 flex-row items-center space-x-3 px-4 py-3"
          android_ripple={{ color: "#eee" }}
          onPress={() => {
            // when the search result is of a movie media
            if (isMovie(mediaObj.item)) {
              addSearchHistoryItemHandler({
                id: mediaObj.item.title,
                itemName: mediaObj.item.title,
                itemType: "searchHistory",
              });
              navigateTo(
                mediaObj.item,
                "More Info",
                isMovie(mediaObj.item) ? "movie" : "tv"
              );
            }

            // when the search result is of a person media
            else if (isPerson(mediaObj.item)) {
              addSearchHistoryItemHandler({
                id: mediaObj.item.name,
                itemName: mediaObj.item.name,
                itemType: "searchHistory",
              });
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
              addSearchHistoryItemHandler({
                id: mediaObj.item.name,
                itemName: mediaObj.item.name,
                itemType: "searchHistory",
              });
              navigateTo(
                mediaObj.item,
                "More Info",
                isMovie(mediaObj.item) ? "movie" : "tv"
              );
            }
          }}
        >
          <Ionicons
            size={17}
            name={
              isMovie(mediaObj.item)
                ? "film-outline"
                : isPerson(mediaObj.item)
                ? "person"
                : "tv-outline"
            }
            color={Colors.neutral[500]}
          />
          <Text className="text-text_primary text-sm">
            {isMovie(mediaObj.item)
              ? mediaObj.item.title
              : isISearchHistoryItem(mediaObj.item)
              ? mediaObj.item.itemName
              : mediaObj.item.name}{" "}
            <Text
              className="text-text_tertiary text-xs"
              style={{ lineHeight: 20 }}
            >
              {isMovie(mediaObj.item)
                ? mediaObj.item.release_date
                  ? "(" + mediaObj.item.release_date.substring(0, 4) + ")"
                  : null
                : isPerson(mediaObj.item)
                ? mediaObj.item.known_for_department
                  ? "(" + mediaObj.item.known_for_department + ")"
                  : null
                : isTv(mediaObj.item)
                ? mediaObj.item.first_air_date
                  ? "(" + mediaObj.item.first_air_date.substring(0, 4) + ")"
                  : null
                : null}
            </Text>
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderSearchHistoryItem = (mediaObj: ListRenderItemInfo<any>) => {
    return (
      <View className={"w-full justify-center overflow-hidden"}>
        <Pressable
          className="flex-1 flex-row items-center space-x-3 px-4"
          android_ripple={{ color: "#eee" }}
          onPress={() => {
            // when the search result is of a movie media
            if (isISearchHistoryItem(mediaObj.item)) {
              navigation.push("Search Tiles", {
                title: mediaObj.item.itemName,
                searchCategory: "multi",
              });
            }
          }}
        >
          <View className=" w-[5%]">
            <MaterialIcons
              size={18}
              name={"history"}
              color={Colors.neutral[500]}
            />
          </View>

          <Text className="py-3 text-text_primary text-sm w-[80%]">
            {isISearchHistoryItem(mediaObj.item)
              ? mediaObj.item.itemName
              : null}{" "}
          </Text>

          <View className="w-[10%] py-1">
            <CustomButton
              height={36}
              width={36}
              radius={100}
              color={"transparent"}
              styledClassName="ml-auto"
              // color={Colors.accentLighter}
              method={() => {
                // navigationHandler();
                removeSearchHistoryItemHandler(mediaObj.item);
              }}
            >
              <View className="flex-row space-x-2 items-center">
                <Ionicons name="close" color={Colors.neutral[400]} size={18} />
              </View>
            </CustomButton>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <FlashList
      // @ts-ignore
      data={
        searchQueryResult && searchQueryResult?.length > 0
          ? searchQueryResult
          : searchHistory
      }
      keyExtractor={(item, i) => `${item.id}-${i}`}
      // initialNumToRender={20}
      estimatedItemSize={45}
      renderItem={(mediaObj) =>
        searchQueryResult && searchQueryResult?.length > 0
          ? renderSearchResultsItem(mediaObj)
          : renderSearchHistoryItem(mediaObj)
      }
    />
  );
}
