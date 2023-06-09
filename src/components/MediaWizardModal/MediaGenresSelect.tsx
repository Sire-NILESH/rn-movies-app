import { View, Text } from "react-native";
import React, { useMemo } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "../../utils/Colors";
import {
  IGenreSortBy,
  IUrlObject,
  MediaTypes,
  TReleaseYearConstraint,
} from "../../../types/typings";
import FilterSection from "../ui/FilterSection";

interface IProps {
  genrePlaylists: IUrlObject[];
  selectedPlaylistHandlers(playlist: IUrlObject, remove?: boolean): void;
  setCurrentLangHandler: (language: string) => void;
  setCurrentYearHandler: (year: number) => void;
  setCurrentGenreSortByHandler: (sortByFilter: IGenreSortBy) => void;
  setReleaseYearConstraintHandler: (constraint: TReleaseYearConstraint) => void;
  currentYear: number;
  mediaListType: MediaTypes;
}

const MediaGenresSelect: React.FC<IProps> = ({
  genrePlaylists,
  selectedPlaylistHandlers,
  setCurrentLangHandler,
  setCurrentYearHandler,
  setCurrentGenreSortByHandler,
  setReleaseYearConstraintHandler,
  currentYear,
  mediaListType,
}) => {
  const renderGenres = useMemo(() => {
    return genrePlaylists.map((playlist, index) => {
      return (
        <View
          key={playlist.name}
          className="flex-row px-4"
          style={
            index % 2 === 0
              ? { backgroundColor: "rgba(23, 23, 23, 1)" }
              : { backgroundColor: "rgba(23, 23, 23, 0.6)" }
          }
        >
          <BouncyCheckbox
            size={20}
            useNativeDriver
            fillColor={Colors.green[800]}
            unfillColor={"transparent"}
            innerIconStyle={{ borderWidth: 1 }}
            onPress={(isChecked: boolean) => {
              isChecked === true
                ? selectedPlaylistHandlers(playlist)
                : selectedPlaylistHandlers(playlist, true);
            }}
          />
          <Text className="px-2 py-2 text-left text-gray-300">
            {playlist.name}{" "}
          </Text>
        </View>
      );
    });
  }, []);

  return (
    <>
      {/* FILTER AND RELEASE/AIR DATE YEAR FILTER*/}
      <FilterSection
        setCurrentLangHandler={setCurrentLangHandler}
        setCurrentYearHandler={setCurrentYearHandler}
        setCurrentGenreSortByHandler={setCurrentGenreSortByHandler}
        setReleaseYearConstraintHandler={setReleaseYearConstraintHandler}
        currentYear={currentYear}
        mediaListType={mediaListType}
      />

      {/* CUSTOM GENRES SELECTS */}
      <View className="mt-8">
        <Text className="mb-1 ml-6 text-text_highLight text-base font-bold uppercase tracking-[2px]">
          Genres
        </Text>

        <Text className="ml-6 text-text_dark text-sm mb-4" numberOfLines={2}>
          Select one or more genres from the list below
        </Text>

        <View className="rounded-xl mx-5 overflow-hidden">{renderGenres}</View>
      </View>

      {/* CUSTOM GENRES SELECTS */}
      <View className="mt-4 mb-6 mx-8">
        <Text className="text-text_dark text-xs">
          {`Discover eg: All Hindi ${
            mediaListType === "movie" ? "Movies" : "TV shows"
          } released on / before / after 2010. (use as a standalone option)`}
        </Text>
      </View>
    </>
  );
};

export default MediaGenresSelect;
