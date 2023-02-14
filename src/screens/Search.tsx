import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, TextInput, SafeAreaView, Pressable } from "react-native";
import { useLogging } from "../hooks/useLogging";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Colors } from "./../utils/Colors";
import { FlatList } from "react-native-gesture-handler";
import { searchRequest } from "../utils/requests";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../typings";
import HeaderSearchButton from "./../components/ui/HeaderSearchButton";

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
  props: Movie[];
}

interface ISearchInputProps {
  inputText: string | null;
  onTextChangeHandler: (text: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = (props) => {
  return (
    <View className="flex-1 bg-stone-900 min-w-[280] mt-2">
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
  const [logging] = useLogging("Search Screen");
  const { navigation, route } = props;
  // const navigation = useNavigation();
  const searchCategory = route.params.searchCategory;
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
        searchCategory ? searchCategory : "multi",
        abortController
      );
      data && setSearchQueryResult(data);
    }

    try {
      if (searchQuery != null && searchQuery.length >= 2) {
        fetchSearchQuery();
        // logging.info(searchQuery);
      }
    } catch (err) {
      console.log(err.message);
    }

    return () => abortController.abort();
    //  return () => abortController.abort();
  }, [searchQuery]);

  // Header settings
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
      presentation: "modal",
      headerShadowVisible: false,
      headerRight:
        searchQueryResult?.props.length && searchQueryResult?.props.length > 0
          ? (props) => (
              <HeaderSearchButton
                gotoList={true}
                movies={searchQueryResult.props}
                title={searchQuery}
              />
            )
          : undefined,
    });
  }, [searchQueryResult]);

  // logging.info(searchQueryResult);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-stone-800">
        <View className="flex-1 pb-2">
          {/* Search List suggestions */}
          {searchQuery != null && searchQuery.length >= 2 ? (
            <FlatList
              data={searchQueryResult?.props}
              keyExtractor={(item) =>
                String(item.id) + String(Math.random() * 10)
              }
              renderItem={(movieObj) => {
                // movieObj.index === 3 && console.log(movieObj.index);
                return (
                  <View
                    className="w-full justify-center overflow-clip"
                    style={
                      movieObj.index % 2 === 0
                        ? { backgroundColor: Colors.stone[800] }
                        : { backgroundColor: Colors.stone[900] }
                    }
                  >
                    <Pressable
                      className="flex-1 px-4 py-3"
                      onPress={() => {
                        console.log(movieObj.item);
                        navigation.navigate("More Info", {
                          movie: movieObj.item,
                        });
                      }}
                    >
                      <Text className="text-gray-100">
                        {/* {movieObj.item.} */}
                        {movieObj.item.title
                          ? movieObj.item.title
                          : movieObj.item.original_title}{" "}
                        <Text className="text-xs">
                          ({movieObj.item.release_date})
                        </Text>
                      </Text>
                    </Pressable>
                  </View>
                );
              }}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;
