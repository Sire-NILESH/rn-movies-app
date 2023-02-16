// import { useMemo } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Movie, MovieMedia, TvMedia } from "../typings";
import { getTVScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { Colors } from "../utils/Colors";

// import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";

interface Props {
  netflixOriginals: TvMedia[];
  trendingNow: TvMedia[];
  topRated: TvMedia[];
  animationTvShows: TvMedia[];
  comedyTvShows: TvMedia[];
  crimeTvShows: TvMedia[];
  romanceTvShows: TvMedia[];
  documentaries: TvMedia[];
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
            <Banner mediaList={tvShowsScreenProps.trendingNow} />
            <Row title="Trending Now" medias={tvShowsScreenProps.trendingNow} />
            <Row title="Comedies" medias={tvShowsScreenProps.comedyTvShows} />
            <Row title="Top Rated" medias={tvShowsScreenProps.topRated} />

            {/* My List */}
            {/* {list.length > 0 && <Row title="My List" movies={list} />} */}
            <Row
              title="Animations"
              medias={tvShowsScreenProps.animationTvShows}
            />
            <Row title="Crime" medias={tvShowsScreenProps.crimeTvShows} />
            <Row title="Romance" medias={tvShowsScreenProps.romanceTvShows} />
            <Row
              title="Documentaries"
              medias={tvShowsScreenProps.documentaries}
            />
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default TvShowsScreen;
// props: { navigation: StackNavigationProp<any> }
