// import { useMemo } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { IGenre, TvMedia } from "../typings";
import { getScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { Colors } from "../utils/Colors";

// import { SafeAreaView } from "react-native-safe-area-context";

import HeaderSearchButton from "../components/ui/HeaderSearchButton";

interface IProps {
  genreId: number;
  genreName: string;
  genreMedias: TvMedia[];
}

const genresToShow: IGenre[] = [
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 80, name: "Crime" },
  { id: 35, name: "Comedy" },
  { id: 10767, name: "Talk" },
  { id: 16, name: "Animation" },
  { id: 10751, name: "Family" },
  { id: 18, name: "Drama" },
  { id: 99, name: "Documentary" },
];

const TvShowsScreen: React.FC<IStackScreenProps> = (props) => {
  const [tvShowsScreenProps, setTvShowsScreenProps] = useState<IProps[] | null>(
    null
  );

  const { navigation, route } = props;

  useEffect(() => {
    async function fetchRequests() {
      // const data = await getTVScreenProps();
      const data = await getScreenProps(genresToShow, "tv");
      setTvShowsScreenProps(data);
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
            <Banner mediaList={tvShowsScreenProps[0].genreMedias} />

            {tvShowsScreenProps.map((m) => {
              if (m && m.genreMedias.length > 0) {
                return (
                  <Row
                    key={m.genreId}
                    title={m.genreName}
                    medias={m.genreMedias}
                    genreIdOfList={m.genreId}
                  />
                );
              } else null;
            })}
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default TvShowsScreen;
