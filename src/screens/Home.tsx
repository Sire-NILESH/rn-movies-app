import React, { useState, useEffect, useLayoutEffect } from "react";
import { View } from "react-native";
import { IStackScreenProps } from "../library/StackScreenProps";
import { useLogging } from "../hooks/useLogging";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { getHomeScreenProps } from "../utils/requests";
import Header from "./../components/Header";
import ScreenBuilder from "../components/ScreenBuilder";
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
      const data = await getHomeScreenProps(genresToShow);
      setAllScreenProps(data);
    }
    fetchRequests();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <>
            <Header />
          </>
        );
      },
      headerTransparent: true,
      headerShown: true,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-stone-900">
      {allScreenProps ? (
        <ScreenBuilder contents={allScreenProps} />
      ) : (
        <View className="flex-1 bg-stone-900" />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
