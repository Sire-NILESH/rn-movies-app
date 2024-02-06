import { View, Text, Modal, Pressable } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { IUrlObject, MediaTypes } from "../../types/typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import useFilterSectionHooks from "../hooks/useFilterSectionHooks";
import FilterSection from "./ui/FilterSection";
import { movieGenresList, tvGenresList } from "../utils/helpers/helper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface IProps {
  isVisible: boolean;
  closeModal: () => void;
  mediaListType: MediaTypes;
  playlist: IUrlObject;
  closeWithConfirm: (playlists: IUrlObject[]) => void;
}

const TilesFilterModal: React.FC<IProps> = (props) => {
  const {
    setCurrentLangHandler,
    setCurrentYearHandler,
    setCurrentGenreSortByHandler,
    setReleaseYearConstraintHandler,
    currentYear,
    filters,
  } = useFilterSectionHooks({ mediaListType: props.mediaListType });

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [showResetBtn, setShowResetBtn] = useState<boolean>(false);
  //   const [filteredPlaylist, setFilteredPlaylist] = useState<IUrlObject[]>([]);

  // playlists to show in the modal
  const genres =
    props.mediaListType === "movie" ? movieGenresList : tvGenresList;

  function selectedGenresHandlers(
    currentSelectedGenre: number,
    remove?: boolean
  ): void {
    if (remove !== undefined && remove === true) {
      setSelectedGenres((prev) => {
        const i = prev.findIndex(
          (selectedGenres) => selectedGenres === currentSelectedGenre
        );
        prev.splice(i, 1);
        return [...prev];
      });
    } else setSelectedGenres((prev) => [...prev, currentSelectedGenre]);
  }

  function onConfirmHandler() {
    const playlistWithFiltersCpy: IUrlObject = Object.assign(
      {},
      props.playlist
    );

    Object.keys(filters).forEach((k) => {
      // @ts-ignore
      return (playlistWithFiltersCpy.queryParams[k] = filters[k]);
    });

    if (selectedGenres.length > 0) {
      const commaSeperatedGenresList: string = selectedGenres.join(",");
      playlistWithFiltersCpy.queryParams["with_genres"] =
        commaSeperatedGenresList;
    } else {
      delete playlistWithFiltersCpy.queryParams["with_genres"];
    }

    props.closeWithConfirm([playlistWithFiltersCpy]);
  }

  function resetHandler() {
    const playlistWithFiltersCpy: IUrlObject = Object.assign(
      {},
      props.playlist
    );

    const resetFields = {
      primary_release_year: "0",
      with_original_language: "",
    };

    Object.keys(resetFields).forEach((k) => {
      // @ts-ignore
      return (playlistWithFiltersCpy.queryParams[k] = resetFields[k]);
    });

    delete playlistWithFiltersCpy.queryParams["with_genres"];

    props.closeWithConfirm([playlistWithFiltersCpy]);
  }

  const renderGenres = useMemo(() => {
    return genres.map((genre, index) => {
      return (
        <View
          key={genre.id}
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
                ? selectedGenresHandlers(genre.id)
                : selectedGenresHandlers(genre.id, true);
            }}
          />
          <Text className="px-2 py-2 text-left text-gray-300">
            {genre.name}{" "}
          </Text>
        </View>
      );
    });
  }, []);

  useEffect(() => {
    if (
      filters["first_air_date_year"] === "0" &&
      filters["with_original_language"] === ""
    ) {
      setShowResetBtn(true);
    } else {
      setShowResetBtn(false);
    }
  }, [filters]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.closeModal}
      className="items-center justify-center"
    >
      <View className="absolute my-[18%] mx-[5%] h-[85%] w-[90%] bg-neutral-800 rounded-xl pb-2 border border-neutral-700/60 [elevation:10]">
        {/* HEADER */}
        <View className="mt-1 flex-row items-center justify-between h-[42] px-[20]">
          {/* Header Title */}
          <View className="flex-row items-center space-x-2">
            <Text
              className="text-text_highLight text-lg font-bold"
              numberOfLines={1}
            >
              {"Additional Filters"}
            </Text>
          </View>
          {/* Header Buttons */}
          <View className="flex-row justify-between items-center">
            {/* {showResetBtn ? ( */}
            <View className=" rounded-full overflow-hidden">
              <Pressable
                disabled={
                  props.playlist.additionalFiltersUnsupported === false ||
                  props.playlist.additionalFiltersUnsupported === undefined
                    ? false
                    : true
                }
                className="flex-1 p-2"
                onPress={resetHandler}
                android_ripple={{ color: "#eee" }}
              >
                <MaterialIcons
                  name={"refresh"}
                  color={Colors.gray[100]}
                  size={24}
                  style={{
                    opacity:
                      props.playlist.additionalFiltersUnsupported === false ||
                      props.playlist.additionalFiltersUnsupported === undefined
                        ? 1
                        : 0,
                  }}
                />
              </Pressable>
            </View>
            {/* ) : null} */}

            <View className=" rounded-full overflow-hidden">
              <Pressable
                disabled={
                  props.playlist.additionalFiltersUnsupported === false ||
                  props.playlist.additionalFiltersUnsupported === undefined
                    ? false
                    : true
                }
                className="flex-1 p-2"
                onPress={onConfirmHandler}
                android_ripple={{ color: "#eee" }}
              >
                <MaterialIcons
                  name={"done"}
                  color={Colors.gray[100]}
                  size={24}
                  style={{
                    opacity:
                      props.playlist.additionalFiltersUnsupported === false ||
                      props.playlist.additionalFiltersUnsupported === undefined
                        ? 1
                        : 0,
                  }}
                />
              </Pressable>
            </View>

            <View className="rounded-full overflow-hidden">
              <Pressable
                onPress={() => {
                  // resetViewHandler();
                  props.closeModal();
                }}
                className="p-2"
                android_ripple={{ color: "#eee" }}
              >
                <Ionicons name="close" color={Colors.gray[100]} size={24} />
              </Pressable>
            </View>
          </View>
        </View>

        {props.playlist.additionalFiltersUnsupported === false ||
        props.playlist.additionalFiltersUnsupported === undefined ? (
          <ScrollView className="flex-1">
            {/* FILTER AND RELEASE/AIR DATE YEAR FILTER*/}
            <FilterSection
              setCurrentLangHandler={setCurrentLangHandler}
              setCurrentYearHandler={setCurrentYearHandler}
              setCurrentGenreSortByHandler={setCurrentGenreSortByHandler}
              setReleaseYearConstraintHandler={setReleaseYearConstraintHandler}
              currentYear={currentYear}
              mediaListType={props.mediaListType}
            />

            {/* CUSTOM GENRES SELECTS */}
            <View className="mt-8">
              <Text className="mb-1 ml-6 text-text_highLight text-base font-bold uppercase tracking-[2px]">
                Filter By Genres
              </Text>

              <Text
                className="ml-6 text-text_dark text-sm mb-4"
                numberOfLines={2}
              >
                Select one or more genres from the list below
              </Text>

              <View className="rounded-xl mx-5 overflow-hidden">
                {renderGenres}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View className="flex-1">
            <Text className="mt-40 text-center text-xl text-text_dark font-bold">{`Filters are not supported by \n'${props.playlist.name}'`}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default TilesFilterModal;
