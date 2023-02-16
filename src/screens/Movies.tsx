import { View, Text, ScrollView } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Movie, MovieMedia } from "../typings";
import { getMoviesScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { Colors } from "../utils/Colors";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";

interface Props {
  netflixOriginals: MovieMedia[];
  trendingNow: MovieMedia[];
  topRated: MovieMedia[];
  actionMovies: MovieMedia[];
  comedyMovies: MovieMedia[];
  horrorMovies: MovieMedia[];
  romanceMovies: MovieMedia[];
  documentaries: MovieMedia[];
}

const MoviesScreen: React.FC<IStackScreenProps> = (props) => {
  const [moviesScreenProps, setMoviesScreenProps] = useState<Props | null>(
    null
  );
  const { navigation, route } = props;

  useEffect(() => {
    async function fetchRequests() {
      const data = await getMoviesScreenProps();
      // console.log(data.props);
      setMoviesScreenProps(data.props);
    }
    fetchRequests();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.stone[900],
      },
      headerTitle: "Movies",
      headerTitleAlign: "center",
      headerTintColor: Colors.gray[100],
      headerShown: true,
      headerShadowVisible: false,
      headerRight: (props) => <HeaderSearchButton searchCategory="movie" />,
    });
  }, []);

  return (
    <View className="flex-1 bg-stone-900 ">
      <View className="flex-1">
        {moviesScreenProps ? (
          <ScrollView className="space-y-10">
            <Banner mediaList={moviesScreenProps.trendingNow} />
            <Row title="Trending Now" medias={moviesScreenProps.trendingNow} />
            <Row title="Comedies" medias={moviesScreenProps.comedyMovies} />
            <Row title="Top Rated" medias={moviesScreenProps.topRated} />

            {/* My List */}
            {/* {list.length > 0 && <Row title="My List" movies={list} />} */}
            <Row
              title="Action Thrillers"
              medias={moviesScreenProps.actionMovies}
            />
            <Row title="Scary Movies" medias={moviesScreenProps.horrorMovies} />
            <Row
              title="Romance Movies"
              medias={moviesScreenProps.romanceMovies}
            />
            <Row
              title="Documentaries"
              medias={moviesScreenProps.documentaries}
            />
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};

export default MoviesScreen;
