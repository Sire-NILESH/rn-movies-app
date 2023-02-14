import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";

import { IStackScreenProps } from "../library/StackScreenProps";
import { useLogging } from "../hooks/useLogging";
import { Movie } from "../typings";
import { getAllScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";

interface CollectionProps {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
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
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 bg-stone-900">
      {/* <SafeAreaView className="flex-1 bg-stone-900"> */}
      <View className="flex-1">
        {allScreenProps ? (
          <ScrollView className="space-y-10">
            <Banner movieList={allScreenProps.trendingNow} />
            <Row title="Trending Now" movies={allScreenProps.trendingNow} />
            <Row title="Comedies" movies={allScreenProps.comedyMovies} />
            <Row title="Top Rated" movies={allScreenProps.topRated} />

            {/* My List */}
            {/* {list.length > 0 && <Row title="My List" movies={list} />} */}
            <Row
              title="Action Thrillers"
              movies={allScreenProps.actionMovies}
            />
            <Row title="Scary Movies" movies={allScreenProps.horrorMovies} />
            <Row title="Romance Movies" movies={allScreenProps.romanceMovies} />
            <Row title="Documentaries" movies={allScreenProps.documentaries} />
          </ScrollView>
        ) : null}
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default HomeScreen;
