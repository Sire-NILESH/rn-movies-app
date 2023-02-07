import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLogging } from "./src/hooks/useLogging";
import CustomButton from "./src/components/ui/CustomButton";
import PrimaryButton from "./src/components/ui/PrimaryButton";
import Banner from "./src/components/Banner";
import Thumbnail from "./src/components/Thumbnail";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { getAllScreenProps } from "./src/utils/requests";
import { useState } from "react";
import { Movie } from "./src/typings";
import Row from "./src/components/Row";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

export default function App() {
  const [logging] = useLogging("App Screen");
  function handler() {
    logging.info("hello world");
  }
  const [allScreenProps, setAllScreenProps] = useState<Props | null>(null);

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
            <ScrollView className="space-y-10 mb-5">
              <Banner netflixOriginals={allScreenProps.trendingNow} />
              {/* <Row title=""></Row> */}

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
}
