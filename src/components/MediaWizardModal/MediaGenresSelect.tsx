import { View, Text } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import LanguageDropdown from "../ui/LanguageDropdown";
import YearsDropdown from "../ui/YearsDropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "../../utils/Colors";
import {
  IGenreSortBy,
  IUrlObject,
  MediaTypes,
  TReleaseYearConstraint,
} from "../../../types/typings";
import GenresSortByDropDown from "../ui/GenresSortByDropDown";

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
  const [afterCheckboxState, setAfterCheckboxState] = useState(false);
  const [beforeCheckboxState, setBeforeCheckboxState] = useState(false);

  useEffect(() => {
    if (!afterCheckboxState && !beforeCheckboxState) {
      setReleaseYearConstraintHandler(undefined);
    }
  }, [afterCheckboxState, beforeCheckboxState]);

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
      {/* FILTER */}
      <View className="mt-4">
        <Text className="mb-1 ml-6 text-text_highLight text-base font-bold uppercase tracking-[2px]">
          Filters
        </Text>

        <Text className="mx-6 text-text_dark text-sm mb-2" numberOfLines={2}>
          Select a language and/or year of release
        </Text>

        <View
          className="flex-row space-x-4 items-center justify-between px-4 mt-2 rounded-xl"
          // style={{ backgroundColor: "rgb(4, 20, 10)" }}
        >
          <LanguageDropdown
            saveMode="local"
            localLangSetter={setCurrentLangHandler}
            bgColor={Colors.stone[900]}
          />
          <YearsDropdown
            saveMode="local"
            localYearSetter={setCurrentYearHandler}
            bgColor={Colors.stone[900]}
          />
        </View>
      </View>

      {/* RELEASE/AIR DATE YEAR FILTER */}
      <View className="mt-6">
        <Text className="mb-1 ml-6 text-text_highLight text-base font-bold uppercase tracking-[2px]">
          Optional
        </Text>

        <Text className="ml-6 text-text_dark text-sm" numberOfLines={2}>
          {`${mediaListType === "movie" ? "Release" : "Air"} date period ( ${
            currentYear === 0 ? "unavailable on 'All years'" : "optional"
          } )`}
        </Text>

        <View
          className="mt-4 flex-row space-x-8 items-center ml-6 rounded-xl"
          // style={{ backgroundColor: "rgb(4, 20, 10)" }}
        >
          <View className="flex-row items-center ">
            <BouncyCheckbox
              size={20}
              useNativeDriver
              disableBuiltInState
              disabled={currentYear === 0 ? true : false}
              isChecked={beforeCheckboxState}
              fillColor={Colors.green[800]}
              unfillColor={"transparent"}
              innerIconStyle={{ borderWidth: 1 }}
              onPress={(isChecked: boolean) => {
                setBeforeCheckboxState((prev) => {
                  return prev === false ? true : false;
                });

                if (!isChecked === true) {
                  setAfterCheckboxState(false);
                  setReleaseYearConstraintHandler("lte");
                }
              }}
            />
            {/* <Text className="text-text_secondary mr-3 text-base">{"🚫"}</Text> */}
            <Text className="text-text_secondary">{"Before"}</Text>
          </View>

          <View className="flex-row items-center">
            <BouncyCheckbox
              size={20}
              useNativeDriver
              disableBuiltInState
              disabled={currentYear === 0 ? true : false}
              isChecked={afterCheckboxState}
              fillColor={Colors.green[800]}
              unfillColor={"transparent"}
              innerIconStyle={{ borderWidth: 1 }}
              onPress={(isChecked: boolean) => {
                setAfterCheckboxState((prev) => {
                  return prev === false ? true : false;
                });
                if (!isChecked === true) {
                  setBeforeCheckboxState(false);
                  setReleaseYearConstraintHandler("gte");
                }
              }}
            />
            <Text className="text-text_secondary">{"After"}</Text>
          </View>
        </View>

        <View className="mt-8">
          <Text className="ml-6 mb-4 text-text_dark text-sm" numberOfLines={2}>
            {"Sort content by ( ↓ Descending, ↑ Ascending )"}
          </Text>

          <View className="ml-4">
            <GenresSortByDropDown
              saveMode="local"
              localGenreSortBySetter={setCurrentGenreSortByHandler}
              bgColor={Colors.stone[900]}
            />
          </View>
        </View>
      </View>

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
        <Text className="text-text_dark text-sm">
          {`Discover eg: All Hindi ${
            mediaListType === "movie" ? "Movies" : "TV shows"
          } released on / before / after 2010. (use as a standalone option)`}
        </Text>
      </View>
    </>
  );
};

export default MediaGenresSelect;
