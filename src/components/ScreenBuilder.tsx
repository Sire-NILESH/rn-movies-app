import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";

import { useState } from "react";
import { Movie } from "../typings";
import { useLogging } from "./../hooks/useLogging";
import { getAllScreenProps } from "../utils/requests";
import Banner from "./Banner";
import Row from "./Row";

interface IProps {}

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

const ScreenBuilder: React.FC<IProps> = () => {
  const [logging] = useLogging("ScreenBuilder Screen");
  function handler() {
    logging.info("hello world");
  }
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

  // logging.info(allScreenProps);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-stone-900">
        <View className="flex-1">
          {allScreenProps ? (
            <ScrollView className="space-y-10">
              <Banner netflixOriginals={allScreenProps.trendingNow} />
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
              <Row
                title="Romance Movies"
                movies={allScreenProps.romanceMovies}
              />
              <Row
                title="Documentaries"
                movies={allScreenProps.documentaries}
              />
            </ScrollView>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default ScreenBuilder;
