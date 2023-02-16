import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";

import { IStackScreenProps } from "../library/StackScreenProps";
import { useLogging } from "../hooks/useLogging";
import { Movie, MovieMedia, TvMedia } from "../typings";
import { getAllScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Header from "./../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

interface CollectionProps {
  netflixOriginalsShows: TvMedia[];
  trendingNow: MovieMedia[];
  topRated: MovieMedia[];
  actionMovies: MovieMedia[];
  comedyShows: TvMedia[];
  horrorMovies: MovieMedia[];
  romanceShows: TvMedia[];
  documentaries: TvMedia[];
}

// interface IProps extends IStackScreenProps, CollectionProps {}

// <Button title="About" onPress={() => navigation.navigate("About")} />
// <Button title="Contact" onPress={() => navigation.navigate("Contact")} />

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging("Home Screen");
  const { navigation, route } = props;
  const [allScreenProps, setAllScreenProps] = useState<CollectionProps | null>(
    null
  );

  useEffect(() => {
    async function fetchRequests() {
      const data = await getAllScreenProps();
      setAllScreenProps(data.props);
    }
    fetchRequests();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <SafeAreaView>
            <Header />
          </SafeAreaView>
        );
      },
      headerTransparent: true,
      headerShown: true,
    });
  }, []);

  return (
    <View className="flex-1 bg-stone-900">
      {/* <SafeAreaView className="flex-1 bg-stone-900"> */}
      <View className="flex-1">
        {allScreenProps ? (
          <ScrollView className="space-y-10">
            <Banner mediaList={allScreenProps.trendingNow} />
            <Row title="Trending Now" medias={allScreenProps.trendingNow} />
            <Row title="Comedies" medias={allScreenProps.comedyShows} />
            <Row title="Top Rated" medias={allScreenProps.topRated} />

            {/* My List */}
            {/* {list.length > 0 && <Row title="My List" movies={list} />} */}
            <Row
              title="Action Thrillers"
              medias={allScreenProps.actionMovies}
            />
            <Row title="Scary Movies" medias={allScreenProps.horrorMovies} />
            <Row title="Romance Movies" medias={allScreenProps.romanceShows} />
            <Row title="Documentaries" medias={allScreenProps.documentaries} />
          </ScrollView>
        ) : null}
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default HomeScreen;
