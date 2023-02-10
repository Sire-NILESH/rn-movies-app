import { View, Text, ScrollView, Pressable } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Movie } from "../typings";
import { getTVScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { Colors } from "../utils/Colors";
import IconButton from "./../components/ui/IconButton";
import MoviesScreen from "./Movies";
import { StackNavigationProp } from "@react-navigation/stack";

import { useNavigation } from "@react-navigation/native";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  animationTvShows: Movie[];
  comedyTvShows: Movie[];
  crimeTvShows: Movie[];
  romanceTvShows: Movie[];
  documentaries: Movie[];
}

function SearchButton() {
  const navigation = useNavigation();

  function onPressHandler() {
    console.log("onPressHandler");
    // navigation.navigate('SearchScreen');
    navigation.navigate("Search Screen");
  }

  return (
    <Pressable onPress={onPressHandler} className="mr-4">
      <IconButton
        name="search-outline"
        size={24}
        color={Colors.gray[100]}
        // method={onPressHandler}
      />
    </Pressable>
  );
}

const TvShowsScreen: React.FC<IStackScreenProps> = (props) => {
  const [tvShowsScreenProps, setTvShowsScreenProps] = useState<Props | null>(
    null
  );
  const { navigation, route } = props;

  useEffect(() => {
    async function fetchRequests() {
      const data = await getTVScreenProps();
      // console.log(data.props.actionMovies);
      // console.log(data.props.horrorTvShows);
      setTvShowsScreenProps(data.props);
    }
    fetchRequests();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.stone[900],
      },
      // headerTransparent: true,
      headerTitle: "TV Shows",
      headerTitleAlign: "center",
      headerTintColor: Colors.gray[100],
      headerShown: true,
      headerRight: (props) => <SearchButton />,
    });
  }, []);

  return (
    <View className="flex-1 bg-stone-900">
      <View className="flex-1">
        {tvShowsScreenProps ? (
          <ScrollView className="space-y-10">
            <Banner netflixOriginals={tvShowsScreenProps.trendingNow} />
            <Row title="Trending Now" movies={tvShowsScreenProps.trendingNow} />
            <Row title="Comedies" movies={tvShowsScreenProps.comedyTvShows} />
            <Row title="Top Rated" movies={tvShowsScreenProps.topRated} />

            {/* My List */}
            {/* {list.length > 0 && <Row title="My List" movies={list} />} */}
            <Row
              title="Animations"
              movies={tvShowsScreenProps.animationTvShows}
            />
            <Row title="Crime" movies={tvShowsScreenProps.crimeTvShows} />
            <Row title="Romance" movies={tvShowsScreenProps.romanceTvShows} />
            <Row
              title="Documentaries"
              movies={tvShowsScreenProps.documentaries}
            />
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};

export default TvShowsScreen;
// props: { navigation: StackNavigationProp<any> }
