import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import { useLogging } from "../hooks/useLogging";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Colors } from "./../utils/Colors";
import { searchRequest } from "./../utils/requests";
import { FlatList } from "react-native-gesture-handler";

type TContent = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: ArrayConstructor[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

interface ISearchResults {
  props: TContent[];
}

interface ISearchInputProps {
  inputText: string | null;
  onTextChangeHandler: (text: string) => void;
}

// const abortController = new AbortController();

const SearchInput: React.FC<ISearchInputProps> = (props) => {
  return (
    <View className="flex-1 bg-stone-900 w-[280] mt-1">
      <TextInput
        placeholder="Search something..."
        className="bg-stone-700 px-6 py-2 rounded-md text-gray-100"
        placeholderTextColor={Colors.stone[400]}
        onChangeText={props.onTextChangeHandler}
        //   value={props.inputText ? props.inputText : null}
      />
    </View>
  );
};

const SearchScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging("Search Screen");
  const { navigation, route } = props;
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchQueryResult, setSearchQueryResult] =
    useState<ISearchResults | null>(null);

  function setSearchQueryHandler(text: string): void {
    setSearchQuery(text);
  }

  useEffect(() => {
    const abortController: AbortController = new AbortController();
    async function fetchSearchQuery() {
      const data = await searchRequest(
        searchQuery ? searchQuery : "",
        "movie",
        abortController
      );
      setSearchQueryResult(data);
    }
    if (searchQuery != null && searchQuery.length >= 2) {
      fetchSearchQuery();
      // logging.info(searchQuery);
    }

    return () => abortController.abort();
    //  return () => abortController.abort();
  }, [searchQuery]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.stone[900],
      },
      // headerTransparent: true,
      // headerTitle: "Search",
      headerTitle: (props) => {
        return (
          <SearchInput
            inputText={searchQuery}
            onTextChangeHandler={setSearchQueryHandler}
          />
        );
      },
      headerTitleAlign: "center",
      headerTintColor: Colors.gray[100],
      headerShown: true,
      //   headerRight: (props) => <SearchButton />,
    });
  }, []);

  //   logging.info(searchQueryResult);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-stone-800">
        <View className="flex-1 px-4 py-2">
          {/* Search List suggestions */}
          {searchQuery != null && searchQuery.length >= 2 ? (
            <FlatList
              data={searchQueryResult?.props}
              keyExtractor={(item) => String(item.id)}
              renderItem={(movieObj) => (
                <View className="w-full border-b border-b-stone-700 py-3 px-2 justify-between overflow-clip">
                  <Text className="text-gray-100">
                    {movieObj.item.title
                      ? movieObj.item.title
                      : movieObj.item.original_title}{" "}
                    <Text className="text-xs">
                      ({movieObj.item.release_date})
                    </Text>
                  </Text>
                </View>
              )}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;
