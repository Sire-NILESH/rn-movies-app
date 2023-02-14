// import { useMemo } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Movie } from "../typings";
import { getTVScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { Colors } from "../utils/Colors";

// import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";

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

const TvShowsScreen: React.FC<IStackScreenProps> = (props) => {
  const [tvShowsScreenProps, setTvShowsScreenProps] = useState<Props | null>(
    null
  );
  const { navigation, route } = props;

  useEffect(() => {
    async function fetchRequests() {
      const data = await getTVScreenProps();
      setTvShowsScreenProps(data.props);
    }
    fetchRequests();
  }, []);
  // const memoVal = useMemo(() => {
  //   async function fetchRequests() {
  //     const data = await getTVScreenProps();
  //     setTvShowsScreenProps(data.props);
  //   }
  //   fetchRequests();
  // }, []);

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
      presentation: "card",
      animationTypeForReplace: "push",

      headerRight: (props) => <HeaderSearchButton searchCategory="tv" />,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-stone-900">
      <View className="flex-1">
        {tvShowsScreenProps ? (
          <ScrollView className="space-y-10">
            <Banner movieList={tvShowsScreenProps.trendingNow} />
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
    </SafeAreaView>
  );
};

export default TvShowsScreen;
// props: { navigation: StackNavigationProp<any> }
