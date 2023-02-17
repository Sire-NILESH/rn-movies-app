import { View, Text, ScrollView } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { IGenre, MovieMedia } from "../typings";
import { getScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { Colors } from "../utils/Colors";
import HeaderSearchButton from "../components/ui/HeaderSearchButton";

interface IProps {
  genreId: number;
  genreName: string;
  genreMedias: MovieMedia[];
}

const genresToShow: IGenre[] = [
  { id: 35, name: "Comedy" },
  { id: 12, name: "Adventure" },
  { id: 18, name: "Drama" },
  { id: 28, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Science Fiction" },
  { id: 99, name: "Documentary" },
];

const MoviesScreen: React.FC<IStackScreenProps> = (props) => {
  const [moviesScreenProps, setMoviesScreenProps] = useState<IProps[] | null>(
    null
  );

  const { navigation, route } = props;

  useEffect(() => {
    async function fetchRequests() {
      // const data = await getMoviesScreenProps();
      const data = await getScreenProps(genresToShow, "movie");
      // console.log(data.props);
      setMoviesScreenProps(data);
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
            <Banner mediaList={moviesScreenProps[0].genreMedias} />

            {moviesScreenProps.map((m) => {
              if (m && m.genreMedias.length > 0) {
                return (
                  <Row
                    key={m.genreId}
                    title={m.genreName}
                    medias={m.genreMedias}
                  />
                );
              } else null;
            })}
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};

export default MoviesScreen;
