import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "./../utils/Colors";
import { IUrlObject, MediaTypes } from "../../types/typings";
import { moviePlaylist, tvPlaylist } from "../config/genresWithRoutes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LanguageDropdown from "./ui/LanguageDropdown";
import YearsDropdown from "./ui/YearsDropdown";
import {
  useDefaultLanguageHooks,
  useDefaultRegionHooks,
  useDefaultYearHooks,
} from "../hooks/reduxHooks";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  mediaListType: MediaTypes;
  closeWithConfirm: (playlists: IUrlObject[]) => void;
}

const MediaWizardModal: React.FC<IProps> = ({
  isVisible,
  onClose,
  mediaListType,
  closeWithConfirm,
}) => {
  const { defaultYear } = useDefaultYearHooks();
  const { setDefaultLanguageHandler, defaultLanguage } =
    useDefaultLanguageHooks();
  const [selectedPlaylists, setSelectedPlaylists] = useState<IUrlObject[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(defaultYear.year);
  const [currentLang, setCurrentLang] = useState<string>(
    defaultLanguage.iso639_1
  );

  const setCurrentYearHandler = (year: number) => {
    setCurrentYear(year);
  };

  const setCurrentLangHandler = (language: string) => {
    setCurrentLang(language);
  };

  console.log("YYYYYOOOOOO YEAR", currentYear);
  console.log("YYYYYOOOOOO LANG", currentLang);

  const filters = {
    primary_release_year: String(currentYear),
    with_original_language: currentLang,
  };

  console.log("fffffffiiilters", filters);

  function selectedPlaylistHandlers(
    playlist: IUrlObject,
    remove?: boolean
  ): void {
    if (remove !== undefined && remove === true) {
      setSelectedPlaylists((prev) => {
        const i = prev.findIndex(
          (playlistCurrent) => playlistCurrent.name === playlist.name
        );
        prev.splice(i, 1);
        return [...prev];
      });
    } else setSelectedPlaylists((prev) => [...prev, playlist]);
  }

  function onConfirmHandler() {
    const selectedGenresNames: string[] = [];
    const selectedGenresList: string[] = [];

    selectedPlaylists.forEach((p) => {
      if (p.queryParams.with_genres) {
        selectedGenresList.push(p.queryParams.with_genres);
        selectedGenresNames.push(p.name);
      }
    });

    // if we have a case of multiple selections of genres, we make a single new  IUrlObject playlist and have all the genres as one single comma separated list and filters.
    if (selectedGenresList.length > 1) {
      const commaSeperatedGenresList: string = selectedGenresList.join(",");

      const playlist: IUrlObject = {
        name: "Custom Genres",
        url: `/discover/${mediaListType}`,
        queryParams: {
          with_genres: commaSeperatedGenresList,
          ...filters,
        },
      };

      closeWithConfirm([playlist]);
    }
    // else we can simply just add filters and pass the selected playlists
    else {
      const selectedPlaylistsWithFilters = selectedPlaylists.map((p) => {
        const temp = p;
        temp.queryParams = { ...p.queryParams, ...filters };
        return temp;
      });
      closeWithConfirm(selectedPlaylistsWithFilters);
    }
  }

  function onConfirmPlaylist(playlist: IUrlObject) {
    closeWithConfirm([playlist]);
  }

  // playlists to show in the modal
  const playlists = mediaListType === "movie" ? moviePlaylist : tvPlaylist;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="absolute my-[25%] mx-[5%] h-[90%] w-[90%] bg-secondary rounded-xl pb-2 border-[1px] border-stone-900 [elevation:10]">
        {/* HEADER */}
        <View className="flex-row items-center justify-between h-[42] bg-tertiary rounded-t-xl px-[20]">
          {/* Header Title */}
          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons
              name="drama-masks"
              size={24}
              color={Colors.green[100]}
            />
            <Text className="text-text_highLight text-sm">{`${
              mediaListType === "movie" ? "Movie" : "TV Shows"
            } wizard`}</Text>
          </View>
          {/* Header Buttons */}
          <View className="flex-row justify-between w-[20%]">
            <View className="rounded-full overflow-hidden">
              <Pressable
                disabled={setSelectedPlaylists.length > 0 ? false : true}
                className="p-2"
                onPress={onConfirmHandler}
                android_ripple={{ color: "#eee" }}
              >
                <MaterialIcons
                  name="done"
                  color={Colors.gray[100]}
                  size={18}
                  style={{ opacity: selectedPlaylists.length > 0 ? 1 : 0 }}
                />
              </Pressable>
            </View>

            <View className="rounded-full overflow-hidden">
              <Pressable
                onPress={onClose}
                className="p-2"
                android_ripple={{ color: "#eee" }}
              >
                <MaterialIcons
                  name="close"
                  color={Colors.gray[100]}
                  size={18}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View className="flex-1">
          <ScrollView className="flex-1">
            {/* CUSTOM PLAYLIST */}
            <View className="my-8">
              {/* <View className="ml-5 rounded-full bg-stone-800/80 px-2 py-2 w-28 mb-1">
                  <Text className="text-center text-green-500 rounded-full font-semibold uppercase tracking-[3px] text-xs">
                    Playlists
                  </Text>
                </View> */}

              <Text className="mb-1 text-center text-green-500 rounded-full font-semibold uppercase tracking-[3px] text-xs">
                • Playlists •
              </Text>

              <Text
                className="text-center mx-6 text-text_dark text-sm mb-4"
                numberOfLines={2}
              >
                Select from one of our handpicked playlists
              </Text>

              <View className="rounded-xl mx-5 overflow-hidden">
                {playlists[0].map((playlist, index) => (
                  <Pressable
                    onPress={() => {
                      // Directly add single genre to the list of selections and confirm modal too
                      onConfirmPlaylist(playlist);
                    }}
                    android_ripple={{ color: "#eee" }}
                    key={playlist.name}
                    className="flex-row px-4 bg-stone-800/50"
                    style={
                      index % 2 === 0
                        ? { backgroundColor: "rgba(23, 23, 23, 1)" }
                        : { backgroundColor: "rgba(23, 23, 23, 0.7)" }
                    }
                    //  style={
                    //    index % 2 === 0
                    //      ? { backgroundColor: Colors.neutral[800] }
                    //      : { backgroundColor: Colors.stone[900] }
                    //  }
                  >
                    <Text className="px-2 py-2 text-left text-gray-300">
                      {playlist.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* DIVIDER */}
            <View className="flex-row items-center my-3">
              <View className="flex-1 border-[1px] border-tertiary rounded-full mx-10" />
              <Text className="text-text_tertiary">OR</Text>
              <View className="flex-1 border-[1px] border-tertiary rounded-full mx-10" />
            </View>

            {/* FILTER */}
            <View className="mt-8">
              <Text className="mb-1 text-center text-green-500 rounded-full font-semibold uppercase tracking-[3px] text-xs">
                • Filters •
              </Text>

              <Text
                className="text-center mx-6 text-text_dark text-sm mb-2"
                numberOfLines={2}
              >
                Select a language and/or year of release
              </Text>

              <View
                className="flex-row space-x-4 items-center justify-between px-4 mt-2 rounded-xl"
                // style={{ backgroundColor: "rgb(4, 20, 10)" }}
              >
                <LanguageDropdown
                  saveMode="local"
                  localLangSetter={setCurrentLangHandler}
                />
                <YearsDropdown
                  saveMode="local"
                  localYearSetter={setCurrentYearHandler}
                />
              </View>
            </View>

            {/* CUSTOM GENRES SELECTS */}
            <View className="my-8">
              <Text className="mb-1 text-center text-green-500 rounded-full font-semibold uppercase tracking-[3px] text-xs">
                • Genres •
              </Text>

              <Text
                className="text-center mx-6 text-text_dark text-sm mb-4"
                numberOfLines={2}
              >
                Select one or more genres from the list below
              </Text>

              <View className="rounded-xl mx-5 overflow-hidden">
                {playlists[1].map((playlist, index) => (
                  <View
                    key={playlist.name}
                    className="flex-row px-4"
                    style={
                      index % 2 === 0
                        ? { backgroundColor: "rgba(23, 23, 23, 1)" }
                        : { backgroundColor: "rgba(23, 23, 23, 0.7)" }
                    }
                  >
                    <BouncyCheckbox
                      size={20}
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
                      {playlist.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MediaWizardModal;
