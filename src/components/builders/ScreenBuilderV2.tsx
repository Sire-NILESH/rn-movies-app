import React, { useState, useMemo } from "react";
import { View, ScrollView } from "react-native";
import {
  IGenresToShowHomeScreen,
  MovieMedia,
  ScreenTypes,
  TvMedia,
} from "../../../types/typings";
import Banner from "../Banner";
import Row from "../Row";
import NothingToShow from "../NothingToShow";
import { showErrorAlert } from "../../utils/helpers/helper";
import useFetchScreenProps from "../../hooks/useFetchScreenProps";
import Loader from "../ui/Loader";
import { memo } from "react";
import {
  homeScreenGenresToShow,
  movieScreenGenresToShow,
  tvScreenGenresToShow,
} from "../../config/screenGenresConfig";
import RowAsync from "../RowAsync";
import useFetcher from "../../hooks/useFetcher";
import { getGenreMediasProps } from "../../utils/requests";

interface IProps {
  screenType: ScreenTypes;
}

interface IState {
  genreId: number;
  genreName: string;
  genreMedias: TvMedia[] | MovieMedia[];
}

function getGenresToFetch(screenType: ScreenTypes) {
  // Get the genre list to fetch depending on the screen type.
  let genresToFetch;
  switch (screenType) {
    case "tv":
      genresToFetch = tvScreenGenresToShow;
      break;
    case "movie":
      genresToFetch = movieScreenGenresToShow;
      break;
    default:
      genresToFetch = homeScreenGenresToShow;
  }

  return genresToFetch;
}

const ScreenBuilderV2: React.FC<IProps> = ({ screenType }) => {
  const genresToFetch = useMemo(() => {
    const result = getGenresToFetch(screenType);
    return result;
  }, []);

  const params = [[genresToFetch[0].id], genresToFetch[0].mediaType, 1];
  const useFetcherMemo = React.useCallback(() => {
    return useFetcher(getGenreMediasProps, [...params]);
  }, []);

  const { screenProps, loadingProps, errorLoadingProps } = useFetcherMemo();

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      <Loader loading={loadingProps} />

      {!loadingProps && errorLoadingProps ? (
        //   if no props then
        <NothingToShow
          title={"Something went wrong while loading content"}
          problemType="error"
        />
      ) : !errorLoadingProps && screenProps ? (
        //   when no error and props
        <View className="flex-1">
          {screenProps ? (
            <ScrollView className="space-y-10">
              {screenProps.length > 0 ? (
                <Banner mediaList={screenProps} />
              ) : null}

              {!loadingProps &&
                genresToFetch.map((m: IGenresToShowHomeScreen, i) => {
                  //  return <RowAsync key={m.id} title={m.name} mediaGenre={m} />;
                  if (i === 0) {
                    return (
                      <Row
                        key={m.id}
                        title={m.name}
                        medias={screenProps}
                        genreIdOfList={m.id}
                      />
                    );
                  } else {
                    return (
                      <RowAsync key={m.id} title={m.name} mediaGenre={m} />
                    );
                  }
                })}
            </ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default memo(ScreenBuilderV2);

{
  /* <View className="flex-1">
<ScrollView className="space-y-10">
  {mediaForBanner.length > 0 ? (
    <Banner mediaList={mediaForBanner} />
  ) : null}

  {genresToFetch.map((m: IGenresToShowHomeScreen) => {
    return <RowAsync key={m.id} title={m.name} mediaGenre={m} />;
  })}
</ScrollView>
</View> */
}
