import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";

import { IStackScreenProps } from "../library/StackScreenProps";
import { useLogging } from "../hooks/useLogging";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { getHomeScreenProps } from "../utils/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Header from "./../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

interface IProps {
  genreId: number;
  genreName: string;
  genreMedias: MovieMedia[] | TvMedia[];
}

export interface IGenresToShowHomeSCreen {
  id: number;
  name: string;
  mediaType: MediaTypes;
}

const genresToShow: IGenresToShowHomeSCreen[] = [
  { id: 10765, name: "Sci-Fi & Fantasy", mediaType: "tv" },
  { id: 28, name: "Action", mediaType: "movie" },
  { id: 16, name: "Animation", mediaType: "tv" },
  { id: 35, name: "Comedy", mediaType: "movie" },
  { id: 18, name: "Drama", mediaType: "tv" },
  { id: 10752, name: "War", mediaType: "movie" },
  { id: 99, name: "Documentary", mediaType: "tv" },
  { id: 10751, name: "Family", mediaType: "movie" },
];

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging("Home Screen");
  const { navigation, route } = props;
  const [allScreenProps, setAllScreenProps] = useState<IProps[] | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      // const data = await getAllScreenProps();
      const data = await getHomeScreenProps(genresToShow);
      setAllScreenProps(data);
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
      <View className="flex-1">
        {allScreenProps ? (
          <ScrollView className="space-y-10">
            <Banner mediaList={allScreenProps[0].genreMedias} />

            {allScreenProps.map((m) => {
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
    </View>
  );
};

export default HomeScreen;
